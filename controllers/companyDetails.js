const db = require("../routes/dbconfig")

const companyDetails = async (req, res) =>{
    if(req.user){
        db.query("SELECT * FROM user_accounts WHERE id = ?", [req.user.id], async (err, data) =>{
            if(err) throw err 
            if(data[0]){
                return res.json({success:"Company", companyDetails:data[0]})
            }
        })

    }else{
        res.json({error:"user Not LoggedIn"})
    }
}


module.exports = companyDetails