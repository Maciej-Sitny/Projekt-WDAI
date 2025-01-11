const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

export const register = async ({ email, password }) => {
  const hashedPassword = await hash(password, 10);
  const existingUser = await findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail jest już zarejestrowany.");
  }
  const newUser = await create({
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await findOne({ where: { email } });
  if (!user) {
    throw new Error("Nieprawidłowy e-mail lub hasło.");
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Nieprawidłowy e-mail lub hasło.");
  }

  const token = sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return { token };
};
