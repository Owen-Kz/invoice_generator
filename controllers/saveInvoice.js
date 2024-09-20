const db = require("../routes/dbconfig")

const saveInvoice = async (req,res) =>{
    try{
        
    if(req.user){
        const {receipientData, itemsList, InvoiceNumber, expiry_date} = req.body


        if(receipientData && receipientData.length && receipientData.length > 0){
            const cookieOptions = {
                expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("exit_inv", InvoiceNumber, cookieOptions)
      const recipient = JSON.parse(receipientData)
 
        
        // const items = JSON.parse(itemsList)


 
        db.query("SELECT * FROM invoices WHERE invoice_id = ?", [InvoiceNumber], async(err, data) =>{
            if(err){
                console.log(err)
                return res.json({error:err})
            }
            if(data[0]){
                 db.query("UPDATE invoices SET ? WHERE invoice_id = ?", [{invoice_id:InvoiceNumber, owner_id:req.user.id, reciepient_email:recipient[0].Email, recipient_name:recipient[0].Name, company_name:recipient[0].CompanyName, expiry_date:expiry_date}, InvoiceNumber], async (err, result) =>{
                    if(err){ 
                        console.log(err)
                        return res.json({error:err})
                    }else{
                       return res.json({success:"Invoice Saved"})
                    }
                })
            }else{
                db.query("INSERT INTO invoices SET ?", [{invoice_id:InvoiceNumber, owner_id:req.user.id, reciepient_email:recipient[0].Email, recipient_name:recipient[0].Name, company_name:recipient[0].CompanyName, expiry_date:expiry_date}], async (err, result) =>{
                    if(err){
                        console.log(err)
                        return res.json({error:err})
                    }else{
                        return res.json({success:"Invoice Saved"})
                    }
                })
            }
        })
    }else{
        return res.json({error:"Invalid Recipient Info"})
    }
    
    }else{
        return res.json({error:"not loggedin"})
    }
}catch(error){
    console.log(error)
    return res.json({error:error.message})
}
}


module.exports = saveInvoice