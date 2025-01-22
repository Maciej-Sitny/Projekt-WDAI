import { Router } from "express";
import {
  createOrderController,
  getOrderByIdController,
  getAllOrdersController,
  updateOrderController,
  deleteOrderController,
} from "./orderController.js";

const router = Router();

// Get all orders
router.get("/", getAllOrdersController);

// Get order by ID
router.get("/:id", getOrderByIdController);

// Create a new order
router.post("/", createOrderController);

// Update an order by ID
router.put("/:id", updateOrderController);

// Delete an order by ID
router.delete("/:id", deleteOrderController);

export default router;
