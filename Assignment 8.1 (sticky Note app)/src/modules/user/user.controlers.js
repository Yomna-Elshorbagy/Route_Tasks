import bcrypt from "bcrypt";
import userModel from "../../../database/models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utilis/email.js";

export const getAllusers = async (req, res, next) => {
  try {
    let users = await userModel.find();
    res.status(200).json({ message: "All users: ", users });
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getuserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let user = await userModel.findById(id);
    if (!user) {
      return res.json({ message: "users doesnot exisit" });
    }
    res.status(200).json({ message: "user: ", user });
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signUp = async (req, res, next) => {
  try {
    let { userName, email, password, Cpassword } = req.body;
    if (password != Cpassword) {
      return res.json({
        message: "password annd confirmed password doesnot Match",
      });
    }
    let foundeduser = await userModel.findOne({ email: req.body.email });
    if (foundeduser) {
      return res.json({ message: "user alredy register" });
    }
    let hashedPass = bcrypt.hashSync(password, 8);
    let otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    let otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    let user = await userModel.insertMany({
      userName,
      email,
      password: hashedPass,
      otpCode,
      otpExpire,
    });
    sendEmail(email, otpCode);
    user[0].password = undefined; //prevent password to send to front end
    res.status(201).json({ message: "user added Sucessfully", user });
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    let { token } = req.params;
    jwt.verify(token, process.env.EMAIL_KEY, async (err, payload) => {
      if (err) return res.json(err);
      let user = await userModel.findById(payload.id);
      if (!user) return res.json({ message: "invalid user" });
      await userModel.findOneAndUpdate(
        { email: payload.email },
        { isVerified: true, otpCode: null, otpExpire: null },
        { new: true }
      );
      res.json({ message: "sucess", email: payload.email });
    });
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const verifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;

    try {
      const user = await userModel.findOne({ email });

      if (!user) return res.status(400).json({ message: "User not found" });
      if (user.otpCode !== otpCode)
        return res.status(400).json({ message: "Invalid OTP" });
      if (user.otpExpire < new Date())
        return res.status(400).json({ message: "OTP expired" });

      await userModel.findOneAndUpdate(
        { email },
        { isVerified: true, otpCode: null, otpExpire: null },
        { new: true }
      );

      res.json({ message: "Email verified successfully" });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logIn = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email }); // if null password will be null ==> err in password

    if (!user || !bcrypt.compareSync(password, user.password)) {
      // if null will go to else without comparing pass
      return res.status(404).json({ message: "incorrect email or password" });
    }

    jwt.sign(
      { userId: user._id, pass: user.password, role: user.role },
      process.env.secret_Key,
      (err, token) => {
        res.json({ message: "Loged in sucessfully..", token });
      }
    );
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateuser = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { userName, email, isActive, status } = req.body;

    let foundeduser = await userModel.findById(id);
    if (!foundeduser) {
      return res.status(404).json({ message: "user doesnot exisit" });
    }
    let updateduser = await userModel.findByIdAndUpdate(
      foundeduser._id,
      {
        userName,
        email,
        isActive,
        status,
      },
      { new: true }
    );
    res.json({ message: "user updated sucessfully..", updateduser });
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    let foundeduser = await userModel.findOne({ email });
    if (!foundeduser) {
      return res.status(404).json({ message: "email doesn't exisit" });
    }
    let hashedPass = bcrypt.hashSync(password, 8);
    let updateduser = await userModel.findOneAndUpdate(
      { email: foundeduser.email },
      { password: hashedPass },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Password reset successfully", updateduser });
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteuser = async (req, res, next) => {
  try {
    let { id } = req.params;
    let foundduser = await userModel.findById(id);
    if (!foundduser) {
      return res.status(404).json({ message: "user doesn't exisit" });
    }
    let deleteduser = await userModel.findByIdAndDelete(id);
    res.json({ message: "user deleted sucessfully..", deleteduser });
  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
