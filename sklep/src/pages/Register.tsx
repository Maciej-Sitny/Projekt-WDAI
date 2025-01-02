import React, { useState } from "react";

function Rejestracja() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatedPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
  };

  const validatePasswords = () => {
    if (password != repeatPassword) {
      setError("Hasła nie są zgodne");
    } else {
      setError("Zalogowano pomyślnie!");
    }
  };

  const validateInformation = () => {
    if (!password || !repeatPassword || !username) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  React.useEffect(() => {
    validateInformation();
  }, [password, repeatPassword, username]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Wpisz nazwę użytkownika..."
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Podaj hasło..."
      />
      <input
        type="password"
        value={repeatPassword}
        onChange={handleRepeatedPasswordChange}
        placeholder="Wpisz hasło ponownie..."
      />
      <button
        type="button"
        disabled={isButtonDisabled}
        onClick={validatePasswords}
      >
        Zaloguj
      </button>
      <div>{error}</div>
    </div>
  );
}

export default Rejestracja;
