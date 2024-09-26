let total = 0
let discount = 0
let subTotal = 0
async function TotalDiscount(invoiceId){
 return fetch(`/total/${encodeURIComponent(invoiceId)}`, {
    method:"GET"
    }).then(res=>res.json())
    .then(data =>{
        if(data.success){
      
         total = data.total 
        discount = data.discount 
        }

    })
}

async function MainTotalDiscount(invoiceId){
    await TotalDiscount(invoiceId)
    return discount.toLocaleString()
}

async function TotalCost(invoiceId){
    await TotalDiscount(invoiceId)
    return total.toLocaleString()
}


async function SubTotal(invoiceId){
    await TotalDiscount(invoiceId)
    return (total - discount).toLocaleString()
}

async function SubTotalForWords(invoiceId){
    await TotalDiscount(invoiceId)
    return (total - discount)
}


export{
    TotalDiscount, 
    TotalCost,
    SubTotal,
    MainTotalDiscount,
    SubTotalForWords
}