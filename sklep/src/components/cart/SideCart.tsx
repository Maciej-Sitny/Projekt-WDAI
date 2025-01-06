import React from "react";
import * as products from "../../../public/products.json";
interface CartItem {
    id: number;
    quantity: number;
}

function SideCart(props: any) {
    const cart = localStorage.getItem('cart');
    const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
    const [cartItemsState, setCartItemsState] = React.useState(cartItems);
    React.useEffect(() => {
        setCartItemsState(cartItems);
    }, [cartItems]);
    return (
        <div className="sideCart">
            <h1>Twój koszyk</h1>
            {cartItemsState.map((item, index) => (
                <div key={index}>
                    <img style={{width:"100px", height:"100px"}} src={products.default.find((product: any) => product.id === item.id).image} alt="product" />
                    <div>
                        <h2>
                            {products.default.find((product: any) => product.id === item.id).title}
                        </h2>
                        <p>{products.default.find((product: any) => product.id === item.id).description.slice(0,100)}...</p>
                        <div>
                            <p>{products.default.find((product: any) => product.id === item.id).price} zł</p>
                            <div>
                                <p>-</p>
                                <p>{item.quantity}</p>
                                <p>+</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SideCart;