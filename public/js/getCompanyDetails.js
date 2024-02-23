import { GetCookie } from "./setCookie.js"

function GetCompanyDetails(){
    let CompanyDetails

    
    const getCompaneDetails = GetCookie("companyDetails")
  
    if(getCompaneDetails ){
        CompanyDetails = getCompaneDetails
    }else{
        CompanyDetails = "[]"
    }
    return CompanyDetails
}

export {
    GetCompanyDetails
}