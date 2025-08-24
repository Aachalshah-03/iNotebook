const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // Added for password hashing
const jwt = require('jsonwebtoken'); // Added for token creation
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET; // In production, store this in .env


// Route 1: creating user using POST: http://localhost:5000/api/auth/createuser
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({min: 6})
] , async (req, res) =>{
    let success = false;
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()
    // res.send(req.body)

//if any error the response will be sent as Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        //Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User with this email already exists" });
        }

         // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //If not, create the user
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
        });

        // Create JWT payload
        const data = {
            user: {
                id: user.id
            }
        };

        // Sign the token
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        // Return the token
        res.json({success, authToken, user:{id: user.id, name: user.name, email: user.email}});

        //res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
    });



//Route 2: creating login user using POST: http://localhost:5000/api/auth/login
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
] , async (req, res) =>{
    let success = false;
    //if any error the response will be sent as Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;      //destructuring is used 
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({error: "Please enter correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false
            return res.status(400).json({success, error: "Please enter correct credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }

        // Sign the token
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        // Return the token
        res.json({success, authToken });


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

});


//Route 3: Getting logged in user deatils using POST: http://localhost:5000/api/auth/getuser. Login required
router.post('/getuser', fetchuser, async (req, res) =>{

    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
