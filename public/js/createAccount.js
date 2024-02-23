const AccountForm = document.getElementById("AccountForm")
import { DeleteCookie, GetCookie, SetCookies, daysToKeep } from "../setCookie.js"

let CompanyDetails 

const NewCompanyData = []

const getCompaneDetails = GetCookie("companyDetails")

if(getCompaneDetails){
    CompanyDetails = JSON.parse(getCompaneDetails)
}else{
    CompanyDetails = []
}


// CreateDetails On form submission 
function CreateDetails(){
    AccountForm.addEventListener("submit", function(e){
        e.preventDefault()

        NewCompanyData.push({
            CompanyName : company_name.value,
            CompanyRegNumber: company_reg_number.value,
            CompanyAddress :company_address.value,
            CompanyEmail: company_email.value,
            CompanyWesite: company_website.value,
            CompanyLogo: company_logo.value,
            CompanyPhonenumber: company_phonenumber.value,
            AccountSigneeFullname: account_signee.value,
            SigneeSignature: signee_signature.value,
            BankAccountNumber: account_number.value,
            BankName: bank_name.value,
            AccountName: account_name.value
        })
        console.log(NewCompanyData)

        if(getCompaneDetails){
            DeleteCookie("companyDetails")
        SetCookies("companyDetails", JSON.stringify(NewCompanyData), daysToKeep)
        window.location.href = "../invoice/"
        }else{
            SetCookies("companyDetails", JSON.stringify(NewCompanyData), daysToKeep)
            window.location.href = "../invoice/"
        }
      
    })
}

if(CompanyDetails.length > 0){
    window.location.href = "../invoice/"
}else{
    CreateDetails()
}
