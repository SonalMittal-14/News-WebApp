const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const dotenv = require("dotenv")
dotenv.config({path : "./.env"})

console.log(process.env.CLOUD_NAME);

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            throw new Error("LocalPath is Required.");

        }
 
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        })

        console.log("File Uploaded SuccessFully on cloudinary.");
        return response.url;
    }catch(error){
        console.log("Something went wrong while upload on cloudinary.");
    }
}

module.exports = uploadOnCloudinary;