const express = require("express");
const multer = require("multer");
const upload = require("../middleware/multer.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const bcrypt = require("bcrypt");
const router = express();
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middleware/auth.js");


router.get("/" , (req,res) => {
  res,send("hello")
})

router.get('/isAuthorized' , AuthMiddleware , async (req,res) => {
  if(req.user){
    return res.status(200).json({message:"Authorized!"})
  }
});

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(201).json({ message: "Please upload an image" });
    }

    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(202).json({ message: "USer Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = await uploadOnCloudinary(req.file.path);
    if (!imageUrl) {
      return res.status(203).json({ message: "Image upload failed" });
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,
      image: imageUrl,
    });

    await user.save();

    return res.status(200).json({ message: "User Register SuccessFully!!!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(201)
        .json({ message: "User Not Exist . Please Register.." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);

    if (!isPasswordCorrect) {
      return res.status(202).json({ message: "Password is Incorrect" });
    }

    const token = jwt.sign({ _id: findUser._id }, "secret", {
      expiresIn: "1d",
    });
    
    return res.status(200).json({ message: "Login SuccessFully!!!"  , token});
  } catch (error) {
    console.log(error);
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log("ww" , token);
  
    const verify = jwt.verify(token, "secret");
    const user = await User.findOne({ _id: verify._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", async (req, res) => {
  

  return res.status(200).json({ message: "LogOut SuccessFully" });
});

router.post("/updateuser/:id",upload.single("image"), async (req, res) => {
  try {
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    let  imageurl = user.image;
    if(req.file){
      imageurl = await uploadOnCloudinary(req.file.path);
    }
    await User.findByIdAndUpdate(req.params.id , {
      $set: {
        username: req.body.username,
        email: req.body.email,
        image: imageurl,
        password:user.password
      }
    })
      
      return res.status(200).json({message:"User Updated SuccessFully..."});
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
   
  })


module.exports = router;
