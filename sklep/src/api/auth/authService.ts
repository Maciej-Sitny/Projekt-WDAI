import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user";

const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

interface RegisterUserInput {
  email: string;
  password: string;
}

interface LoginUserInput {
  token: string;
}

export async function register({ email, password }: RegisterUserInput) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail jest już zarejestrowany.");
  }
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  return newUser;
}

export async function login(
  email: string,
  password: string
): Promise<LoginUserInput> {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Nieprawidłowy e-mail lub hasło.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Nieprawidłowy e-mail lub hasło.");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return { token };
}
