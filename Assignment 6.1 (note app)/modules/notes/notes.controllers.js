import notesModel from "../../database/models/notes.model.js";


export const addNote = async(req, res)=>{
    const {tittle, description} = req.body;

    const note = await notesModel.create({
        tittle,
        description
    });
    return res.status(201).json({message: 'note added sucessfully', note});
}
export const getNoteById = async (req,res)=>{
    const {id} = req.params;
    const isNote = await notesModel.findOne({
        where:{
            id,
        }
    });
    if(!isNote){
        return res.status(400).json({message:'Note not found'})
    }
    const note = await notesModel.findByPk(id,{
        where:{
            id,
        }
    });
    return res.status(200).json({message: 'note: ', note});
 }
export const getAllNotes = async(req, res)=>{
    const note = await notesModel.findAll()
    return res.status(200).json({message: 'All notes', note});

}
export const updateNote = async(req,res)=>{
    const {id} = req.params;
    const {tittle, description} = req.body;

    const isNote = await notesModel.findOne({
        where:{
            id,
        }
    });
    if(!isNote){
        return res.status(400).json({message:'Note not found'})
    }
    const updateNote = await notesModel.update({
        tittle,
        description
    },{
        where:{
            id:id
        }
      });

    return res.status(200).json({message: 'Note updated sucessfully', updateNote});
}
export const deleteNote = async(req,res)=>{
    const {id} = req.params;

    const isNote = await notesModel.findOne({
        where:{
            id,
        }
    });
    if(!isNote){
        return res.status(400).json({message:'Note not found'})
    }
    const deletedNote = await notesModel.destroy({
      where:{
        id,
      }
    });

    return res.status(200).json({message: 'Not deleted sucessfully', deletedNote});

 }