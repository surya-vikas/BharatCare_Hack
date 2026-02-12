import Order from "../models/Order.js";
import Medicine from "../models/Medicine.js"

// POST /orders/create
export const createOrder = async (req, res) => {
  try {
    const { pharmacyId, items } = req.body;

    // Ensure authenticated user
    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!pharmacyId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    // Validate each item shape and quantity
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item || !item.medicineId) {
        return res.status(400).json({ message: `Missing medicineId for item at index ${i}` });
      }
      if (!item.quantity || !Number.isInteger(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({ message: `Invalid quantity for medicine ${item.medicineId}` });
      }
    }

    // Check existence of all medicines in one query
    const medicineIds = [...new Set(items.map(i => i.medicineId))];
    const existing = await Medicine.find({ _id: { $in: medicineIds } }).select('_id').lean();
    const existingIds = new Set(existing.map(m => m._id.toString()));
    const missing = medicineIds.filter(id => !existingIds.has(id.toString()));
    if (missing.length > 0) {
      return res.status(400).json({ message: `Medicines not found: ${missing.join(', ')}` });
    }

    // Merge duplicate medicine entries (sum quantities)
    const mergedItems = items.reduce((acc, item) => {
      const found = acc.find(x => x.medicineId.toString() === item.medicineId.toString());
      if (found) found.quantity += item.quantity;
      else acc.push({ medicineId: item.medicineId, quantity: item.quantity });
      return acc;
    }, []);

    const order = await Order.create({
      userId,
      pharmacyId,
      items: mergedItems,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//import Order from "../models/Order.js";

// POST /orders/create
// PATCH /orders/update
export const updateOrderStatus = async (req, res) => {
  try {
    // Accept orderId from body or params
    const orderId = req.body.orderId || req.params.orderId || req.params.id;
    const status = req.body.status;

    if (!orderId || !status) {
      return res.status(400).json({ message: "Missing data" });
    }

    const allowedTransitions = {
      created: ["accepted"],
      accepted: ["delivered"],
      delivered: [],
    };

    const allowedStatuses = new Set(Object.keys(allowedTransitions));

    if (!allowedStatuses.has(status) && !Object.values(allowedTransitions).flat().includes(status)) {
      return res.status(400).json({ message: `Invalid target status: ${status}` });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === status) {
      return res.status(400).json({ message: `Order already has status '${status}'` });
    }

    const validNextStatuses = Array.isArray(allowedTransitions[order.status]) ? allowedTransitions[order.status] : [];
    if (!validNextStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status transition from ${order.status} to ${status}` });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
