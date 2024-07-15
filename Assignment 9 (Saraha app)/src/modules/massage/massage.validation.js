
import joi from "joi";

export const addVal = joi.object({
    title: joi.string().min(3).max(50).required(),
    content: joi.string().max(200).required(),
    receiverId: joi.string().hex().min(24).max(24).required()
});

export const updateVal = joi.object({
    title: joi.string().min(3).max(50),
    content: joi.string().max(200),
    id: joi.string().hex().length(24).required()
});