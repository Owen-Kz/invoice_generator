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
 

router.use(express.json())
router.use(bodyParser.json()) 
 
router.get("/", (req,res) =>{    
    res.render("start")
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


router.get("*", (req,res) =>{
    res.json({status:404, message:"Page Not Found"})
})


module.exports = router