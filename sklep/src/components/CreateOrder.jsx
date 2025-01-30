import React, { useState } from "react";

const CreateOrder = ({ cartItems, userId, totalAmount }) => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  const createOrder = async () => {
    if (!shippingAddress || !city || !postalCode || !country || !phoneNumber) {
      setOrderMessage("Wszystkie pola są wymagane.");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:5000/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          products: cartItems,
          totalAmount,
          shippingAddress,
          city,
          postalCode,
          country,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się utworzyć zamówienia.");
      }

      const newOrder = await response.json();
      setOrderMessage("Zamówienie utworzone pomyślnie!");

      await fetch(`http://localhost:5000/api/cart/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShippingAddress("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setPhoneNumber("");
    } catch (error) {
      console.error("Błąd podczas tworzenia zamówienia:", error);
      setOrderMessage("Nie udało się utworzyć zamówienia.");
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow">
      <h2 className="mb-4 text-center">Utwórz Zamówienie</h2>
      <div className="form-group mb-3">
        <label htmlFor="shippingAddress" className="form-label">
          Adres wysyłki:
        </label>
        <input
          type="text"
          className="form-control"
          id="shippingAddress"
          placeholder="Wprowadź adres wysyłki"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="city" className="form-label">
          Miasto:
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          placeholder="Wprowadź miasto"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="postalCode" className="form-label">
          Kod pocztowy:
        </label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          placeholder="Wprowadź kod pocztowy"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="country" className="form-label">
          Kraj:
        </label>
        <input
          type="text"
          className="form-control"
          id="country"
          placeholder="Wprowadź kraj"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Numer telefonu:
        </label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          placeholder="Wprowadź numer telefonu"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">
          Kwota całkowita: <strong>${totalAmount.toFixed(2)}</strong>
        </p>
        <button
          className="btn btn-primary"
          onClick={createOrder}
          disabled={
            !shippingAddress || !city || !postalCode || !country || !phoneNumber
          }
        >
          Utwórz Zamówienie
        </button>
      </div>
      {orderMessage && (
        <div
          className={`alert ${
            orderMessage.includes("pomyślnie")
              ? "alert-success"
              : "alert-danger"
          } mt-3`}
          role="alert"
        >
          {orderMessage}
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
