import massageModel from "../../../database/model/message.model.js";
import userModel from "../../../database/model/user.model.js";
import { AppError, catchAsyncError } from "../../utils/catchError.js";

export const addMassage = catchAsyncError(async (req, res, next) => {
  let { title, content, receiverId } = req.body;
  let user = await userModel.findById(receiverId);
  if (!user) return next(new AppError("users doesnot exisit", 404));
  let massage = await massageModel.insertMany({
    title,
    content,
    receiverId,
  });

  res.status(201).json({ message: "massage added sucessfully ", massage });
});

export const getAllMassages = catchAsyncError(async (req, res, next) => {
  let massages = await massageModel.find({ receiverId: req.user.userId });
  if (!massages)
    return next(new AppError("there is No massages", 404));
  res.status(200).json({ message: "massages are ", massages });
});

export const getById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let massage = await massageModel.findById(id);
  if (!massage) return next(new AppError("massage doesnot exisist ", 404));
  res.status(200).json({ message: "massage ", massage });
});

export const updateMassage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let massage = await massageModel.findById(id);
  if (!massage) return next(new AppError("massage doesnot exisit", 404));
  const updatedMass = await massageModel.findByIdAndUpdate(
    massage._id,
    {
      title,
      content,
    },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "massage updated sucessfully ", updatedMass });
});

export const deleteMassages = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let massage = await massageModel.findById(id);
  if (!massage) {
    return next(new AppError("massage doesnot exisit", 404));
  }
  let deletedmassage = await massageModel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: "massage deleted sucessfully..", deletedmassage });
});
