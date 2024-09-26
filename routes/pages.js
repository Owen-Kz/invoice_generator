const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const signup = require("../controllers/signup");
const LoggedIn = require("../controllers/loggedIn");
const invoicePage = require("../controllers/invoicePage");
const login_user = require("../controllers/login");
const companyDetails = require("../controllers/companyDetails");
const saveInvoice = require("../controllers/saveInvoice");
const generateInvoice = require("../controllers/generateInvoice");
const exisitngReceipient = require("../controllers/exisitngReceipient");
const saveItem = require("../controllers/saveItem");
const GetSavedItems = require("../controllers/getSavedItems");
const dashboardPage = require("../controllers/dashboardPage");
const settingsPage = require("../controllers/settingsPage");
const myInvoices = require("../controllers/myInvoices");
const InvoiceData = require("../controllers/invoiceData");
const companyInfo = require("../controllers/companyInto");
const TotalOfInvoice = require("../controllers/totalCost");
const DeleteItem = require("../controllers/deleteItem");


router.use(express.json()) 
router.use(bodyParser.json()) 
 
router.get("/", (req,res) =>{    
    if(req.cookies.userRegistered){
        res.redirect("dashboard")
    }else{
    res.render("start")
    }
}) 
router.get("/invoice", LoggedIn, invoicePage)


router.post("/signup", signup)
router.post("/login", login_user)
router.post("/companyDetails", LoggedIn, companyDetails)
router.post("/saveInvoice", LoggedIn, saveInvoice)
router.post("/generateInvoiceNumber", LoggedIn, generateInvoice)
router.post("/exisitngReceipient", LoggedIn, exisitngReceipient)
router.post("/saveItem", LoggedIn, saveItem)
router.post("/getsavedItems", LoggedIn, GetSavedItems)
router.get("/dashboard", LoggedIn, dashboardPage)
router.get("/settings", LoggedIn, settingsPage)
router.post("/myInvoices", LoggedIn, myInvoices )
router.get("/invoice/view", InvoiceData)
router.get("/company/info/:cid", companyInfo)
router.get("/total/:id", TotalOfInvoice)
router.post("/deleteItem", LoggedIn, DeleteItem)


router.get("/invoice/v1/:id", async (req,res) =>{
    res.render("previewInvoice", {invoiceId:req.params.id})
})

router.get("/pricing", LoggedIn,  async(req,res) =>{
    res.render("pricing", {company_logo:req.user.company_logo, company_name:req.user.company_name,company_email:req.user.company_email})
})

router.get("/logout", async (req,res) =>{
    res.clearCookie("userRegistered")
    res.clearCookie("uid")
    res.redirect('/')
})
  

router.get("*", (req,res) =>{
    res.render("error", {message:"Page Not Found"}) 
})


module.exports = router