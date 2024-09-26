import { CAlculateDiscounts, CalculateGrossTotal, CallculateSubtotal } from "./calculateForTotal.js"
import { CurrentDate, DueDate, InvoiceNumber } from "./currentDate.js"
import { DeleteInvoiceItem } from "./DeleteItemFromInvoice.js"
import { GetCompanyDetails } from "./getCompanyDetails.js"
import { numberToWords } from "./numberToWords.js"
import { DeleteCookie, GetCookie, SetCookies, daysToKeep } from "./setCookie.js"


let Data
DeleteCookie("itemsList")
// DeleteCookie("recipient")
async function fetchItems(){
    return fetch("/getsavedItems", {
        method:"POST"
    }).then(res =>res.json())
    .then(data=>{
    if(data.success){
       return  data.recentItems
    }else{
    return GetCookie("itemsList")
    }
    })
}
const SavedItems = await fetchItems()


const SavedItemsArray = JSON.parse(SavedItems)

if(SavedItems){
    Data = SavedItemsArray
}else{
    Data = []
}

const NewDataForm = document.getElementById("newDataForm")

const Description =document.getElementById("description")
const Rate = document.getElementById("rate")
const Amount = document.getElementById("amount")
const Quantity = document.getElementById("quantity")

function PopFromArray(description) {
    // Filter out the item with the specified description
    const SavedItemsArrayNew = SavedItemsArray.filter(function(item) {
        return item.description !== description;
    });
    // Save the updated array to cookies
    SetCookies("itemsList", JSON.stringify(SavedItemsArrayNew), daysToKeep);

    // Reload the page
    // window.location.reload();
}



NewDataForm.addEventListener("submit", function(){
const Discount = document.getElementById("discount")
let DISC
    if(Discount){
        DISC = Discount.value
    }else{
       DISC = 0
    }
    Data.push({
        item_description: Description.value,
        rate: Rate.value,
        amount: Amount.value,
        discount: DISC,
        quantity: Quantity.value,
        invoiceNumber:InvoiceNumberContainer.innerHTML,
    })    
    const newItemData = {
        description: Description.value,
        rate: Rate.value,
        amount: Amount.value,
        discount: DISC,
        Quantity: Quantity.value,
        invoiceNumber:InvoiceNumberContainer.innerHTML,
    }
    fetch("/saveItem", {
        method:"POST",
        body:JSON.stringify(newItemData),
        headers:{
            "Content-type":"application/JSON"
        }
    }).then(res =>res.json())
    .then(data =>{
        
        if(data.success){
            
    // SetCookies("itemsList", JSON.stringify(Data), daysToKeep)
    // window.location.reload()
    Saveinvoice()

        }else{
            alert(data.error)
        }
    })


})

Rate.addEventListener("keyup", function(){
    if(Quantity.value !== "" && Quantity.value !== 0 ){
        Amount.value = (new Number(Rate.value) * new Number(Quantity.value))
    }else{
    Amount.value = Rate.value * 1
    }
})

Quantity.addEventListener("keyup", function(){
    if(Quantity.value !== "" && Quantity.value !== 0 ){
        Amount.value = new Number(Rate.value) * new Number(Quantity.value)
    }else{
    Amount.value = Rate.value * 1
    }
})




const tbody = document.querySelector(".tbody")


if(SavedItems){
for(let i=0; i<SavedItemsArray.length; i++){
    const index = SavedItemsArray[i]
    const Description = SavedItemsArray[i].item_description
    const Rate = new Number(SavedItemsArray[i].rate).toLocaleString()
    const QTY = SavedItemsArray[i].quantity
    let QTTY
    if(QTY <= 1){
        QTTY = "N/A"
    }else{
        QTTY = QTY
    }
    const Amount = new Number(SavedItemsArray[i].amount).toLocaleString();
    const Discount = new Number(SavedItemsArray[i].discount).toLocaleString();
    const ItemId = SavedItemsArray[i].id ? SavedItemsArray[i].id : null
    tbody.innerHTML += `  <!-- Table Row Start   -->
    <div class="tRow">
     <div class="td first_column">${Description}</div>
     <div class="td second_column">${QTTY}</div>
     <div class="td third_column">&#8358; ${Rate}</div>
     <div class="td fourth_column">&#8358; ${Amount}</div>
     <div class="td fifth_column closeItem" id="${i}" dataId=${ItemId}>x</div>
 </div>
 <!-- End Table Row  -->`

}

const closeItem = document.querySelectorAll(".closeItem")

if(closeItem.length >0){

    closeItem.forEach(element => {
        const ID = element.id
        const dataId = element.getAttribute("dataId")
      element.addEventListener("click", async function(){
        PopFromArray(SavedItemsArray[ID].item_description)
        
        if(dataId !== null){
          await  DeleteInvoiceItem(dataId)
          console.log("Deleted from database")
          window.location.reload()

        }
        // Saveinvoice()
      })
    });

}


const ClearAllItemsButton = document.getElementById("ClearAllItemsButton")

ClearAllItemsButton.addEventListener("click", function(){
    ClearAllItems()
})

function ClearAllItems(){
    DeleteCookie("itemsList")
    window.location.reload()
}
}



// DAte 
const CurrentDateContainer = document.getElementById("CurrentDateContainer")
const DueDateCOntainer = document.getElementById("DueDateContainer")
const InvoiceNumberContainer = document.getElementById("InvoiceNumberContainer")

CurrentDateContainer.innerHTML = CurrentDate 
DueDateCOntainer.innerHTML = DueDate
InvoiceNumberContainer.innerHTML = InvoiceNumber



// TOTAL 
const SubTotal = document.getElementById("subTotal");
SubTotal.innerHTML += `${CallculateSubtotal(SavedItems).toLocaleString()}.00`


const DiscountsContainer = document.getElementById("DiscountsContainer")
DiscountsContainer.innerHTML += `${CAlculateDiscounts(SavedItems).toLocaleString()}.00`

const GrossTotalContainer = document.getElementById("GrossTotalContainer")
GrossTotalContainer.innerHTML += `${CalculateGrossTotal(SavedItems).toLocaleString()}.00`

const AmmountInWordsContainer = document.getElementById("amount_in_words_container")
const AmountInWords = numberToWords(CalculateGrossTotal(SavedItems))
AmmountInWordsContainer.innerHTML = `${AmountInWords.toLocaleString()} Naira Only`

// Get Company Details 
const CompanyDetails = await GetCompanyDetails()

if(CompanyDetails){
const CompanyNameContainer = document.getElementById("company_name_container")
const CompanyNameContainerSign = document.getElementById("company_name_container_sign")
const CompanyName = CompanyDetails.company_name
CompanyNameContainer.innerHTML = CompanyName
CompanyNameContainerSign.innerHTML = CompanyName

const CompanyLogoContainer = document.getElementById("company_logo_container")
const CompanyLogo = CompanyDetails.company_logo
CompanyLogoContainer.setAttribute("src", CompanyLogo)

const CompanyRegContainer = document.getElementById("reg_number")
const CompanyReg = CompanyDetails.reg_number
CompanyRegContainer.innerHTML = CompanyReg

const CompanyAddressContainer = document.getElementById("address")
const CompanyAddress = CompanyDetails.company_address
CompanyAddressContainer.innerHTML = CompanyAddress

const CompanyPhonenumberContainer = document.getElementById("phonenumber")
const CompanyPhonenumber = CompanyDetails.company_phone
CompanyPhonenumberContainer.innerHTML = CompanyPhonenumber

const CompanyEmailContainer = document.getElementById("email")
const CompanyEmail = CompanyDetails.company_email
CompanyEmailContainer.innerHTML = CompanyEmail

const CompanyWebsiteContainer = document.getElementById("website")
const CompanyWebsite = CompanyDetails.company_website
CompanyWebsiteContainer.innerHTML = CompanyWebsite


const BankAccountContainer = document.getElementById("bank_account_container")
const BankAccount = CompanyDetails.account_number
BankAccountContainer.innerHTML = BankAccount

const BankNameContainer = document.getElementById("bank_name_container")
const BankName = CompanyDetails.bank_name
BankNameContainer.innerHTML = BankName

const BankACcountNameContainer = document.getElementById("bank_account_name_container")
const BankAccountName = CompanyDetails.account_name
BankACcountNameContainer.innerHTML = BankAccountName

const SigneeNameContainer = document.getElementById("signee_name_container")
const SigneeName = CompanyDetails.fullname
SigneeNameContainer.innerHTML = SigneeName

const SigneeSignattureContainer = document.getElementById("signee_signature_container")
const signature = CompanyDetails.signature
SigneeSignattureContainer.setAttribute("src", signature)


}else{
    window.location.href = "/";
}

// AddREcipient 
// get exitsting REcipient 
fetch("/exisitngReceipient", {
    method:"POST",
}).then(res=>res.json())
.then(data=>{
    if(data){
       
        const Recipient = data.reciepient
      
        const REcipientCokie = GetCookie("recipient")
        if(Recipient.length > 0){
            SetCookies("recipient", JSON.stringify(Recipient), daysToKeep)
        }
    }
})
const AddRecipientButton = document.getElementById('addRecipient') 
AddRecipientButton.addEventListener("click", function(){
    const RecipientName = prompt("Enter Recipient Name")
    const RecipientEmail = prompt('Enter Recipient Email')
    const RecipientCompanyName  = prompt('Enter Recipient Company Name')

    const Recipient = []

    Recipient.push({
        Name: RecipientName,
        Email:RecipientEmail,
        CompanyName: RecipientCompanyName
    });

    const REcipientCokie = GetCookie("recipient")
    if(REcipientCokie){
        DeleteCookie("recipient")
        SetCookies("recipient", JSON.stringify(Recipient), daysToKeep)

    }else{
        SetCookies("recipient", JSON.stringify(Recipient), daysToKeep)
    }
    // window.location.reload()
    Saveinvoice()
})



// REtriev REcipient Info 
function RecipientInfo(){
    let BillTo
    const RecipientCookie = GetCookie("recipient")
    if(RecipientCookie){
        BillTo = RecipientCookie
    }else{
        BillTo = "[]"
    }
    return BillTo
}


const RecipientData = JSON.parse(RecipientInfo())

if(RecipientData.length > 0){
const RecipientName = RecipientData[0].Name
const RecipientEmail = RecipientData[0].Email
const RecipientCompany = RecipientData[0].CompanyName
const BillToContainer = document.getElementById("bill_to_container")

BillToContainer.innerHTML =`
        <li>${RecipientName}</li>
        <li>${RecipientCompany}</li>
        <li>${RecipientEmail}</li>`
}


const saveItemButton = document.getElementById("saveItemButton")

saveItemButton.addEventListener("click", function(){
    Saveinvoice()
})
function Saveinvoice(){
    const invoiceData = {
        receipientData: RecipientInfo() ? RecipientInfo() : [], 
        itemsList: SavedItems ? SavedItems : "[]",
        InvoiceNumber: InvoiceNumberContainer.innerHTML,
        expiry_date: DueDate,
    }
    fetch("/saveInvoice", {
        method:"POST",
        body:JSON.stringify(invoiceData),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res =>res.json())
    .then(data=>{
        if(data.success){
            alert(data.success)
            window.location.reload()
        }else{
            alert(data.error)
        }
    })
    
}


function SendInvoice(){

}