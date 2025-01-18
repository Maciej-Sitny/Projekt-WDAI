import { Router } from "express";
import { register, loginUser } from "./authService.js"; // Upewnij się, że używasz poprawnego rozszerzenia ".js"

const router = Router();

// Rejestracja
router.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Brak wymaganych danych wejściowych.");
    return;
  }

  try {
    const newUser = await register({ email, password });
    res.status(201).json({ id: newUser.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Logowanie użytkownika
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate the incoming data
  if (!email || !password) {
    return res.status(400).send("Brak wymaganych danych wejściowych."); // Missing credentials
  }

  try {
    // Assume `loginUser` validates the email and password and generates a token if successful
    const { token } = await loginUser(email, password);

    if (!token) {
      // In case the login failed (invalid credentials)
      return res.status(401).send("Nieprawidłowy e-mail lub hasło."); // Invalid email or password
    }

    // Send back the token
    res.json({ token });
  } catch (error) {
    console.error(error); // Log error for debugging

    // In case of other errors (e.g., server error, database issues)
    res.status(500).send("Wystąpił błąd serwera. Spróbuj ponownie później.");
  }
});

export default router;
