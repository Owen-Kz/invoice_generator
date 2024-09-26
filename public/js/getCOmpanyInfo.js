async function GetCompanyDetails(companyId){
    return fetch(`/company/info/${companyId}`, {
        method:"GET"
    }).then(res =>res.json())
    .then(data =>{
        if(data.success){
            return data.companyInfo
        }else{
            console.log(data.error)
            return []
        }
    })
}


export {
    GetCompanyDetails
}