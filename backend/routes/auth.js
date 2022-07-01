const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Reset = require('../models/ResetCode');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_secret = 'i$m$ram$cool';


//Route 2 : Creat a user using: POST "/api/auth/createUser". Doesnt require Auth
router.post('/createUser',
  body('email').isEmail(),
  body('name').isString(),
  body('name').isLength({ min: 3 }),
  body('password').isLength({ min: 8, max: 250 }),
  async (req, res) => {
    let success = false;
    // Checking for errors using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Checking for if email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user != null) {
        return res.json({ error: "Duplicate email found" });
      }
      // Creating salt
      const salt = await bcrypt.genSalt(10);
      // Hashing Password using bcrypt.hash
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Creating a user in db , fetching credentials from body
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

      });
      const data = {
        id: user.id
      }

      // Generating auth token , named as jwtData
      const jwtData = jwt.sign(data, JWT_secret);
      success = true;
      res.json({ success, authtoken: jwtData })


    } catch (err) {
      console.log(err.message);
    }
  })
//Route 1 : Authenticate a User using: POST "/api/auth/login". Doesnt require login
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password').isLength({ min: 8, max: 250 }).exists()]
  , async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Enter valid Credentials" })
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter valid Credentials" })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_secret);
      success = true;
      res.json({ success, authtoken })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: "Internal server Error" });
    }
  });

//Route 3 : Get loggedin User details using: POST "/api/auth/createUser". Loggedin Required
router.post('/getUser', fetchUser
  , async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: "Internal server Error" });
    }
  });
// Route 4 : Send Email 
router.post('/emailsend', [
  body('email', 'Enter a valid Email').isEmail()]
  , async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Enter valid Credentials" })
      }
      let otpCode = Math.floor(Math.random() * 10000);
      let otpData = new Reset({
        email: req.body.email,
        code: otpCode,
        expireIn: new Date().getTime() + 300 * 1000
      })
      let otpResponse = await otpData.save();
      mailer(req.body.email, otpcode);
      res.json("Otp sent ")
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: "Internal server Error" });
    }
  });

const mailer = (email, otp) => {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'code@gmail.com',
      pass: '687547898765'
    }
  });

  var mailOption = {
    from: 'code@gmail.com',
    to: 'ram@gmail.com',
    subject: 'Reset your password',
    text: ''
  };

  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    }
  });

}
// Route 5 : Reset password 
router.post('/resetpassword', async (req, res) => {
  let success = false;
  let data = await Reset.find({ email: req.body.email, code: req.body.otpCode })
  try {
    if (!data) {
      res.status(400).json({ error: "Invalid Otp" });
    }
    else {
      let user = await User.findOne({ email: req.body.email });
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user.password = secPass;
      user.save();
      const data = {
        user: {
          id: user.id
        }
      }
    }
    const authtoken = jwt.sign(data, JWT_secret);
    success = true;
    res.json({ success, authtoken })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Internal server Error" });
  }
});
// Route 6 : Change password 
router.post('/changepassword', [
  body('email', 'Enter a valid Email').isEmail()], async (req, res) => {
    let success = false;
    let data = await Reset.find({ email: req.body.email })
    try {
      if (!data) {
        res.status(400).json({ error: "Invalid Email" });
      }
      else {
        let user = await User.findOne({ email: req.body.email });
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user.password = secPass;
        user.save();
        const data = {
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success = true;
        res.json({ success, authtoken })
      }

    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: "Internal server Error" });
    }
  });
module.exports = router;