
async function GetCompanyDetails(){

    return fetch("/companyDetails", {
        method:"POST"
    }).then(res =>res.json())
    .then(data=>{
        console.log(data)
        if(data){
            
            if(data.success){
                const CompanyDetails = data.companyDetails
                return CompanyDetails
            }else{
                return []
            }
        }else{
            return []
        }
    })
    
    // const getCompaneDetails = GetCookie("companyDetails")
  
    // if(getCompaneDetails ){
    //     CompanyDetails = getCompaneDetails
    // }else{
    //     CompanyDetails = "[]"
    // }
    // return CompanyDetails
}

export {
    GetCompanyDetails
}