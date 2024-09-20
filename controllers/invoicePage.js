const invoicePage = async (req,res) =>{
    if(req.cookies.uid){
        res.render("invoice")
    }else{
        res.render("welcome")
    }
}

module.exports = invoicePage