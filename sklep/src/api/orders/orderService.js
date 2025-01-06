const Order = require("./order");
const axios = require("axios");

const getBookByID = async (bookId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/books/${bookId}`
    );
    return response.data;
  } catch (error) {
    console.error("Błąd podczas sprawdzania książki:", error.message);
    return null;
  }
};

const getOrderByUserID = async (userId) => {
  return await Order.findAll({
    where: {
      userId: userId,
    },
  });
};

const addOrder = async (orderData) => {
  const { userId, bookId, quantity } = orderData;

  const book = await getBookByID(bookId);
  if (!book) {
    throw new Error("Książka o podanym ID nie istnieje.");
  }

  return await Order.create({
    userId: userId,
    bookId: bookId,
    quantity: quantity,
  });
};

const deleteOrder = async (orderId) => {
  const rowsDeleted = await Order.destroy({
    where: {
      id: orderId,
    },
  });
  if (rowsDeleted === 0) {
    throw new Error("Nie znaleziono zamówienia do usunięcia.");
  }

  return rowsDeleted;
};

const updateOrder = async (orderId, updateData) => {
  const order = await Order.findByPk(orderId);

  if (!order) {
    throw new Error("Zamówienie o podanym ID nie istnieje.");
  }
  return await order.update(updateData);
};

module.exports = { getOrderByUserID, addOrder, deleteOrder, updateOrder };
