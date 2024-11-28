// const cokkieParse = require('cookie-parser');
const { validateToken } = require('../Service/Authentication');


function checkCookie(cookieName){
  return(request,response,next)=>{
    const tookenCookieValue = request.cookies[cookieName]
    if(!tookenCookieValue){
      return next();
    }
    try{
      const userPayload = validateToken(tookenCookieValue);
      request.user = userPayload;
    }catch(e){
      console.log(e);
    }
    return next();
  }
}

module.exports = {checkCookie}
