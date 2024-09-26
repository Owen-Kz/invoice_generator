const db = require("../routes/dbconfig")

const InvoiceData = async (req,res)=>{
    try{
      
    if(req.query.x){
        db.query("SELECT * FROM invoices WHERE invoice_id = ?", [req.query.x], async (Err, data) =>{
            if(Err){
                console.log(Err)
                return res.json({error:Err})
            }
            if(data[0]){
                const INVOICEMAINID = data[0].invoice_id
                let InvoiceItems = []
                db.query("SELECT * FROM invoice_items WHERE invoice_id = ?",[INVOICEMAINID], async (err, items) =>{
                    if(err){
                        console.log(err)
                        return res.json({error:err})
                    }else{
                        InvoiceItems = items
                    }
                    return res.json({success:"Invoice", invoiceItems:items, invoiceData:data})
                })
            }
        })
    }else{
        return res.json({error:"invalid Parameters"})
    }
}catch(error){
    console.log(error)
    return res.json({error:error.messsage})
}
}


module.exports = InvoiceData