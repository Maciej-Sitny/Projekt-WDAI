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
          throw new Error("Failed to fetch order.");
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Failed to fetch order details.");
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
        console.error("Error fetching products:", error);
        setError("Failed to load product details.");
      }
    };

    fetchOrder();
    fetchProducts();
  }, [id]);

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  console.log("Order data:", order);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order Details</h2>
      {order && (
        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title">Order ID: {order.id}</h5>
            <p className="card-text">
              <strong>Status:</strong> {order.status || "N/A"}
            </p>
            <p className="card-text">
              <strong>Total Amount:</strong> $
              {order?.totalAmount?.toFixed(2) || "N/A"}
            </p>
            <p className="card-text">
              <strong>Shipping Address:</strong>{" "}
              {order.shippingAddress || "N/A"}
            </p>
            <p className="card-text">
              <strong>City:</strong> {order.city || "N/A"}
            </p>
            <p className="card-text">
              <strong>Postal Code:</strong> {order.postalCode || "N/A"}
            </p>
            <p className="card-text">
              <strong>Country:</strong> {order.country || "N/A"}
            </p>
            <p className="card-text">
              <strong>Phone Number:</strong> {order.phoneNumber || "N/A"}
            </p>
            <h6 className="mt-4">Products:</h6>
            <ul className="list-group">
              {order.products?.map((product, index) => {
                const productDetails = getProductDetails(product.productId);
                return (
                  <li key={index} className="list-group-item">
                    {productDetails ? (
                      <>
                        <strong>{productDetails.title}</strong> - Quantity:{" "}
                        {product.quantity} - Price: ${productDetails.price}
                      </>
                    ) : (
                      <>
                        Product ID: {product.productId} - Quantity:{" "}
                        {product.quantity} - Created At:{" "}
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
