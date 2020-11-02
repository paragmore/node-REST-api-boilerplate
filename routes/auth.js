const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const User = require('../models/User')
const {loginValidation, registerValidation} = require('../validation')

router.post('/register', async (req,res)=>{
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send("[EXCEPTION] Email Already Exists")
    const user = new User({
        name: req.body.name,
        email: req.body,email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res)=>{
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
     
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("[EXCEPTION] Email Does not Exist. Please Register First")

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Please enter valid email or password")

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET )
    res.header('auth-token', token).send(token)


    res.send(`Welcome ${user.name}`)

})


module.exports = router