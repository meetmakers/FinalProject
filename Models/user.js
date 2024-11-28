const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose')
const {createToken} = require('../Service/Authentication')
const {Schema} = mongoose;

const UserSchema = new Schema({
  name:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  salt:{
    type:String,
    // required:true,
  },
  dob:{
    type:Date,
    required:true,
  },
  profileImg:{
    type:String,
    default:"/images/default.png"
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:['USER','ADMIN'],
    default:"USER"
  }
},{timestamps:true})

UserSchema.pre("save",function(next){
  const user = this;

  if(!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest('hex')

    this.salt = salt;
    this.password = hashPassword;

  next();
})

UserSchema.static('matchPasswordAndCreateToken',async function(email,password){
  const user = await this.findOne({email})

  if(!user)
    throw new Error('User not Found')

  const salt = user.salt;
  const hashedPassword = user.password;


  const userProvidedHash = createHmac('sha256',salt)
    .update(password)
    .digest('hex')

  if(hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password")

  const token = createToken(user);

  return token;
})

const User = mongoose.model('user',UserSchema)

module.exports = User;