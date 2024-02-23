import { CAlculateDiscounts, CalculateGrossTotal, CallculateSubtotal } from "./calculateForTotal.js"
import { CurrentDate, DueDate } from "./currentDate.js"
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
    const Rate = SavedItemsArray[i].rate
    const QTY = SavedItemsArray[i].Quantity
    let QTTY
    if(QTY <= 1){
        QTTY = "N/A"
    }else{
        QTTY = QTY
    }
    const Amount = SavedItemsArray[i].amount 
    const Discount = SavedItemsArray[i].discount

    tbody.innerHTML += `              <!-- Table Row Start   -->
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

CurrentDateContainer.innerHTML = CurrentDate 
DueDateCOntainer.innerHTML = DueDate



// TOTAL 
const SubTotal = document.getElementById("subTotal");
SubTotal.innerHTML += CallculateSubtotal(SavedItems)


const DiscountsContainer = document.getElementById("DiscountsContainer")
DiscountsContainer.innerHTML += CAlculateDiscounts(SavedItems)

const GrossTotalContainer = document.getElementById("GrossTotalContainer")
GrossTotalContainer.innerHTML += CalculateGrossTotal(SavedItems)