import app from "./app.js";
import cloudinary from 'cloudinary';
import { dbconnection } from './database/dbConnection.js';
import dotenv from 'dotenv';


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async () => {
    await dbconnection();
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})();