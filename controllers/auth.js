import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { createError } from "../utils/error.js";

// for register and login
const createCookieAndJson = (user) => {
  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET);

  const { isAdmin, email, _id: id, username } = user._doc;

  return ({
    cookie: ["access_token", token, { httpOnly: true, secure: false }],
    json: { details: { id, email, username }, isAdmin, token } // токен дублируем == можно работать и так, и так)
  })
}

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    const { cookie, json } = createCookieAndJson(newUser);

    res.cookie(...cookie).status(200).json(json);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

    const { cookie, json } = createCookieAndJson(user);

    res.cookie(...cookie).status(200).json(json);
  } catch (err) {
    next(err);
  }
};
