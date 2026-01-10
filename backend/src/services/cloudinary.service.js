import cloudinary from "../config/cloudinary.js";

export const uploadImageToCloudinary = (buffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    console.log("Uploading image to Cloudinary...");
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    console.log("Piping buffer to Cloudinary stream...");

    stream.end(buffer);
  });
};

/**
 * Xóa ảnh từ Cloudinary bằng publicId
 * @param {string} publicId - ID định danh của ảnh trên Cloudinary
 * @returns {Promise} - Trả về kết quả từ Cloudinary
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    console.log(`Deleting image with publicId: ${publicId} from Cloudinary...`);
    
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
        console.warn("Cloudinary delete warning:", result);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
