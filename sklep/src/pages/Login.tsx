import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validatePassword = (expectedPassword: string) => {
    if (password === expectedPassword) {
      setError("Zalogowano pomyślnie!");
      navigate("/");
    } else {
      setError("Hasło jest nieprawidłowe.");
    }
  };

  const validateUsername = () => {
    const usersData = localStorage.getItem("users");

    if (usersData) {
      const usersArray = JSON.parse(usersData);

      const existingUser = usersArray.find(
        (user: { login: string; email: string }) =>
          user.login === username || user.email === username
      );

      if (existingUser) {
        validatePassword(existingUser.password);
      } else {
        setError("Nie ma takiego użytkownika...");
      }
    } else {
      setError("Brak zapisanych użytkowników w systemie.");
    }
  };

  const validateInformation = () => {
    if (!password || !username) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  React.useEffect(() => {
    validateInformation();
  }, [password, username]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Logowanie</h1>
      <div className="d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nazwa użytkownika lub e-mail
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="form-control"
                placeholder="Login lub e-mail"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control"
                placeholder="Podaj hasło"
              />
            </div>
            <button
              type="button"
              disabled={isButtonDisabled}
              onClick={validateUsername}
              className="btn btn-primary w-100"
            >
              Zaloguj
            </button>
          </form>
          <div
            className={`mt-3 ${
              error === "Zalogowano pomyślnie!" ? "text-success" : "text-danger"
            }`}
          >
            {error}
          </div>
          <p className="mt-3 text-center">Pierwszy raz u nas?</p>
          <Link to="/register" className="btn btn-secondary w-100">
            Zarejestruj się!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
