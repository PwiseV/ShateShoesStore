import type {
  UserProfile,
  UpdateProfileDTO,
  AddressDTO,
  Address,
} from "./userProfileServices";

// --- DỮ LIỆU MOCK (Lưu trong RAM để test) ---
let MOCK_USER: UserProfile = {
  username: "mattroibecon124",
  name: "Lý Thị Lẹt",
  email: "mattroibecon@gmail.com",
  phone: "0273654723",
  avatar:
    "https://i.pinimg.com/564x/d1/18/50/d118507742d45c61448b1d9df50c18d3.jpg",
  addresses: [
    {
      id: 1,
      content:
        "167 Vo Van Kiet, phường 5, Quận Thủ Đức, TP Hồ Chí Minh, Việt Nam",
      street: "167 Vo Van Kiet",
      ward: "phường 5",
      district: "Quận Thủ Đức",
      city: "TP Hồ Chí Minh",
      country: "Việt Nam",
      isDefault: true,
    },
    {
      id: 2,
      content:
        "452 Vo Van Kiet, phường 5, Quận Thủ Đức, TP Hồ Chí Minh, Việt Nam",
      street: "452 Vo Van Kiet",
      ward: "phường 5",
      district: "Quận Thủ Đức",
      city: "TP Hồ Chí Minh",
      country: "Việt Nam",
      isDefault: false,
    },
  ],
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// --- CÁC HÀM GIẢ LẬP ---

export const getUserProfile = async (): Promise<UserProfile> => {
  await delay(500);
  return { ...MOCK_USER }; // Trả về copy để tránh mutate trực tiếp
};

export const updateUserProfile = async (
  data: UpdateProfileDTO,
): Promise<UserProfile> => {
  await delay(1000);

  // Cập nhật thông tin text
  MOCK_USER.name = data.name;
  MOCK_USER.phone = data.phone;

  // Giả lập upload ảnh (nếu là File thì tạo URL ảo)
  if (data.avatar instanceof File) {
    const fakeUrl = URL.createObjectURL(data.avatar);
    MOCK_USER.avatar = fakeUrl;
    console.log("[FakeAPI] Uploaded avatar:", data.avatar.name);
  }

  return { ...MOCK_USER };
};

export const addUserAddress = async (data: AddressDTO): Promise<Address[]> => {
  await delay(800);

  const newId = Date.now();
  const fullContent = `${data.street}, ${data.ward}, ${data.district}, ${data.city}, ${data.country}`;

  const newAddress: Address = {
    id: newId,
    content: fullContent,
    ...data,
  };

  // Xử lý logic Default
  if (data.isDefault) {
    MOCK_USER.addresses = MOCK_USER.addresses.map((a) => ({
      ...a,
      isDefault: false,
    }));
  }

  MOCK_USER.addresses.push(newAddress);
  return [...MOCK_USER.addresses];
};

export const updateUserAddress = async (
  id: number,
  data: AddressDTO,
): Promise<Address[]> => {
  await delay(800);

  const fullContent = `${data.street}, ${data.ward}, ${data.district}, ${data.city}, ${data.country}`;

  // Nếu set default -> bỏ default cũ
  if (data.isDefault) {
    MOCK_USER.addresses = MOCK_USER.addresses.map((a) => ({
      ...a,
      isDefault: false,
    }));
  }

  MOCK_USER.addresses = MOCK_USER.addresses.map((addr) => {
    if (addr.id === id) {
      return { ...addr, ...data, content: fullContent };
    }
    return addr;
  });

  return [...MOCK_USER.addresses];
};

export const deleteUserAddress = async (id: number): Promise<Address[]> => {
  await delay(500);
  MOCK_USER.addresses = MOCK_USER.addresses.filter((a) => a.id !== id);
  return [...MOCK_USER.addresses];
};
