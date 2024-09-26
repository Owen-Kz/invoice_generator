const dashboardPage = async (req,res) =>{
    try{
        if(req.cookies.userRegistered){
        res.render("dashboard", {company_logo:req.user.company_logo, company_name:req.user.company_name,company_email:req.user.company_email})
        }
        else{
            res.render("start")
        }
    }catch(error){
        res.render("error", {message:error.message})
        // res.json({error:error.message})
    }
}


module.exports = dashboardPage