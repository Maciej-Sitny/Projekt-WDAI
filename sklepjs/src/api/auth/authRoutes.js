const { Router } = require("express");

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

  if (!email || !password) {
    res.status(400).send("Brak wymaganych danych wejściowych.");
    return;
  }

  try {
    const { token } = await login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
