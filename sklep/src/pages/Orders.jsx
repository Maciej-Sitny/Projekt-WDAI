import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Błąd dekodowania tokena:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(token);
    setUserId(userId);

    const fetchOrders = async () => {
      if (!userId) {
        console.error("Nieprawidłowy identyfikator użytkownika z tokena.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Nie udało się pobrać zamówień.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Błąd pobierania zamówień:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Błąd pobierania produktów:", error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, [userId]);

  const getProductDetails = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.title : "Nieznany produkt";
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Twoje zamówienia</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          Nie masz jeszcze żadnych zamówień. Zacznij zakupy teraz!
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card border-primary h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">ID zamówienia: {order.id}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">{order.status}</span>
                  </p>
                  <h6>Produkty:</h6>
                  <ul className="list-group list-group-flush">
                    {order.products.map((product, index) => (
                      <li key={index} className="list-group-item">
                        {getProductDetails(product.productId)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <div>
                    <span>
                      <strong>Łączna liczba produktów:</strong>{" "}
                      {order.products.length}
                    </span>
                  </div>
                  <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-primary mt-2"
                  >
                    Zobacz szczegóły
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
