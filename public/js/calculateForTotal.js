function CallculateSubtotal(Items){
    let Total = 0

    if(Items){
        const ItemsArray = JSON.parse(Items)

        ItemsArray.forEach(element => {
            Total = new Number(Total) + new Number(element.amount)
        });
    }

    return Total
}


function CAlculateDiscounts(Items){
    let Discount = 0

    if(Items){
        const ItemsArray = JSON.parse(Items)

        ItemsArray.forEach(element => {
            Discount = new Number(Discount) + new Number(element.discount)
        });
    }
    return Discount
}


function CalculateGrossTotal(Items){
    let GrossTotal = 0

    if(Items){
        const ItemsArray = JSON.parse(Items)
        let Total = 0
        let Discount = 0
        ItemsArray.forEach(element => {
            Total = new Number(Total) + new Number(element.amount)
            Discount = new Number(Discount) + new Number(element.discount)

            GrossTotal = new Number(Total) - new Number(Discount)

        });
    }

    

    return GrossTotal
}
export {
    CallculateSubtotal,
    CAlculateDiscounts,
    CalculateGrossTotal
}