import { ObjectId } from "mongodb";
import { db } from "../../databases/dbConnection.js";

const carModel = db.collection("cars");

export const create = async (req, res) => {
  const { name, model } = req.body;

  const car = await carModel.insertOne({
    name,
    model,
    rentalStatus: "available",
  });
  return res.json({ message: "created suceesfully", status: true });
};

export const getAll = async (req, res) => {
  const cars = carModel.find().toArray();

  return cars.length
    ? res.json({ message: "cars are: ", status: true, cars })
    : res.json({ message: "No cars found" });
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const car = carModel.findOne({ _id: new ObjectId(id) });

  return car
    ? res.json({ message: "car is: ", status: true, car })
    : res.json({ message: "No car found" });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, model } = req.body;

  const { matchedCount } = await carModel.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        neme,
        model,
      },
    }
  );

  return matchedCount
    ? res.json({ message: "car updated: ", status: true })
    : res.json({ message: "No car found" });
};

export const remove = async (req, res) => {
  const { id } = req.params;

  const { deletedCount } = await carModel.deleteOne({
    _id: new ObjectId(id),
  });

  return deletedCount
    ? res.json({ message: "car deleted: ", status: true })
    : res.json({ message: "No car found" });
};
