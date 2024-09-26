const settingsPage  = async (req,res) =>{
    if(req.user){
    res.render("settings", {company_logo:req.user.company_logo, company_name:req.user.company_name,company_email:req.user.company_email})
    }else{
        res.render("welcome")
    }
}

module.exports = settingsPage