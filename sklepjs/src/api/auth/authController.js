// authController.js
import { register, loginUser, getUserDetails } from "./authService.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const newUser = await register({ email, password, firstName, lastName });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const getUserDetailsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await getUserDetails(userId);
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Nie udało się pobrać danych użytkownika." });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserDetails(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
