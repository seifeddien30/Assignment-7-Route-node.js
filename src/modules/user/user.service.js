import mongoose, { ObjectId } from "mongoose";
import { userModel } from "../../database/model/user.model.js";

export const signupUser = async (req, res) => {
  let { name, email, password, phone, age } = req.body;
  let existedUser = await userModel.findOne({ email });
  console.log(existedUser);

  if (!existedUser) {
    let signup = await userModel.insertOne({
      name,
      email,
      password,
      phone,
      age,
    });
    return res.json({ message: "User added" }, signup);
  } else {
    return res.json({ message: "User already exists." });
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let findUser = await userModel.findOne({ email });
  if (findUser && findUser.password == password) {
    return res.json({ message: "logged successfully" });
  } else {
    return res.json({ message: "invalid email or password" });
  }
};

export const updateUser = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  let loggedUser = await userModel.findById(id);
  console.log(loggedUser);

  let existingUser = data.email
    ? await userModel.findOne({ email: data.email })
    : null;
  if (loggedUser) {
    if (!existingUser) {
      await userModel.findByIdAndUpdate(loggedUser.id, { email: data.email });
      data.name
        ? await userModel.findByIdAndUpdate(loggedUser.id, { name: data.name })
        : null;
      data.age
        ? await userModel.findByIdAndUpdate(loggedUser.id, { age: data.age })
        : null;
      data.phone
        ? await userModel.findByIdAndUpdate(loggedUser.id, {
            phone: data.phone,
          })
        : null;
      return res.json({ message: "user updated successfully" });
    } else {
      return res.json({ messag: "email already exists" });
    }
  } else {
    return res.json({ message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  let { id } = req.query;
  let existedUser = await userModel.findById(id);
  if (existedUser) {
    await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return res.json({ message: "user deleted" });
  } else {
    return res.json({ message: "User not found" });
  }
};

export const getUserInfo = async (req, res) => {
  let { id } = req.query;
  let userData = await userModel.findById(id);
  return res.json({ message: "done", data: userData });
};
