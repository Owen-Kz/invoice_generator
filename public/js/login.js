const loginFormMain = document.getElementById("loginFormMain")



if(loginFormMain){
loginFormMain.addEventListener("submit", function(e) {
    e.preventDefault()
    const newFormData = new FormData(loginFormMain)
    fetch("/login", {
        method:"POST",
        body: newFormData
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
