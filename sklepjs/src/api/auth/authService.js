import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
const { sign } = jwt;
import User from "./user.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

export const register = async ({ email, password, firstName, lastName }) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("E-mail is already registered.");
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return newUser;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    const token = sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return { token };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const getUserDetails = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    throw new Error(`Failed to get user details: ${error.message}`);
  }
};
