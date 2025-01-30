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
      setOrderMessage("All fields are required.");
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
        throw new Error("Failed to create order.");
      }

      const newOrder = await response.json();
      setOrderMessage("Order created successfully!");

      // Clear the cart
      await fetch(`http://localhost:5000/api/cart/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear the form
      setShippingAddress("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setPhoneNumber("");
    } catch (error) {
      console.error("Error creating order:", error);
      setOrderMessage("Failed to create order.");
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow">
      <h2 className="mb-4 text-center">Create Order</h2>
      <div className="form-group mb-3">
        <label htmlFor="shippingAddress" className="form-label">
          Shipping Address:
        </label>
        <input
          type="text"
          className="form-control"
          id="shippingAddress"
          placeholder="Enter your shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="city" className="form-label">
          City:
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="postalCode" className="form-label">
          Postal Code:
        </label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          placeholder="Enter your postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="country" className="form-label">
          Country:
        </label>
        <input
          type="text"
          className="form-control"
          id="country"
          placeholder="Enter your country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number:
        </label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">
          Total Amount: <strong>${totalAmount.toFixed(2)}</strong>
        </p>
        <button
          className="btn btn-primary"
          onClick={createOrder}
          disabled={
            !shippingAddress || !city || !postalCode || !country || !phoneNumber
          }
        >
          Create Order
        </button>
      </div>
      {orderMessage && (
        <div
          className={`alert ${
            orderMessage.includes("successfully")
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
