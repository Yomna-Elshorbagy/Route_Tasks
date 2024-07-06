import { ObjectId } from "mongodb";
import { db } from "../../databases/dbConnection.js";

const rentalModel = db.collection("rental");

export const create = async (req, res) => {
  const { customerId, carId, returnDate, rentalDate } = req.body;

  const isCar = await db
    .collection("cars")
    .findOne({ _id: new ObjectId(carId) });
  if (!isCar) return res.json({ message: "car doesnot exisist" });

  const isUser = await db
    .collection("users")
    .findOne({ _id: new ObjectId(customerId) });
  if (!isUser) return res.json({ message: "user doesnot exisist" });

  if (isCar.rentalStatus != "available")
    return res.json({ message: "car doesnot avilable" });

  let updatedCar = await db
    .collection("cars")
    .updateOne(
      { _id: new ObjectId(carId) },
      { $set: { rentalStatus: "rented" } }
    );

  let newRental = await rentalModel.insertOne({
    customerId: new ObjectId(customerId),
    carId: new ObjectId(carId),
    returnDate: new Date(returnDate),
    rentalDate: new Date(rentalDate),
  });

  res.json({ message: "car Rented", newRental });
};

export const getAll = async (req, res) => {
  const rentals = rentalModel.find().toArray();

  return rentals.length
    ? res.json({ message: "rentals are: ", rentals })
    : res.json({ message: "No rentals found" });
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const rental = rentalModel.findOne({ _id: new ObjectId(id) });

  return rental
    ? res.json({ message: "rental is: ", rental })
    : res.json({ message: "No rental found" });
};

export const update = async (req, res) => {
    const { id } = req.params;
    const {rentalDate, returnDate} = req.body;

    const isRental = await rentalModel.findOne({_id:new ObjectId (id)});
    if(!isRental) return res.json({ message: "rental data doesnot exisist" });

    const {matchedCount} = await rentalModel.updateOne({
        _id:new ObjectId (id)
    },{
        $set:{
            rentalDate:new Date(rentalDate),
            returnDate: new Date(returnDate)
        }
    });

    return matchedCount
    ? res.json({ message: "rental updated sucessfully" })
    : res.json({ message: "invalid id" });
};

export const remove = async (req, res) => {
    const { id } = req.params;
    const {deletedCount} = await rentalModel.deleteOne({_id: new ObjectId(id)})

    return deletedCount
    ? res.json({ message: "rental deleted sucessfully" })
    : res.json({ message: "invalid id" });
};
