const carModel = db.collection("cars");

export const carByModel = async (req, res) => {
  const cars = await carModel
    .find({ model: { $in: ["Honda", "Toyota"] } })
    .toArray();

  return cars.length
    ? res.json({ message: "cars are: ", cars })
    : res.json({ message: "No cars found" });
};

export const avilableCars = async (req, res) => {
  const cars = await carModel
    .find({ model: req.query.model, rentalStatus: "available" })
    .toArray();

  return cars.length
    ? res.json({ message: "cars are: ", cars })
    : res.json({ message: "No cars found" });
};

export const rentedOrSpecificCars = async (req, res) => {
  const { model } = req.query;
  const condition = {};

  if (model) {
    condition.model = model;
  } else {
    condition.rentalStatus = "rented";
  }

  const cars = await carModel.find(condition).toArray();

  return cars.length
    ? res.json({ message: "cars are: ", cars })
    : res.json({ message: "No cars found" });
};

export const rentedOrRentedCars = async (req, res) => {
    const { model } = req.query;

    const cars = await carModel.find({
        $or:[
            {rentalStatus:'available', model},
            {rentalStatus:'rented', model},            
        ]
    }).toArray();
  
    return cars.length
      ? res.json({ message: "cars are: ", cars })
      : res.json({ message: "No cars found" });
  };