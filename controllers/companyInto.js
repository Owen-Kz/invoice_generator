const db = require("../routes/dbconfig")

const companyInfo = async (req,res) =>{
    // companyInfo
    try{
        
        if(req.params.cid){
            db.query("SELECT * FROM user_accounts WHERE id = ?", [req.params.cid], async (err, data) =>{
                if(err) throw err 
                if(data[0]){
                    return res.json({success:"Company", companyInfo:data[0]})
                }
            })
    
        }else{
            res.json({error:"Invalid Parameters provided"})
        }
    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = companyInfo