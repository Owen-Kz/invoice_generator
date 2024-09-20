    const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { configDotenv } = require("dotenv");
const cloudinary = require('cloudinary').v2;
const bcrypt = require("bcryptjs");
const db = require("../routes/dbconfig");
const jwt = require("jsonwebtoken");
// Load environment variables
configDotenv();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Define the upload folder path and ensure it is writable
const folderPath = path.join(__dirname, "../public/userUpload/");
fs.access(folderPath, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(`The folder '${folderPath}' is not writable:`, err);
  } else {
    console.log(`The folder '${folderPath}' is writable`);
  }
});

// Configure multer storage settings and file size limit
const storage = multer.diskStorage({
  destination: folderPath,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const profileFile = uniqueSuffix + fileExtension;
    cb(null, profileFile);
  },
});

// Set file size limit (e.g., 5MB per file)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Optional: You can filter file types here if needed
    cb(null, true);
  }
});

const signup = async (req,res) =>{

  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'One or more files exceed the maximum allowed size of 5MB' });
      }
      return res.status(500).json({ error: 'File upload failed' });
    }

    try {
      const imageFiles = req.files['imageFile[]'] || [];
      const logo = req.files['logo'] ? req.files['logo'][0] : null;
      const signature = req.files['signature'] ? req.files['signature'][0] : null;

      // Upload files to Cloudinary and save them to your database or process them
      const uploadToCloudinary = async (file) => {
        return new Promise((resolve, reject) => {
            let uploadOptions = {};
        
            // Check if the file is a video
            if (file.mimetype.startsWith('video/')) {
              uploadOptions.resource_type = 'video';
            }
        
            cloudinary.uploader.upload(file.path, uploadOptions, (error, result) => {
              if (error) {
                // console.error('Upload to Cloudinary failed:', error, file);
                return res.status(500).json({ error: `Failed to upload ${file.originalname}. Invalid file format.` });
              }
            //   console.log('Uploaded to Cloudinary:', result.url);
        
              // Clean up local file
              fs.unlink(file.path, (unlinkErr) => {
                if (unlinkErr) {
                //   console.error('Error deleting local file:', unlinkErr);
                } else {
                //   console.log('Local file deleted successfully.');
                }
              });
        
              resolve(result.url);
            });
          });
      };

      // Process all files
      const uploadedLogoUrl = logo ? await uploadToCloudinary(logo) : null;
      const uploadedsignatureUrl = signature ? await uploadToCloudinary(signature) : null;

      // You can now save the file URLs or other data to your database
 
    //   Send Data to backedn for processing 
    const { company_name, company_email, company_website, company_reg_number, company_address, phonenumber, fullname, bank_name, account_number, account_name, password } = req.body;
    const hPassword = await bcrypt.hash(password, 8);

    db.query("SELECT * FROM user_accounts WHERE company_email = ?", [company_email], async (err, data) =>{
        if(err){
            console.log(err)
            return res.json({error:err})
        }else if(data[0]){
            return res.json({error:"An Account Already exist with this email"})
        }else{
            db.query("INSERT INTO user_accounts SET ?", [{company_name, company_email, company_website, company_logo:uploadedLogoUrl, reg_number:company_reg_number, company_phone:phonenumber, fullname, signature:uploadedsignatureUrl, bank_name, account_name, account_number, company_address, password:hPassword}], async (err, result) =>{
                if(err){
                    console.log(err)
                   return res.json({error:err})
                }else{
                    
                     // create cookie token
                const token = jwt.sign({id: result[0].id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                    // httpOnly: true
                })
                // create cookie expiry date 
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                // save cookie 
             
                res.cookie("userRegistered", token, cookieOptions)
                res.cookie("uid",result[0].id, cookieOptions)
                    return res.json({success:"Account Created Succesfully"})
                }
            })
        }
    })
    //   res.status(200).send({ success: 'Files  uploaded successfully' });   
    } catch (error) { 
        console.log(error)
      return res.json({error:error.message});
    //   res.status(500).send('An error occurred during file upload');
    }
  });   

};



module.exports = signup