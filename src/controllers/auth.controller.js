import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const allUsers = async (req, res) => {
  try {
    const userAll = await User.find();
    res.status(201).json(userAll)
    return;
  } catch (error) {
    res.status(500).json({ message: error })
    // console.log(error);
  }
}

export const register = async (req, res) => {
  try {
    const { user_name, user_email, user_birthday, password } = req.body;

    const userFound = await User.findOne({ user_email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      user_name,
      user_email,
      user_birthday,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      user_name: userSaved.user_name,
      user_email: userSaved.user_email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user_email, password } = req.body;
    const userFound = await User.findOne({ user_email });

    if (!userFound)
      return res.status(400).json({
        message: ["Email não cadastrado"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["Senha incorreta"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      user_name: userFound.user_name,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      user_name: userFound.user_name,
      user_email: userFound.user_email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      user_name: userFound.user_name,
      user_email: userFound.user_email,
      user_birthday: userFound.user_birthday,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
