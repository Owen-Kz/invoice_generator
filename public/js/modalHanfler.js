const DiscountYes = document.getElementById("discountYes")
const DiscountNo = document.getElementById("discountNo")
const DiscountContainerBody = document.getElementById("DiscountContainerBody")
const CloseButton = document.querySelector(".close-button")
const body = document.querySelector("body")
const Modal = document.querySelector(".modal-body")
const ModalContainer = document.querySelector(".modal")
const AddNewItemButton  = document.querySelector("#addNewItem")

DiscountYes.addEventListener("change", function () {

DiscountContainerBody.innerHTML = ` <div class="formControlContainer">
<label for="discount">Enter Amount</label>
<input type="number" class="formControl" id="discount">
</div>`

})

DiscountNo.addEventListener("change", function(){
    DiscountContainerBody.innerHTML = ""
})

CloseButton.addEventListener("click", function(){
    
    if(body.hasChildNodes(Modal)){
    ModalContainer.setAttribute("style", "display:none")
    Modal.style.scale = 0;

    }
})

AddNewItemButton.addEventListener("click", function(){
    Modal.style.scale = 1;
    ModalContainer.setAttribute("style", "display:flex;")

})


