const db = require("../routes/dbconfig")

const exisitngReceipient = async (req,res) =>{
    try{
    if(req.cookies.exit_inv){
        db.query("SELECT * FROM invoices WHERE invoice_id = ?", [req.cookies.exit_inv], async (err,  invoice) =>{{
            if(err){
                console.log(err)
                throw err

            }else if(invoice[0]){
                const data = {
                    Name: invoice[0].recipient_name,
                    Email:invoice[0].reciepient_email,
                    CompanyName:invoice[0].company_name,
                }
        return res.json({error:"Nothing", reciepient:data})
                
            }else{
        res.json({error:"Nothing", reciepient:[]})

            }
        }})
    }else{
        res.json({error:"Nothing", reciepient:[]})
    }
}catch(error){
    console.log(error)
    res.json({error:error, receipient:[]})

}
}


module.exports = exisitngReceipient