import { useState } from "react";

interface Product {
  id: number;
  quantity: number;
}

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleCart = () => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += product.quantity;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleCart}>
      Dodaj do koszyka
    </button>
  );
};

export default AddToCart;
