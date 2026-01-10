// import mongoose from "mongoose";
// import CartItem from "../models/CartItem.js";
// import Order from "../models/Order.js";
// import OrderItem from "../models/OrderItem.js";
// import ProductColorVariant from "../models/ProductColorVariant.js";

// export const createOrder = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const userId = req.user._id;
//     const { promotionId, name, phone, address, note } = req.body;

//     const cartItems = await CartItem.find({ userId })
//       .populate("colorId")
//       .session(session);

//     if (!cartItems.length) {
//       throw new Error("Cart is empty");
//     }

//     for (const item of cartItems) {
//       if (item.quantity > item.colorId.stock) {
//         throw new Error("Not enough stock");
//       }
//     }

//     const orderNumber = `ORD-${Date.now()}`;

//     const total = cartItems.reduce(
//       (sum, item) => sum + item.quantity * item.colorId.price,
//       0
//     );

//     const [order] = await Order.create(
//       [
//         {
//           userId,
//           orderNumber,
//           total,
//           name,
//           phone,
//           address,
//           note,
//           promotionId,
//         },
//       ],
//       { session }
//     );

//     const orderItems = cartItems.map((item) => ({
//       orderId: order._id,
//       colorId: item.colorId._id,
//       quantity: item.quantity,
//       price: item.colorId.price,
//     }));

//     await OrderItem.insertMany(orderItems, { session });


//     for (const item of cartItems) {
//       await ProductColorVariant.findByIdAndUpdate(
//         item.colorId._id,
//         { $inc: { stock: -item.quantity } },
//         { session }
//       );
//     }

//     await CartItem.deleteMany({ userId }).session(session);

//     await session.commitTransaction();

//     return res.status(201).json({
//       message: "Create order success",
//       orderId: order._id,
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     return res.status(400).json({ message: error.message });
//   } finally {
//     session.endSession();
//   }
// };
