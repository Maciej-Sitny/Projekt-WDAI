import React from "react";
import * as products from "../../../public/products.json";
function OrderHistory(){
    const orders = localStorage.getItem('orders');

    return (
        <div className="orderHistory">
            {orders ? JSON.parse(orders).map((order: any) => (
                <div>
                    <h1>Zamówienie nr {order.id}</h1>
                    {order.map((item: any) => (
                        <div>
                            <img style={{width:"100px", height:"100px"}} src={products.default.find((product: any) => product.id === item.id).image} alt="product" />
                            <div>
                                <h2>{products.default.find((product: any) => product.id === item.id).title}</h2>
                                <div>
                                    <p>{products.default.find((product: any) => product.id === item.id).price} zł</p>
                                    <p>Ilość: {item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>)): <h1>Brak zamówień</h1>}
        </div>
    )
}