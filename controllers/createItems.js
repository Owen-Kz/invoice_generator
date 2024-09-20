function CreateItems(){
    for(let i=0; i>items.length; i++){
        db.query("INSERT INTO invoice_items SET ?", [invoice], async (err,items) =>{
            if(err){
                throw err
                
            }else{
                console.log("New Item added")
            }
        })
    }
}



module.exports = CreateItems