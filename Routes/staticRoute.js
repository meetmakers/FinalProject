const {Router,response} = require('express')

const router = Router();

router.get('/',(request,response)=>{
  return response.render('home',{
    user:request.user
  })
})




module.exports = router;