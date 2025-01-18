import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth/authService";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      localStorage.setItem("authToken", token);
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Wystąpił błąd podczas logowania.");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateInput = () => {
    if (!email || !password) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  React.useEffect(() => {
    validateInput();
  }, [password, email]);

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
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nazwa użytkownika lub e-mail
              </label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={handleEmailChange}
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
              type="submit"
              disabled={isButtonDisabled}
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
