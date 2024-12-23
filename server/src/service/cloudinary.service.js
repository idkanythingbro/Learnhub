const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
}



const uploadFileToCloudinary = async (
    localFilePath,
    resource_type = "auto",
    asset_folder = ''
    // buffer
) => {
    try {

        if (!localFilePath) return null;
        configCloudinary();

        const uploadResult = await
            cloudinary.uploader.upload(localFilePath, {
                resource_type: resource_type || "auto",
                asset_folder: asset_folder || ''
            });


        fs.unlinkSync(localFilePath);
        // console.log(uploadResult);
        return uploadResult.url;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}



const deleteFromCloudinary = async (public_url) => {

    try {
        if (!public_url) return null
        const public_id = public_url.split('/').pop().split('.').shift();
        // console.log(public_id);

        configCloudinary();
        const res = await cloudinary.uploader.destroy(public_id);
        return res;
    } catch (error) {
        // console.log(error);
        return null;
    }
}

module.exports = {
    uploadFileToCloudinary,
    deleteFromCloudinary,
}