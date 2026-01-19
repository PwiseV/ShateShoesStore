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

export const deleteImageFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    // cloudinary.uploader.destroy to delete image by publicId
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};
