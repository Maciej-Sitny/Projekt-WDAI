import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddToCart from "../components/AddToCart";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Błąd podczas pobierania produktów:", error)
      );
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container my-4">
          <img src={"src/images/home/blob.svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (1).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "60%", left: "10%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (2).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "30%", left: "80%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (3).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "10%", left: "60%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (5).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "20%", left: "30%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (6).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "70%", left: "70%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (7).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "50%", left: "55%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (8).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "5%", left: "35%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (9).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "90%", left: "35%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (10).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "75%", left: "86%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (11).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "55%", left: "30%", height: "100px", width: "100px"}}/>
          <img src={"src/images/home/blob (12).svg"} alt={"blob"} className={"position-fixed z-0"}
               style={{top: "43%", left: "15%", height: "100px", width: "100px"}}/>
          <h1 className="text-center mb-4 position-relative">Wszystkie produkty</h1>
          <div className="mb-4 position-relative">
              <input
                  type="text"
                  placeholder="Wyszukaj przedmiot..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="form-control"
              />
          </div>
          <div className="row">
              {filteredProducts.map((product) => (
                  <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                      <div className="card h-100">
                          <img
                              src={product.image}
                              alt={product.title}
                              className="card-img-top"
                              style={{height: "300px", objectFit: "contain"}}
                          />
                          <div className="card-body">
                              <h5 className="card-title">{product.title}</h5>
                              <p
                                  className="card-text text-truncate"
                                  style={{maxHeight: "50px"}}
                              ></p>
                          </div>
                          <div className="card-footer flex-column d-flex align-items-center justify-content-center">
                              <p className="text-muted mb-1">
                                  Cena: ${product.price.toFixed(2)}
                              </p>
                              <Link
                                  to={`/products/${product.id}`}
                                  className="btn btn-warning  mb-2"
                              >
                                  Zobacz opis
                              </Link>
                              <AddToCart product={{id: product.id, quantity: 1}}/>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default AllProducts;
