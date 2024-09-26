const db = require("../routes/dbconfig")

const TotalOfInvoice = async (req,res) =>{
    try{
    if(req.params.id){
        const invoiceId = req.params.id 
        let TotalDiscount = ""
        let TotalAmount = ""
        // Find totalDiscont 
        db.query("SELECT * FROM invoice_items WHERE invoice_id =?", [invoiceId], async (err, count) =>{
            if(err){
                return res.json({error:err})
            }else if(count[0]){
            
        
        db.query("SELECT SUM(discount) AS totalDiscount FROM invoice_items WHERE invoice_id = ?", [invoiceId], async (err, discount) =>{
            if(err){
                return res.json({error:err})
            }else{
                TotalDiscount = discount[0].totalDiscount
            }
            db.query("SELECT SUM(amount) AS totalAmount FROM invoice_items WHERE invoice_id =?", [invoiceId], async(err, total) =>{
                if(err){
                    return res.json({error:err})
                }else{
                    TotalAmount = total[0].totalAmount
                }

               return res.json({success:"Totals", discount:TotalDiscount, total:TotalAmount})
            })
        })
    }else{
        return res.json({error:"No Item Found"})
    }
})
    }else{
        return res.json({error:"INvalid Parameters PRovided"})
    }
}catch(error){
    return res.json({error:error.message})
}
}


module.exports = TotalOfInvoice