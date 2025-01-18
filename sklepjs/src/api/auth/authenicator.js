import jwt from "jsonwebtoken";

// Sekretny klucz używany do podpisywania tokenów
const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

// Middleware do weryfikacji tokena
function authenticateToken(req, res, next) {
  // Pobierz token z nagłówka Authorization (forma: Bearer token)
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Odmowa dostępu. Brak tokena." });
  }

  try {
    // Weryfikacja tokena przy użyciu tajnego klucza
    const decoded = jwt.verify(token, SECRET_KEY);
    // Zapisz dane użytkownika (zdekodowane z tokena) w obiekcie `req`
    req.user = decoded;
    // Przekaż kontrolę do kolejnego middleware lub funkcji
    next();
  } catch (error) {
    res.status(403).json({ error: "Nieprawidłowy token." });
  }
}

export default authenticateToken;
