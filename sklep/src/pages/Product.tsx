import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";
import Comments from "../components/Comments";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  images: string[];
  thumbnail: string;
}

const Product = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Ładowanie...</span>
        </div>
        <p className="mt-3">Ładowanie produktu...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-5 text-center p-3">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxWidth: "300px" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h1 className="card-title text-primary">{product.title}</h1>
              <p className="card-text text-muted">{product.description}</p>
              <p className="card-text">
                <strong>Cena:</strong> {product.price} zł
              </p>
              <p className="card-text">
                <strong>Ocena:</strong> {product.rating}
              </p>
              <p className="card-text">
                <strong>Stan:</strong> {product.stock}
              </p>
              <p className="card-text">
                <strong>Marka:</strong> {product.brand}
              </p>
              <p className="card-text">
                <strong>Dostępność:</strong> {product.availabilityStatus}
              </p>
              <p className="card-text">
                <strong>Polityka zwrotów:</strong> {product.returnPolicy}
              </p>
              <p className="card-text">
                <strong>Informacje o dostawie:</strong>{" "}
                {product.shippingInformation}
              </p>
              <AddToCart product={{ id: product.id, quantity: 1 }} />
            </div>
          </div>
        </div>
      </div>
      <Comments />
      <div className="text-center mt-4">
        <Link to={"/"} className="btn btn-secondary">
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default Product;
