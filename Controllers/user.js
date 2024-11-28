const User = require('../Models/user')

async function createUser(request,response){
  let {name,email,dob,password} = request.body;
  // console.log(name)
  // password = atob(password)
  // console.log(password)

  try{
    const existingUser = await User.findOne({email})
    // console.log(existingUser)
    if(existingUser)
        return response.render('signup',{
        error:"Email Already Exists"})
    await User.create({
      name,email,password,dob
    })
  }catch(e){
    console.log(e)
  }
  return response.redirect('/user/signin')
}

async function handleSignIn(request,response){
  const {name,email,password} = request.body;
  // console.log(request.body)
  try{
    const token = await User.matchPasswordAndCreateToken(email,password)
    return response.cookie('token',token).redirect('/')
  }catch(eṛror){
    return response.render('signin',{
      error:"Incorrect Email or Password"
    })
  }
}

function handleSignOut(request,response){
  response.clearCookie('token').redirect('/')
}


module.exports = {createUser,handleSignIn,handleSignOut}
