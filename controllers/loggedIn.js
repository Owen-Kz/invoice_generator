
const jwt = require("jsonwebtoken");
const db = require("../routes/dbconfig");

const LoggedIn = (req, res, next) => {
    const token = req.cookies.userRegistered


  if (!token) {
    // Redirect to home if user is not logged in
  return res.render("start")
    // return res.json({error:"UserNotLoggedIn"})
  }

  try {
    // Decrypt the cookie and retrieve user data with the id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    db.query("SELECT * FROM user_accounts WHERE id = ? ", [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render("error", {message:"Could Not Get Data"})
        // return res.json({error:"Could Not Get data"}) // Redirect to home on error
      }
      req.user = result[0] 

    //   return res.json({success:"IsLoggedIn", user:result[0]});
      next();
    });
  } catch (error) {
    console.log(error);
    return res.json({error:"Internal Server Error"})
  }
};

module.exports = LoggedIn;
