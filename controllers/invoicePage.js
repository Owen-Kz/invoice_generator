const invoicePage = async (req,res) =>{
    if(req.cookies.uid){
        res.render("invoice", {company_logo:req.user.company_logo, company_name:req.user.company_name,company_email:req.user.company_email})
    }else{
        res.render("welcome")
    }
}

module.exports = invoicePage