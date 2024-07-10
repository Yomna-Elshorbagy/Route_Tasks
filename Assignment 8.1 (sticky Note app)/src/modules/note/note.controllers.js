import noteModel from "../../../database/models/note.model.js";

export const addNote = async (req, res) => {
  try {
    let { title, description } = req.body;
    let note = await noteModel.insertMany({
      title,
      description,
    });
  } catch (err) {
    res.json({ message: "Error", err });
  }

  res.status(201).json({ message: "note added sucessfully ", note });
};

export const getAllNotes = async (req, res) => {
  try {
    let notes = await noteModel.find({ user: req.user.userId });
    if (!notes) return res.status(401).json({ message: "there is No Notes" });
    res.status(200).json({ message: "notes are ", notes });
  } catch (err) {
    res.json({ message: "Error", err });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    let note = await noteModel.findById(id);
    if (!note)
      return res.status(401).json({ message: "note doesnot exisist " });
    res.status(200).json({ message: "note ", note });
  } catch (err) {
    res.json({ message: "Error", err });
  }
};

export const updatenote = async (req, res) => {
  const { id } = req.params;
  let note = await noteModel.findById(id);
  if (!note)
    return res.status(401).json({ message: "note doesnot exisist " });

  const updatedMass = await noteModel.findByIdAndUpdate(
    note._id,
    {
      title,
      description,
    },
    { new: true }
  );
  res.status(200).json({ message: "note updated sucessfully ", updatedMass });
};

export const deletenotes = async (req, res) => {
  let { id } = req.params;
  let note = await noteModel.findById(id);
  if (!note) {
    return res.status(404).json({ message: "note doesn't exisit" });
  }
  let deletednote = await noteModel.findByIdAndDelete(id);
  res.status(200).json({ message: "note deleted sucessfully..", deletednote });
};