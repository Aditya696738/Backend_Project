import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const ImageUpload = async(Local_file_Path) => {
  try {
    if(!Local_file_Path) return null;

    // file upload on cloudinary

    const reponse = await cloudinary.uploader.upload(Local_file_Path , {
      resource_type: "auto"
    })

    // file is uploaded

    console.log("url of uploaded image : " , reponse.url)
    return reponse;

  } catch (error) {
    fs.unlinkSync(Local_file_Path);
    return null;
  }
}
export {ImageUpload}