import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure this is the correct import
import CreateOrder from "../components/CreateOrder";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Błąd dekodowania tokena:", error);
      return null;
    }
  };

  const fetchCartItems = async () => {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(token);
    setUserId(userId);

    if (!userId) {
      setError("Musisz być zalogowany, aby zobaczyć swój koszyk.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Nie udało się pobrać przedmiotów z koszyka.");
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Błąd pobierania przedmiotów z koszyka:", error);
      setError(
        "Nie udało się załadować przedmiotów z koszyka. Spróbuj ponownie później."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Błąd pobierania produktów:", error);
      setError("Nie udało się załadować szczegółów produktów.");
    }
  };

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${userId}/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Nie udało się usunąć przedmiotu z koszyka.");
      }

      fetchCartItems();
    } catch (error) {
      console.error("Błąd usuwania przedmiotu z koszyka:", error);
      setError("Nie udało się usunąć przedmiotu. Spróbuj ponownie.");
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${userId}/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Nie udało się zaktualizować ilości przedmiotu.");
      }

      fetchCartItems();
    } catch (error) {
      console.error("Błąd aktualizacji ilości przedmiotu:", error);
      setError("Nie udało się zaktualizować ilości. Spróbuj ponownie.");
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Ładowanie...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const product = getProductDetails(item.productId);
    return total + (product ? parseFloat(product.price) * item.quantity : 0);
  }, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Twój Koszyk</h1>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          Twój koszyk jest pusty.
        </div>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Produkt</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Łącznie</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const product = getProductDetails(item.productId);
                return (
                  <tr key={item.id}>
                    <td>{product ? product.title : "Nieznany"}</td>
                    <td>${product ? product.price : "Nieznany"}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productId,
                            parseInt(e.target.value)
                          )
                        }
                        className="form-control"
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      $
                      {(product
                        ? parseFloat(product.price) * item.quantity
                        : 0
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.productId)}
                      >
                        <i className="fas fa-trash-alt"></i> Usuń
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-right mt-3">
            <h3>Łączna Cena: ${totalPrice.toFixed(2)}</h3>
          </div>
          <div className="text-center mt-4">
            <CreateOrder
              cartItems={cartItems}
              userId={userId}
              totalAmount={totalPrice}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
