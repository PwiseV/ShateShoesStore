
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";

// Load env vars
dotenv.config();

// Import Models
import User from "../models/User.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";
import ProductVariantImage from "../models/ProductVariantImage.js";
import Promotion from "../models/Promotion.js";

// DB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("MongoDB Connected for Seeding");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

const seedUsers = async () => {
    console.log("Seeding Users...");
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [
        {
            username: "admin",
            hashedPassword,
            email: "admin@gmail.com",
            displayName: "Admin User",
            role: "admin",
            avatar: {
                url: "https://ui-avatars.com/api/?name=Admin+User",
                publicId: "default_admin",
            },
        },
        {
            username: "customer",
            hashedPassword,
            email: "customer@gmail.com",
            displayName: "Customer User",
            role: "customer",
            avatar: {
                url: "https://ui-avatars.com/api/?name=Customer+User",
                publicId: "default_customer",
            },
        },
    ];

    await User.insertMany(users);
    console.log("Users Seeded");
};

const seedCategories = async () => {
    console.log("Seeding Categories...");
    await Category.deleteMany({});

    const categories = [
        { name: "Basas", slug: "basas" },
        { name: "Vintas", slug: "vintas" },
        { name: "Urbas", slug: "urbas" },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log("Categories Seeded");
    return createdCategories;
};

const seedProducts = async (categories) => {
    console.log("Seeding Products & Variants...");
    await Product.deleteMany({});
    await ProductVariant.deleteMany({});
    await ProductVariantImage.deleteMany({});

    const basasCat = categories.find((c) => c.name === "Basas");
    const vintasCat = categories.find((c) => c.name === "Vintas");

    // Sample Product 1
    const p1Title = "Basas Workmate - High Top";
    const p1 = await Product.create({
        code: "P001",
        title: p1Title,
        description: "Giày Basas cổ cao, phong cách tối giản.",
        categoryId: basasCat._id,
        tag: ["new", "best-seller"],
        avatar: {
            url: "https://ananas.vn/wp-content/uploads/Pro_AVT_HV_A61048.jpg",
            publicId: "p1_avatar",
        },
        slug: slugify(p1Title, { lower: true, strict: true }),
    });

    // Variants for P1 (Black & White)
    // 1. Create Images first
    const p1ImgBlack = await ProductVariantImage.create({
        color: "Black",
        productId: p1._id,
        avatar: {
            url: "https://ananas.vn/wp-content/uploads/Pro_AVT_HV_A61048.jpg",
            publicId: "p1_black",
        },
    });

    const p1ImgWhite = await ProductVariantImage.create({
        color: "White",
        productId: p1._id,
        avatar: {
            url: "https://ananas.vn/wp-content/uploads/Pro_AVT_HV_A61049.jpg",
            publicId: "p1_white",
        },
    });

    // 2. Create Variants
    // Black sizes
    await ProductVariant.create({
        sku: "P001-BLK-39",
        price: 650000,
        stock: 20,
        color: "Black",
        size: "39",
        productId: p1._id,
        productVariantImageId: p1ImgBlack._id,
    });
    await ProductVariant.create({
        sku: "P001-BLK-40",
        price: 650000,
        stock: 20,
        color: "Black",
        size: "40",
        productId: p1._id,
        productVariantImageId: p1ImgBlack._id,
    });
    // White sizes
    await ProductVariant.create({
        sku: "P001-WHT-39",
        price: 650000,
        stock: 15,
        color: "White",
        size: "39",
        productId: p1._id,
        productVariantImageId: p1ImgWhite._id,
    });

    // Sample Product 2
    const p2Title = "Vintas Mister - Low Top";
    const p2 = await Product.create({
        code: "P002",
        title: p2Title,
        description: "Giày Vintas cổ thấp, màu sắc vintage.",
        categoryId: vintasCat._id,
        tag: ["sale"],
        avatar: {
            url: "https://ananas.vn/wp-content/uploads/Pro_AVT_HV_A61043.jpg",
            publicId: "p2_avatar",
        },
        slug: slugify(p2Title, { lower: true, strict: true }),
    });

    // Vintas only has 1 color here for demo
    const p2ImgGreen = await ProductVariantImage.create({
        color: "Green",
        productId: p2._id,
        avatar: {
            url: "https://ananas.vn/wp-content/uploads/Pro_AVT_HV_A61043.jpg",
            publicId: "p2_green",
        },
    });

    await ProductVariant.create({
        sku: "P002-GRN-41",
        price: 720000,
        stock: 10,
        color: "Green",
        size: "41",
        productId: p2._id,
        productVariantImageId: p2ImgGreen._id,
    });

    console.log("Products & Variants Seeded");
};

const seedPromotions = async () => {
    console.log("Seeding Promotions...");
    await Promotion.deleteMany({});

    // Active promotion
    await Promotion.create({
        code: "SALE50",
        description: "Giảm giá 50k cho đơn từ 200k",
        discountType: "fixed",
        discountAmount: 50000,
        stock: 100,
        minOrderAmount: 200000,
        startedAt: new Date(),
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
        active: "active"
    });

    console.log("Promotions Seeded");
}

const runSeed = async () => {
    await connectDB();

    try {
        await seedUsers();
        const categories = await seedCategories();
        await seedProducts(categories);
        await seedPromotions();

        console.log("DATA SEEDING COMPLETED SUCCESSFULL! 🚀");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Failed:", error);
        process.exit(1);
    }
};

runSeed();
