import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY =
  process.env.SECRET_KEY || "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

export function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("Brak tokenu w nagłówku Authorization.");
    return res.status(401).json({ error: "Odmowa dostępu. Brak tokenu." });
  }

  try {
    const decoded = jsonwebtoken.verify(token, SECRET_KEY);
    req.user = decoded;
    console.log(`Użytkownik ${decoded.id} pomyślnie uwierzytelniony.`);
    next();
  } catch (error) {
    console.error("Błąd weryfikacji tokenu:", error.message);

    if (error instanceof jsonwebtoken.TokenExpiredError) {
      return res.status(403).json({ error: "Token wygasł." });
    } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
      return res.status(403).json({ error: "Nieprawidłowy token." });
    } else {
      return res.status(403).json({ error: "Błąd autentykacji." });
    }
  }
}

export default authMiddleware;
