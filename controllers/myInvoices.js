const db = require("../routes/dbconfig")

const myInvoices = async (req,res) =>{
    try{
    db.query("SELECT * FROM invoices WHERE owner_id = ? ", [req.user.id], async (err, data) =>{
        if(err){
            throw err
        }
        if(data){
          return  res.json({success:"Invoices", invoices:data})
        }
    })
    }catch(error){
        console.log(error)
       return res.json({error:error.message})
    }
}

module.exports = myInvoices
