// Giả định bạn đã có các Model (User, Product, Comment, Order)
import User from "../models/User.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import Order from "../models/Order.js"
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const getOverviewData = async () => {
  const sumCustomers = await User.countDocuments({ role: "customer" });
  const balanceResult = await Order.aggregate([
    { 
      $match: { status: "delivered" } 
    },
    { 
      $group: { 
        _id: null, 
        totalAmount: { $sum: "$total" } 
      } 
    }
  ]);

  const totalBalance = balanceResult.length > 0 ? balanceResult[0].totalAmount : 0;
  const customerTrend = -5.8;
  const balanceTrend = 10.6;

  return {
    sumCustomers,
    // Format lại số tiền (Ví dụ: 256000 -> "256k")
    balanceAmount: formatCurrency(totalBalance), 
    customerTrend,
    balanceTrend,
  };
};

/**
 * Hàm hỗ trợ format tiền tệ sang dạng rút gọn (k, M)
 */
const formatCurrency = (amount) => {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(0) + "k";
  }
  return amount.toString();
};

export const getNewCustomersToday = async () => {
  // 1. Tạo mốc thời gian: Hiện tại trừ đi 7 ngày
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // 2. Truy vấn Database
  const newCustomers = await User.find({
    createdAt: { $gte: sevenDaysAgo }, // Lấy các User có ngày tạo lớn hơn hoặc bằng 7 ngày trước
    role: "customer"                       // Đảm bảo chỉ lấy khách hàng, không lấy admin
  })
  .select("username email avatar")    // Chỉ lấy các field cần thiết cho UI
  .sort({ createdAt: -1 })            // Sắp xếp người mới nhất lên đầu
  .limit(10);                         // Giới hạn số lượng hiển thị (nếu cần)

  // 3. Map lại dữ liệu để khớp với Interface NewCustomer của bạn
  return newCustomers.map(user => ({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    avatar: user.avatar?.url || undefined // Chuyển null thành undefined để khớp type
  }));
};


export const getPopularProducts = async () => {
  // Truy vấn danh sách sản phẩm
  const products = await Product.find()
    .sort({ "ratings.length": -1 }) // Sắp xếp theo độ dài mảng ratings giảm dần
    .limit(5)                      // Lấy 5 sản phẩm đầu tiên
    .select("title avatar"); // Chỉ lấy các trường cần thiết

  // Map dữ liệu về đúng chuẩn Interface ProductItem
  return products.map((p) => ({
    id: p._id.toString(),
    name: p.title,
    price: 50000,
    status: "in stock",
    avatar: p.avatar?.url || undefined
  }));
};

export const getProductViews7Days = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  // 2. Truy vấn Aggregate
  const stats = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
        status: { $ne: "cancelled" }
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" }, 
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const daysMap = {
    1: "Sun", 2: "Mon", 3: "Tue", 4: "Wed", 5: "Thu", 6: "Fri", 7: "Sat"
  };

  // 3. Map kết quả
  const result = Object.keys(daysMap).map(key => {
    const dayIndex = parseInt(key);
    const dayData = stats.find(s => s._id === dayIndex);
    return {
      day: daysMap[dayIndex],
      views: dayData ? dayData.count : 0
    };
  });

  // Sắp xếp để bắt đầu từ Thứ 2
  const mondayToSunday = [...result.slice(1), result[0]];

  return mondayToSunday;
};

export const getLatestComments = async () => {
  // 1. Tạo mốc thời gian 7 ngày trước
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // 2. Truy vấn Database với Populate
  const reviews = await Review.find({
    createdAt: { $gte: sevenDaysAgo }
  })
  .populate("userId", "username avatar") // Liên kết bảng User, chỉ lấy field username và avatar
  .sort({ createdAt: -1 })
  .limit(10);

  // 3. Map lại dữ liệu
  return reviews.map(rev => ({
    id: rev._id.toString(),
    // Lấy thông tin từ object userId đã được populate
    username: rev.userId?.username || "Người dùng ẩn danh",
    content: rev.content,
    time: formatDistanceToNow(new Date(rev.createdAt), { 
      addSuffix: true, 
      locale: vi 
    }),
    avatar: rev.userId?.avatar.url || undefined
  }));
};