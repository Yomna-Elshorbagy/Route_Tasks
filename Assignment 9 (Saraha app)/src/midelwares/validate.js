import { AppError } from "../utils/catchError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (!error) {
      next();
    } else {
      // let errMsg=[]
      // error.details.forEach((err)=>{
      //     errMsg.push(err.message)
      // })
      // res.json(error?.details)

      let errMsg = error.details.map((err) => err.message);
      next(new AppError(errMsg, 401));
    }
  };
};
