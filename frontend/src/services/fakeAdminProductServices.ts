import type {
  Product,
  SizeOption,
  Colors,
  ProductResponse,
  ProductQueryParams,
} from "./adminProductServices";

/* ============================
   MOCK DATA
============================ */

let mockProducts: Product[] = [
  {
    id: 1,
    productId: "SP001",
    title: "Nike Air Force 1 '07",
    description: "Huyền thoại Nike Air Force 1.",
    category: "Classic",
    avatar:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoe-rWtqPn.png",
    tags: ["nike", "hot"],
    sizes: [
      {
        sizeID: 101,
        size: "40",
        colors: [
          {
            colorId: 1001,
            color: "red",
            price: 2990000,
            stock: 10,
            avatar: "",
          },
          {
            colorId: 1002,
            color: "blue",
            price: 2990000,
            stock: 5,
            avatar: "",
          },
        ],
      },
      {
        sizeID: 102,
        size: "41",
        colors: [
          {
            colorId: 1003,
            color: "yellow",
            price: 2990000,
            stock: 8,
            avatar: "",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    productId: "SP002",
    title: "Adidas Ultraboost 22",
    description: "Giày chạy bộ êm ái.",
    category: "New",
    avatar:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
    tags: ["adidas", "running"],
    sizes: [
      {
        sizeID: 201,
        size: "42",
        colors: [
          {
            colorId: 2001,
            color: "gray",
            price: 5200000,
            stock: 15,
            avatar: "",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    productId: "SP003",
    title: "Giày Thể Thao Nam Biti's Hunter X",
    description: "Công nghệ đế LiteFlex độc quyền.",
    category: "Sale",
    avatar:
      "https://product.hstatic.net/1000230642/product/dsmh02800den__1__3a3a60f0c0574737893873335555c567_master.jpg",
    tags: ["bitis", "vietnam"],
    sizes: [
      {
        sizeID: 301,
        size: "40",
        colors: [
          {
            colorId: 3001,
            color: "black",
            price: 899000,
            stock: 20,
            avatar: "",
          },
          {
            colorId: 3002,
            color: "white",
            price: 899000,
            stock: 12,
            avatar: "",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    productId: "SP004",
    title: "Converse Chuck Taylor All Star",
    description: "Kiểu dáng cổ điển, không bao giờ lỗi mốt.",
    category: "Classic",
    avatar:
      "https://www.converse.com.vn/pictures/catalog/products/sneakers/chuck-taylor-all-star/121176/121176_01.jpg",
    tags: ["converse", "classic"],
    sizes: [
      {
        sizeID: 401,
        size: "39",
        colors: [
          {
            colorId: 4001,
            color: "black",
            price: 1500000,
            stock: 50,
            avatar: "",
          },
        ],
      },
    ],
  },
];

/* ============================
   MOCK HELPERS
============================ */
const generateId = () => Math.floor(Math.random() * 1000000);

/* ============================
   MOCK API IMPLEMENTATION
============================ */

export const getProducts = async (
  params: ProductQueryParams
): Promise<ProductResponse> => {
  await new Promise((res) => setTimeout(res, 600));

  let filtered = [...mockProducts];
  const { keyword, category, minPrice, maxPrice, page, pageSize } = params;

  // 1. Filter by Keyword
  if (keyword) {
    const lowerKey = keyword.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerKey) ||
        p.productId.toLowerCase().includes(lowerKey)
    );
  }

  // 2. Filter by Category
  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // 3. Filter by Price Range
  if (minPrice !== undefined || maxPrice !== undefined) {
    filtered = filtered.filter((p) => {
      // Lấy danh sách giá của tất cả các màu trong sản phẩm
      const prices: number[] = [];
      p.sizes.forEach((s) => s.colors.forEach((c) => prices.push(c.price)));

      if (prices.length === 0) return false;

      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);

      const validMin = minPrice !== undefined ? maxP >= minPrice : true;
      const validMax = maxPrice !== undefined ? minP <= maxPrice : true;

      return validMin && validMax;
    });
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize,
  };
};

export const createProduct = async (
  payload: Omit<Product, "id">
): Promise<Product> => {
  await new Promise((res) => setTimeout(res, 400));
  const newProduct: Product = {
    id: generateId(),
    ...payload,
    tags: payload.tags || [],
    sizes: [],
  };
  mockProducts.unshift(newProduct);
  return newProduct;
};

export const updateProduct = async (
  id: number,
  patch: Partial<Product>
): Promise<Product> => {
  await new Promise((res) => setTimeout(res, 400));
  const product = mockProducts.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  Object.assign(product, patch);
  return product;
};

export const deleteProduct = async (
  id: number
): Promise<{ message: string }> => {
  await new Promise((res) => setTimeout(res, 400));
  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx !== -1) mockProducts.splice(idx, 1);
  return { message: "Success" };
};

// Sizes
export const getProductSizes = async (
  productId: number
): Promise<SizeOption[]> => {
  await new Promise((res) => setTimeout(res, 300));
  const p = mockProducts.find((x) => x.id === productId);
  return p ? p.sizes : [];
};

export const addProductSize = async (
  productId: number,
  payload: Omit<SizeOption, "sizeID">
): Promise<SizeOption> => {
  await new Promise((res) => setTimeout(res, 300));
  const product = mockProducts.find((p) => p.id === productId);
  if (!product) throw new Error("Product not found");

  const newSize: SizeOption = {
    sizeID: generateId(),
    size: payload.size,
    colors: [],
  };
  product.sizes.push(newSize);
  return newSize;
};

export const deleteProductSize = async (
  sizeId: number
): Promise<{ message: string }> => {
  await new Promise((res) => setTimeout(res, 300));
  for (const p of mockProducts) {
    const idx = p.sizes.findIndex((s) => s.sizeID === sizeId);
    if (idx !== -1) {
      p.sizes.splice(idx, 1);
      return { message: "Deleted" };
    }
  }
  throw new Error("Size not found");
};

// Colors
export const getSizeColors = async (sizeId: number): Promise<Colors[]> => {
  await new Promise((res) => setTimeout(res, 300));
  for (const p of mockProducts) {
    const s = p.sizes.find((x) => x.sizeID === sizeId);
    if (s) return s.colors;
  }
  return [];
};

export const addSizeColor = async (
  sizeId: number,
  payload: Omit<Colors, "colorId">
): Promise<Colors> => {
  await new Promise((res) => setTimeout(res, 300));

  let foundSize: SizeOption | undefined;
  for (const p of mockProducts) {
    foundSize = p.sizes.find((s) => s.sizeID === sizeId);
    if (foundSize) break;
  }

  if (!foundSize) throw new Error("Size not found");

  const newColor: Colors = {
    colorId: generateId(),
    ...payload,
  };
  foundSize.colors.push(newColor);
  return newColor;
};

export const updateProductColor = async (
  colorId: number,
  patch: Partial<Colors>
): Promise<Colors> => {
  await new Promise((res) => setTimeout(res, 300));
  for (const p of mockProducts) {
    for (const s of p.sizes) {
      const color = s.colors.find((c) => c.colorId === colorId);
      if (color) {
        // Update properties including avatar
        Object.assign(color, patch);
        return color;
      }
    }
  }
  throw new Error("Color not found");
};

export const deleteProductColor = async (
  colorId: number
): Promise<{ message: string }> => {
  await new Promise((res) => setTimeout(res, 300));
  for (const p of mockProducts) {
    for (const s of p.sizes) {
      const idx = s.colors.findIndex((c) => c.colorId === colorId);
      if (idx !== -1) {
        s.colors.splice(idx, 1);
        return { message: "Deleted" };
      }
    }
  }
  throw new Error("Color not found");
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductSizes,
  addProductSize,
  deleteProductSize,
  getSizeColors,
  addSizeColor,
  updateProductColor,
  deleteProductColor,
};
