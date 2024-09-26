const loginFormMain = document.getElementById("loginFormMain")



if(loginFormMain){
loginFormMain.addEventListener("submit", function(e) {
    e.preventDefault()
    const newFormData = new FormData(loginFormMain)
    console.log(newFormData)
    fetch("/login", {
        method:"POST",
        body: JSON.stringify(newFormData),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.success){

































































            
            window.location.href = "/invoice"
        }else{
            alert(data.error)
        }
    })
})
}
