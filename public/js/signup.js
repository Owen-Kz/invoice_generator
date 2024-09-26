const signupFormMain = document.getElementById("signupFormMain")

if(signupFormMain){
signupFormMain.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(signupFormMain)

    fetch("/signup", {
        method:"POST",
        body:formData
    }).then(res=>res.json())
    .then(data =>{
        if(data.error){
            alert(data.error)
        }else{
            alert(data.success)
            window.location.href = "/invoice"

        }
    })
})
}