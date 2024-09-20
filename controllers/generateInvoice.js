const generateInvoice = async (req,res) =>{
    if(req.user){
            // Get the current date
    var currentDate = new Date();

    // Get the day, month, and year components
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    var year = currentDate.getFullYear();
    var In = currentDate.getFullYear().toString()
    var NewTimeStamp = new Date().toLocaleTimeString()
    var ConTime = NewTimeStamp[0] + NewTimeStamp[2] + NewTimeStamp[3] + NewTimeStamp[5] + NewTimeStamp[6]
    var ConYear = In[2]+In[3]
    var InvoiceNumberPrefix = Math.floor(100000 + Math.random() * 900000);


    // Format the date as DD-MM-YYYY
    let InvoiceNumberGen
    const invoiceCookies = req.cookies.exit_inv
    if(invoiceCookies){
        InvoiceNumberGen = invoiceCookies

    
    }else{
        InvoiceNumberGen = `00${InvoiceNumberPrefix.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${In[2]}${In[3]}`;
    }

   return res.json({error:"notLoggedin", invoiceNumber:InvoiceNumberGen})
    }else{
       return  res.json({error:"notLoggedin", invoiceNumber:"none"})
    }
}

module.exports = generateInvoice