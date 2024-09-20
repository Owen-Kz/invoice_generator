const db = require("../routes/dbconfig")

const saveItem = async (req,res) =>{
    try{
if(req.user) {
 

    const {description, rate, amount, discount, Quantity, invoiceNumber} = req.body
    db.query("INSERT INTO invoice_items SET ?", [{invoice_id:invoiceNumber, item_description:description, rate, amount, quantity:Quantity, discount}], async (err,data) =>{
        if(err){
            console.log(err)
           return res.json({error:err})
        }else{
           return res.json({success:"Item Added"})
        }
    })
}else{
   return res.json({error:"Not Logged In"})
}}
catch(error){
    console.log(err)
    res.json({error:error.message})
}
}


module.exports = saveItem