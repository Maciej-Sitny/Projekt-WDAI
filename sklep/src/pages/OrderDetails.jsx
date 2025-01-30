import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Nie udało się pobrać zamówienia.");
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Błąd podczas pobierania zamówienia:", error);
        setError("Nie udało się pobrać szczegółów zamówienia.");
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
        console.error("Błąd podczas pobierania produktów:", error);
        setError("Nie udało się załadować szczegółów produktów.");
      }
    };

    fetchOrder();
    fetchProducts();
  }, [id]);

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  console.log("Dane zamówienia:", order);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Szczegóły zamówienia</h2>
      {order && (
        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title">ID zamówienia: {order.id}</h5>
            <p className="card-text">
              <strong>Status:</strong> {order.status || "N/A"}
            </p>
            <p className="card-text">
              <strong>Łączna kwota:</strong> $
              {order?.totalAmount?.toFixed(2) || "N/A"}
            </p>
            <p className="card-text">
              <strong>Adres wysyłki:</strong> {order.shippingAddress || "N/A"}
            </p>
            <p className="card-text">
              <strong>Miasto:</strong> {order.city || "N/A"}
            </p>
            <p className="card-text">
              <strong>Kod pocztowy:</strong> {order.postalCode || "N/A"}
            </p>
            <p className="card-text">
              <strong>Kraj:</strong> {order.country || "N/A"}
            </p>
            <p className="card-text">
              <strong>Numer telefonu:</strong> {order.phoneNumber || "N/A"}
            </p>
            <h6 className="mt-4">Produkty:</h6>
            <ul className="list-group">
              {order.products?.map((product, index) => {
                const productDetails = getProductDetails(product.productId);
                return (
                  <li key={index} className="list-group-item">
                    {productDetails ? (
                      <>
                        <strong>{productDetails.title}</strong> - Ilość:{" "}
                        {product.quantity} - Cena: ${productDetails.price}
                      </>
                    ) : (
                      <>
                        ID produktu: {product.productId} - Ilość:{" "}
                        {product.quantity} - Utworzono:{" "}
                        {new Date(product.createdAt).toLocaleString()}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
