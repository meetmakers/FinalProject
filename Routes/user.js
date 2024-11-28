const express = require('express')
const {createUser,handleSignIn,handleSignOut} = require('../Controllers/user')

const router = express.Router();


router.get('/signin',(request,response)=>{
  return response.render('signin')
})

router.get('/signup',(request,response)=>{
  return response.render('signup')
})

router.post('/signup',createUser)

router.post('/signin',handleSignIn)

router.get('/signout',(request,response)=>{
  console.log("Inside Function")
  response.clearCookie('token').redirect('/')
})

module.exports = router;