const db = require("../routes/dbconfig")

const DeleteItem = async (req,res) =>{
    try{
        if(req.user && req.cookies.userRegistered){
            const {itemId} = req.body 
            db.query("SELECT * FROM invoice_items WHERE id = ?", [itemId], async (err, data) =>{
                if(err){
                    res.json({error:err})
                }else if(data[0]){
                    db.query("DELETE FROM invoice_items WHERE id = ?", [itemId], async (err,del) =>{
                        if(err){
                            return res.json({error:err})
                        }else{
                            return res.json({success:"Item Deleted successfully"})
                        }
                    })
                }
            })
        }else{
            return res.json({error:"User not logged in"})
        }

    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = DeleteItem