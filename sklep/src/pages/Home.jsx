import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

      const fetchProducts = async () => {
          try {
              const response = await fetch("https://fakestoreapi.com/products");
              const data = await response.json();
              setProducts(data);
          } catch (error) {
              console.error("Błąd podczas pobierania danych:", error);
          }
      };
    fetchCategories();
    fetchProducts()

  }, []);
    console.log(products)
  return (
      <div className={"container-fluid h-100 "}>
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
          <div className={"container-fluid bg-warning  position-relative  z-1"} style={{marginBottom: "5%", marginTop: "10%"}}>
              <div className="row w-100 ">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                          <h1 className={"text-white display-1"}>Nowości</h1>
                          <h4>Najbardziej trendujące przedmioty tylko w naszym sklepie</h4>
                      </div>
                  </div>
                  <div className="col-6">
                      {products && products.length > 0 && (
                          <img src={"src/images/home/noback.png"} alt={products[0].title} className="img-fluid "
                               style={{width: '50%'}}/>
                      )}

                  </div>
              </div>

          </div>
          <img src={"src/images/home/arrowDown.gif"} alt="Loading..."
               style={{width: "100px", height: "100px"}}/>
          <div className="container mt-4 position-relative  z-1">
              <div className="row">
                  <div className="col-6  d-flex justify-content-center align-items-center ">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                          <h1>Nowa kolekcja ubrań męskich</h1>
                          <p>Ubrania uszyte przez naszych najlepszych stylistów</p>
                          <Link
                              to={`/category/men's clothing`}
                              className="btn btn-warning mt-3"
                          >
                              Zobacz produkty
                          </Link>
                      </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center p-0">

                      <img
                          src={"src/images/home/02-lestrange.webp"}
                          alt={"ubranie męskie"}
                          className="img-fluid"
                          style={{objectFit: "cover"}}
                      />

                  </div>
              </div>
              <div className="row">
                  <div className="col-6 d-flex justify-content-center align-items-center p-0">
                      {products && products.length > 0 && (
                          <img
                              src={"src/images/home/bizu.jpg"}
                              alt={"biżuteria"}
                              className="img-fluid"
                              style={{backgroundSize: "cover"}}
                          />
                      )}
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center ">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                          <h1>Biżuteria</h1>
                          <p>Dzięki współpracy z Apart możesz u nas kupić biżuterię najwyższej jakości</p>
                          <Link
                              to={`/category/jewelery`}
                              className="btn btn-warning mt-3"
                          >
                              Zobacz produkty
                          </Link>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-6  d-flex justify-content-center align-items-center ">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                          <h1>Kolekcja ubrań damskich</h1>
                          <p>Odkryj naszą kolekcję ubrań damskich, która łączy w sobie elegancję, komfort i najnowsze
                              trendy modowe</p>
                          <Link
                              to={`/category/women's clothing`}
                              className="btn btn-warning mt-3"
                          >
                              Zobacz produkty
                          </Link>
                      </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center p-0">

                      <img
                          src={"src/images/home/shutterstock_642322564.webp"}
                          alt={"ubrania damskie"}
                          className="img-fluid"
                          style={{objectFit: "cover"}}
                      />

                  </div>
              </div>
              <div className="row">
                  <div className="col-6 d-flex justify-content-center align-items-center p-0">
                      {products && products.length > 0 && (
                          <img
                              src={"src/images/home/152e502c1f16c117f5bb5e34c6da2dcdc0bfe3caf48131cbedd3a3ed2f0060ea._SX1080_FMjpg_.jpg"}
                              alt={"elektronika"}
                              className="img-fluid"
                              style={{backgroundSize: "cover"}}
                          />
                      )}
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center ">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                          <h1>Elektronika</h1>
                          <p>Poznaj naszą szeroką ofertę elektroniki, która obejmuje najnowsze urządzenia i akcesoria,
                              aby ułatwić Ci codzienne życie i zapewnić rozrywkę na najwyższym poziomie.</p>
                          <Link
                              to={`/category/electronics`}
                              className="btn btn-warning mt-3"
                          >
                              Zobacz produkty
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
          {/*<img src={"src/images/home/arrowDown.gif"} className={"bottom-center-gif"}*/}
          {/*     style={{height: "80px", width: "80px"}} alt="Loading..."/>*/}
          <div className="container mt-5 bg-warning position-relative  z-1">
              <div className="row">
                  <div className="col-9 d-flex flex-column align-items-center p-5">
                      <h1 style={{fontSize: "10vw"}} className="fs-4">Zarejestruj się, by dostawać nasz newsletter</h1>
                      <p>Będziesz informowany, gdy pojawią się nowości, a także będziesz dostawał kody promocyjne.</p>
                  </div>
                  <div className="col-3 d-flex justify-content-end align-items-center">
                      <Link to="/register" className="btn btn-light btn-lg mr-3">
                          Zarejestruj się
                      </Link>
                  </div>
              </div>

          </div>

          <footer className="text-center mt-4 position-relative" style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#10375C",
              height: "50px"
          }}>
              <p style={{color: "#F4F6FF"}}>Autorzy: Igor Piesik & Maciej Sitny</p>
          </footer>
      </div>)


    //   <div className="container mt-4">
    //     <h1 className="mb-4 text-center">Lista kategorii</h1>
    //     <div className="row g-3">
    //       {categories.map((category) => (
    //         <div className="col-md-4 col-lg-3" key={category}>
    //           <div className="card h-100 shadow-sm">
    //             <div className="card-body text-center">
    //               <h5 className="card-title text-capitalize">{category}</h5>
    //               <Link
    //                 to={`/category/${category}`}
    //                 className="btn btn-primary mt-3"
    //               >
    //                 Zobacz produkty
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="text-center mt-4">
    //       <Link to={"/"} className="btn btn-secondary">
    //         Powrót do strony głównej
    //       </Link>
    //     </div>
    //   </div>
    // );
};


export default Home;
