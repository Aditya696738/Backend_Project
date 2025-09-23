import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const ImageUpload = async(filePath) => {
  try {
    if(!filePath) return null;

    // file upload on cloudinary

    const reponse = await cloudinary.uploader.upload(filePath , {
      resource_type: "auto"
    })

    // file is uploaded

    console.log("url of uploaded image : " , reponse.url)
    return reponse;

  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
}
export {ImageUpload};