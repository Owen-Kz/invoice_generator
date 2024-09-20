const db = require("../routes/dbconfig")

const GetSavedItems = async (req,res) =>{
    if(req.cookies.exit_inv){
        db.query("SELECT * FROM invoice_items WHERE invoice_id = ? ",[req.cookies.exit_inv], async (err,data) =>{

            if(err){
                return res.json({error:err})
            }else if(data[0]){
                return res.json({success:"items", recentItems:JSON.stringify(data)})
            }else{
                return res.json({error:"No Item"})
            }
        })
    }else{
        res.json({error:"No Invoice Data"})
    }
}


module.exports = GetSavedItems