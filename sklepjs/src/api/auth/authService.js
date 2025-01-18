import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
const { sign } = jwt;
import User from "./user.js";

const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

export const register = async ({ email, password }) => {
  // Zakładam, że 'findOne' sprawdza bazę danych użytkowników
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail jest już zarejestrowany.");
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });
  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Nieprawidłowy e-mail lub hasło.");
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Nieprawidłowy e-mail lub hasło.");
  }

  // Generowanie tokenu JWT
  const token = sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return { token };
};
