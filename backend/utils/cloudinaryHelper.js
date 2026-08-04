const cloudinary = require('../config/cloudinary');

/**
 * Uploads a buffer directly to Cloudinary without saving it to disk first.
 *
 * @param {Buffer} fileBuffer - The file buffer from Multer memoryStorage.
 * @param {String} folder - Cloudinary folder name.
 * @param {String} resourceType - 'image', 'video', or 'auto'.
 * @returns {Promise<Object>} - The Cloudinary upload response object.
 */
exports.uploadStream = (fileBuffer, folder, resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: `rural_empowerment/${folder}`,
      resource_type: resourceType,
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary stream upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Write the buffer to the stream
    stream.end(fileBuffer);
  });
};

/**
 * Deletes an asset from Cloudinary using its public_id.
 *
 * @param {String} publicId - The public ID of the asset on Cloudinary.
 * @param {String} resourceType - 'image' or 'video'.
 * @returns {Promise<Object>} - The Cloudinary destruction response object.
 */
exports.deleteAsset = (publicId, resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: resourceType },
      (error, result) => {
        if (error) {
          console.error('Cloudinary delete error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
