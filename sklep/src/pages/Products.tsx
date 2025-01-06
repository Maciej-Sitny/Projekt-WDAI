import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (category) {
          const response = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          const data = await response.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-capitalize">{category}</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-6 col-lg-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="mb-1">
                  <strong>Cena:</strong> {product.price} zł
                </p>
                <p className="mb-1">
                  <strong>Ocena:</strong> {product.rating}
                </p>
                <p className="mb-3">
                  <strong>Stan:</strong> {product.stock}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-outline-secondary mt-auto"
                >
                  Zobacz produkt
                </Link>
                <AddToCart product={{ id: product.id, quantity: 1 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to={"/"} className="btn btn-secondary">
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default Products;
