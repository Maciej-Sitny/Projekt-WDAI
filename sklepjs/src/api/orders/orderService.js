import Order from "./orderModel.js";

export const getAllOrders = async () => {
  return await Order.findAll();
};

export const getOrderById = async (id) => {
  return await Order.findByPk(id);
};

export const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

export const updateOrder = async (id, orderData) => {
  const order = await Order.findByPk(id);
  if (!order) {
    throw new Error("Order not found");
  }
  return await order.update(orderData);
};

export const deleteOrder = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) {
    throw new Error("Order not found");
  }
  return await order.destroy();
};

export const getReviewsByProductIdService = async (productId) => {
  return await Order.findAll({ where: { productId } });
};
