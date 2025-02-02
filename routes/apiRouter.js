const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {authenticateToken, generateAccessToken} = require('../auth');
const { check, validationResult } = require('express-validator');
var TeamMember = require('../models/TeamMember');
var Product = require('../models/Product');
var Service = require('../models/Service');
var Client = require('../models/Client');
const User = require('../models/User');
const Contact =require('../models/Contact');
const Subscribe = require('../models/Subscribe');

var mailer = require('../mailer');

const mailData = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    html: ''
};


router.post('/create-user', async (req,res)=>{
    let user = new User({username: req.body.username, password: req.body.password});
    let secret = req.headers['secret'];

    if(!secret || process.env.TOKEN_SECRET != secret){
        res.status(401).json({message:"Need Secret token to create user. Please contact admin"});
    }

    if(user.username == 'admin'){
        const users = await User.find();
        if(users.length) return res.status(200).json({message: 'Admin already created. Please Login using admin to create user'})
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save().then(()=>{
        res.status(200).json({message:"User Created Success"});
    }, (err)=> {
        res.status(500).json({message:err});
    })
});

router.get('/users', authenticateToken, async (req,res)=>{
    const users = await User.find();
    res.status(200).json(users);
});


/** TEAM MEMBER */
router.get('/team-member', authenticateToken, async (req,res)=>{
  const teamMembers = await TeamMember.find();
  res.status(200).json(teamMembers);
});

router.post('/team-member', authenticateToken, async (req,res)=>{
  let teamMember = new TeamMember({...req.body});
  teamMember.save().then((response)=>{
    res.status(200).json(response);
  },(err)=>{
    res.status(500).json(err);
  });
});

router.put('/team-member', authenticateToken, async (req,res)=>{
  TeamMember.findOneAndUpdate({_id:req.body._id}, {...req.body}, {new:true, upsert:true}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to update"});
    }
  });
});

router.delete('/team-member', authenticateToken, async (req,res)=>{
  TeamMember.remove({_id:req.body._id}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to Delete"});
    }
  });
});
/** TEAM MEMBER */


/** PRODUCT API */
router.get('/product', authenticateToken, async (req,res)=>{
  const products = await Product.find();
  res.status(200).json(products);
});

router.post('/product', authenticateToken, async (req,res)=>{
  let product = new Product({...req.body});
  product.save().then((response)=>{
    res.status(200).json(response);
  },(err)=>{
    res.status(500).json(err);
  });
});

router.put('/product', authenticateToken, async (req,res)=>{
  Product.findOneAndUpdate({_id:req.body._id}, {...req.body}, {new:true, upsert:true}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to update"});
    }
  });
});

router.delete('/product', authenticateToken, async (req,res)=>{
  Product.remove({_id:req.body._id}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to Delete"});
    }
  });
});
/** PRODUCT API */


/** SERVICE API */
router.get('/service', authenticateToken, async (req,res)=>{
  const services = await Service.find();
  res.status(200).json(services);
});

router.post('/service', authenticateToken, async (req,res)=>{
  let service = new Service({...req.body});
  service.save().then((response)=>{
    res.status(200).json(response);
  },(err)=>{
    res.status(500).json(err);
  });
});


router.put('/service', authenticateToken, async (req,res)=>{
  Service.findOneAndUpdate({_id:req.body._id}, {...req.body}, {new:true, upsert:true}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to update"});
    }
  });
});

router.delete('/service', authenticateToken, async (req,res)=>{
  Service.remove({_id:req.body._id}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to Delete"});
    }
  });
});
/** SERVICE API */


/** Client */
router.get('/client', authenticateToken, async (req,res)=>{
  const clients = await Client.find();
  res.status(200).json(clients);
});

router.post('/client', authenticateToken, async (req,res)=>{
  let client = new Client({...req.body});
  client.save().then((response)=>{
    res.status(200).json(response);
  },(err)=>{
    res.status(500).json(err);
  });
});

router.put('/client', authenticateToken, async (req,res)=>{
  Client.findOneAndUpdate({_id:req.body._id}, {...req.body}, {new:true, upsert:true}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to update"});
    }
  });
});

router.delete('/client', authenticateToken, async (req,res)=>{
  Client.remove({_id:req.body._id}, (err, doc)=>{
    if(!err){
      res.status(200).json(doc);
    }else{
      res.status(500).json({message:"Failed to Delete"});
    }
  });
});

/** Client */

router.get('/get-in-touch', authenticateToken, async (req,res)=>{
  let email = req.query.email;
  let findObject = {}
  if(email){
    findObject.email = email;
  }
  const getInTouch = await Contact.find(findObject);
  res.status(200).json(getInTouch);
});

router.get('/subscribe', authenticateToken, async (req,res)=>{
    const subscribedUsers = await Subscribe.find();
    res.status(200).json(subscribedUsers);
});

router.post('/subscribe', [
    check('email')
      .isEmail()
  ], async (req, res) => {
    const validator = validationResult(req);
    if(validator.errors.length){
      res.status(500).json({message:"Please enter the correct email"});
    }else{
      let {email} = req.body;
      let newsletterSubscribe = new Subscribe({email});
      await newsletterSubscribe.save().then(()=> {
        mailData.subject = `${email} has subscribed for latest product updates`;
        mailer.sendMail(mailData);
        res.status(200).send({message:"You've have successfully subscribed to out products update"});
      },(err)=>{
        if(err.name === 'MongoError' && err.code === 11000){
          res.status(500).json({message:"Email Already subscribed"});
        }else{
          res.status(500).json({message:err});
        }
      });
    }
  })

  router.post('/contact', [
    check('message')
      .isLength({ min: 1 })
      .withMessage('Message is required'),
    check('firstname')
      .isLength({ min: 1 })
      .withMessage('First Name is required'),
    check('phone')
      .isLength({ min: 1 })
      .withMessage('Mobile Number is required'),
    check('email')
      .isEmail()
      .withMessage('Email doesn‘t look right')
  ], (req, res) => {
    const validator = validationResult(req);
    if(validator.errors.length){
      res.status(500).json(validator.errors);
    }else{
      let {email, message, firstname, lastname, subject, phone} = req.body;
      var contact = new Contact({email,firstname,lastname,subject,message,phone});
      contact.save().then(()=>{
        mailData.to = email;
        mailData.html = message;
        mailData.subject = `${firstname} ${lastname} - ${phone}: ` + (subject || "Customer Requested for Get in Touch");
        mailer.sendMail(mailData);
        res.status(200).send({message:"We will get in touch with you shortly"});
      },()=>{
        res.status(500).json({message:"Failed to place contact request. Please try again sometime"});
      })
    }
  });

router.post('/login', async (req,res)=>{
    console.log('********** LOGIN API **********', req.body);
    let username = req.body.username;
    let password = req.body.password;
    let user = await User.findOne({username});
    if(!user){
        return res.status(400).json({message:"Username or password is wrong"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({
            message: "Username or password is wrong"
        });
    }

    let token = generateAccessToken({username,password});
    res.status(200).json({token});
});

module.exports = router;