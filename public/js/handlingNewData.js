import { CAlculateDiscounts, CalculateGrossTotal, CallculateSubtotal } from "./calculateForTotal.js"
import { CurrentDate, DueDate, InvoiceNumber } from "./currentDate.js"
import { GetCompanyDetails } from "./getCompanyDetails.js"
import { numberToWords } from "./numberToWords.js"
import { DeleteCookie, GetCookie, SetCookies, daysToKeep } from "./setCookie.js"


let Data


const SavedItems = GetCookie("itemsList")

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
    console.log(SavedItemsArrayNew)
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
        description: Description.value,
        rate: Rate.value,
        amount: Amount.value,
        discount: DISC,
        Quantity: Quantity.value
    })    

    SetCookies("itemsList", JSON.stringify(Data), daysToKeep)
    window.location.reload()

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


function NewDiscount(){
    console.log('Discount')
}


const tbody = document.querySelector(".tbody")


if(SavedItems){
for(let i=0; i<SavedItemsArray.length; i++){
    const index = SavedItemsArray[i]
    const Description = SavedItemsArray[i].description
    const Rate = new Number(SavedItemsArray[i].rate).toLocaleString()
    const QTY = SavedItemsArray[i].Quantity
    let QTTY
    if(QTY <= 1){
        QTTY = "N/A"
    }else{
        QTTY = QTY
    }
    const Amount = new Number(SavedItemsArray[i].amount).toLocaleString();
    const Discount = new Number(SavedItemsArray[i].discount).toLocaleString();

    tbody.innerHTML += `  <!-- Table Row Start   -->
    <div class="tRow">
     <div class="td first_column">${Description}</div>
     <div class="td second_column">${QTTY}</div>
     <div class="td third_column">N ${Rate}</div>
     <div class="td fourth_column">N ${Amount}</div>
     <div class="td fifth_column closeItem" id="${i}">x</div>
 </div>
 <!-- End Table Row  -->`

}

const closeItem = document.querySelectorAll(".closeItem")

if(closeItem.length >0){
// console.log(closeItem[])

    closeItem.forEach(element => {
        const ID = element.id
      element.addEventListener("click", function(){
        PopFromArray(SavedItemsArray[ID].description)
        console.log(SavedItemsArray[ID].description)
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
const CompanyDetails = JSON.parse(GetCompanyDetails())

if(CompanyDetails.length > 0){
const CompanyNameContainer = document.getElementById("company_name_container")
const CompanyNameContainerSign = document.getElementById("company_name_container_sign")
const CompanyName = CompanyDetails[0].CompanyName
CompanyNameContainer.innerHTML = CompanyName
CompanyNameContainerSign.innerHTML = CompanyName

const CompanyLogoContainer = document.getElementById("company_logo_container")
const CompanyLogo = CompanyDetails[0].CompanyLogo
CompanyLogoContainer.setAttribute("src", CompanyLogo)

const CompanyRegContainer = document.getElementById("reg_number")
const CompanyReg = CompanyDetails[0].CompanyRegNumber
CompanyRegContainer.innerHTML = CompanyReg

const CompanyAddressContainer = document.getElementById("address")
const CompanyAddress = CompanyDetails[0].CompanyAddress
CompanyAddressContainer.innerHTML = CompanyAddress

const CompanyPhonenumberContainer = document.getElementById("phonenumber")
const CompanyPhonenumber = CompanyDetails[0].CompanyPhonenumber
CompanyPhonenumberContainer.innerHTML = CompanyPhonenumber

const CompanyEmailContainer = document.getElementById("email")
const CompanyEmail = CompanyDetails[0].CompanyEmail
CompanyEmailContainer.innerHTML = CompanyEmail

const CompanyWebsiteContainer = document.getElementById("website")
const CompanyWebsite = CompanyDetails[0].CompanyWesite
CompanyWebsiteContainer.innerHTML = CompanyWebsite


const BankAccountContainer = document.getElementById("bank_account_container")
const BankAccount = CompanyDetails[0].BankAccountNumber
BankAccountContainer.innerHTML = BankAccount

const BankNameContainer = document.getElementById("bank_name_container")
const BankName = CompanyDetails[0].BankName
BankNameContainer.innerHTML = BankName

const BankACcountNameContainer = document.getElementById("bank_account_name_container")
const BankAccountName = CompanyDetails[0].AccountName
BankACcountNameContainer.innerHTML = BankAccountName

const SigneeNameContainer = document.getElementById("signee_name_container")
const SigneeName = CompanyDetails[0].AccountSigneeFullname
SigneeNameContainer.innerHTML = SigneeName

const SigneeSignattureContainer = document.getElementById("signee_signature_container")
const signature = CompanyDetails[0].SigneeSignature
SigneeSignattureContainer.setAttribute("src", signature)


}else{
    window.location.href = "../start/";
}

// AddREcipient 
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
const RecipientName = RecipientData[0].Name
const RecipientEmail = RecipientData[0].Email
const RecipientCompany = RecipientData[0].CompanyName
const BillToContainer = document.getElementById("bill_to_container")

BillToContainer.innerHTML =`
        <li>${RecipientName}</li>
        <li>${RecipientCompany}</li>
        <li>${RecipientEmail}</li>`