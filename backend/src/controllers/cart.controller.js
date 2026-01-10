// import CartItem from "../models/CartItem.js";
// import ProductColorVariant from "../models/ProductColorVariant.js";

// export const addCartItem = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { colorId, quantity } = req.body;

//     if (!colorId || quantity <= 0) {
//       return res.status(400).json({ message: "Invalid data" });
//     }

//     const color = await ProductColorVariant.findById(colorId);
//     if (!color) {
//       return res.status(404).json({ message: "Color variant not found" });
//     }

//     const cartItem = await CartItem.findOne({ userId, colorId });

//     if (quantity > color.stock) {
//       return res.status(400).json({
//         message: `Only ${color.stock} left`,
//         avalableStock: color.stock,
//       });
//     }

//     if (cartItem) {
//       return res.status(400).json({
//         message: "Item is already in user's cart",
//       });
//     } else {
//       await CartItem.create({
//         userId,
//         colorId,
//         quantity,
//       });

//       return res.status(201).json({
//         message: "Add to cart success",
//       });
//     }
//   } catch (error) {
//     console.error("Add cart item error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateCartItem = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { cartItemId, quantity } = req.body;

//     if (!cartItemId || quantity <= 0) {
//       return res.status(400).json({ message: "Invalid data" });
//     }

//     const cartItem = await CartItem.findOne({
//       _id: cartItemId,
//       userId,
//     }).populate("colorId");

//     if (!cartItem) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     const stock = cartItem.colorId.stock;

//     if (quantity > stock) {
//       return res.status(400).json({
//         message: `Only ${stock} left`,
//         avalableStock: stock,
//       });
//     }

//     cartItem.quantity = quantity;
//     await cartItem.save();

//     return res.status(200).json({
//       message: "Update cart item success",
//     });
//   } catch (error) {
//     console.error("Update cart item error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const getCartItem = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const cartItems = await CartItem.find({ userId }).populate({
//       path: "colorId",
//       select: "color stock price",
//       populate: {
//         path: "sizeId",
//         select: "size",
//         populate: {
//           path: "productId",
//           select: "title",
//         },
//       },
//     });

//     const data = cartItems.map((item) => {
//       const stockLeft = item.colorId.stock;
//       const isOverStock = item.quantity > stockLeft;

//       return {
//         cartItemId: item._id,
//         title: item.colorId.sizeId.productId.title,
//         size: item.colorId.sizeId.size,
//         color: item.colorId.color,
//         price: item.colorId.price,
//         quantity: item.quantity,
//         stockLeft,
//         isOverStock,
//       };
//     });

//     return res.status(200).json({
//       message: "Get cart items success",
//       data,
//     });
//   } catch (error) {
//     console.error("Get cart item error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// export const deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { cartItemId } = req.body;

//     if (!cartItemId) {
//       return res.status(400).json({ message: "Cart item id is required" });
//     }

//     const cartItem = await CartItem.findOneAndDelete({
//       _id: cartItemId,
//       userId,
//     });

//     if (!cartItem) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     return res.status(200).json({
//       message: "Delete cart item success",
//     });
//   } catch (error) {
//     console.error("Delete cart item error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
