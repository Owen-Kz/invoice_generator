async function DeleteInvoiceItem(id) {
    fetch(`/deleteItem`, {
        method:"POST",
        body:JSON.stringify({itemId:id}),
        headers:{
            "Content-type":"application/JSON"
        }
    }).then(res=>res.json())
    .then(data =>{
        if(data.success){
            return true
        }else{
            console.log(data.error)
            return false
        }
    })
}

export{
    DeleteInvoiceItem
}