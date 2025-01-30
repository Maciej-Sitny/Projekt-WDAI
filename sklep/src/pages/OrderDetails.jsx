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
    return <div className="text-center mt-5">Ładowanie...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-warning text-white text-center">
          <h2>Szczegóły zamówienia</h2>
        </div>
        <div className="card-body">
          {order && (
            <>
              <h5 className="card-title text-center">
                ID zamówienia: {order.id}
              </h5>
              <ul className="list-group mb-4">
                <li className="list-group-item">
                  <strong>Status:</strong> {order.status || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Łączna kwota:</strong> $
                  {order?.totalAmount?.toFixed(2) || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Adres wysyłki:</strong>{" "}
                  {order.shippingAddress || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Miasto:</strong> {order.city || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Kod pocztowy:</strong> {order.postalCode || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Kraj:</strong> {order.country || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Numer telefonu:</strong> {order.phoneNumber || "N/A"}
                </li>
              </ul>
              <h4 className="text-center mb-3">Produkty</h4>
              <div className="table-responsive">
                <table className="table table-bordered table-striped text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Nazwa produktu</th>
                      <th>Ilość</th>
                      <th>Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products?.map((product, index) => {
                      const productDetails = getProductDetails(
                        product.productId
                      );
                      return (
                        <tr key={index}>
                          <td>
                            {productDetails
                              ? productDetails.title
                              : `ID: ${product.productId}`}
                          </td>
                          <td>{product.quantity}</td>
                          <td>
                            ${productDetails ? productDetails.price : "N/A"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
