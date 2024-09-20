const formContainer = document.querySelectorAll(".formContainer");

const loginForm = `
    <div class="formHeader">
    <div class="closeModal hidden">x</div>
        <div class="imageContainer formImage">
            <img src="/assets/logo.png" alt="weperch_logo">
        </div>
        <h4 class="headingTextTop">Welcome to Weperch Marketplace. 
        
        </h4>
        <h6 class="headingTextBottom">Go Live. Shop Live. Do More.</h6>
    </div>
    <form action="/login" method="POST" id="loginFormMain">
        <div class="formControlContainer">
            <label for="Fullname">Email / Account Number / Reg. No.</label>
            <input type="text" id="user" name="user" class="formControl" placeholder="Username" required>
        </div>
        <div class="formControlContainer">
            <label for="Fullname">Password</label>
            <input type="password" id="pass" name="pass" class="formControl" placeholder="Password" required>
        </div>
        <div class="formControlContainer buttonsContainer">
            <div class="submitButton">
                <button>Login</button>
            </div>
        </div>
        <div class="formControlContainer">
            <label for="signup">Don't have an account? <span class="signupText">Signup</span></label>
        </div>
    </form>
    <div class="formFooter">
        <a href="#">Create an account for your brand.</a>
    </div>
`;

const signupForm = `
    <div class="formHeader">

        <div class="imageContainer formImage">
            <img src="/assets/logo.png" alt="weperch_logo">
        </div>
        <h4 class="headingTextTop">Welcome, CEO. 
            
        </h4>
        <h6 class="headingTextBottom">Add Your Company details to get started.</h6>
    </div>
    <form id="signupFormMain" enctype="multipart/form-data">
    <h5>Company Details</h5>
        <div class="formControlContainer">
            <label for="Fullname">Company Name</label>
            <input type="text" id="company_name" name="company_name" class="formControl" placeholder="Company Name" required>
        </div>
        <div class="formControlContainer">
            <label for="company_reg_number">Company Reg Number</label>
            <input type="text" name="company_reg_number" class="formControl" placeholder="Company Registration number">
        </div>
        <div class="formControlContainer">
            <label for="company_address">Company Address</label>
            <input type="text" name="company_address" class="formControl" placeholder="Company Address" required>
        </div>
        <div class="formControlContainer">
            <label for="company_email">Company Email</label>
            <input type="email" name="company_email" class="formControl" placeholder="Company Email" required>
        </div>
        <div class="formControlContainer">
            <label for="company_website">Company Website</label>
            <input type="url" name="company_website" class="formControl" placeholder="Company Website">
        </div>
                <div class="formControlContainer">
            <label for="logo">Logo</label>
            <input type="file" name="logo" class="formControl" placeholder="Company Logo" accept=".png, .jpg, .jpeg">
        </div>
        <div class="formControlContainer">
            <label for="phonenumber">Company Phonenumber</label>
            <input type="number" name="phonenumber" class="formControl" placeholder="Phonenumber">
        </div>
        
         <h5>Signatory</h5>
        <div class="formControlContainer">
            <label for="phoenumber">Fullname</label>
            <input type="text" name="fullname" class="formControl" placeholder="Fullname" required>
        </div>

        <div class="formControlContainer">
            <label for="phoenumber">Signature</label>
            <input type="file" name="signature" class="formControl" placeholder="Signature" accept=".png, .jpg, .jpeg">
        </div>

         <h5>Payment Details</h5>

        <div class="formControlContainer">
            <label for="phoenumber">Bank Name</label>
            <input type="text" name="bank_name" class="formControl" placeholder="Bank Name" required>
        </div>

        <div class="formControlContainer">
            <label for="account_number">Account Number</label>
            <input type="number" name="account_number" class="formControl" placeholder="Account Number" required>
        </div>

        <div class="formControlContainer">
            <label for="account_name">Account Name</label>
            <input type="text" name="account_name" class="formControl" placeholder="Account Name" required>
      
            </div>

         <h5>Login Details</h5>
            <div class="formControlContainer">
            <label for="password">Password</label>
            <input type="password" name="password" class="formControl" placeholder="Password" required>
        </div>

        <div class="formControlContainer buttonsContainer">
            <div class="submitButton">
                <button>Signup</button>
            </div>
        </div>
        
        <div class="formControlContainer">
            <label for="login">Already have an account? <span class="loginText">Login</span></label>
        </div>
    </form>
    <div class="formFooter">
        <a href="#">Create an account for your brand.</a>
    </div>
`;

// Function to activate the login form
function ActivateLogin() {
    const loginText = document.querySelectorAll(".loginText");
    
    if (loginText) {
        loginText.forEach(text =>{
        text.addEventListener("click", function() {
           

            formContainer.forEach(container =>{
                container.innerHTML = loginForm;
                ActivateSignup(); // Re-activate signup after the login form is rendered
            })
            
            
        });
    })
    }
}

// Function to activate the signup form
function ActivateSignup() {
    const signupText = document.querySelectorAll(".signupText");
    const closeModal = document.querySelector(".closeModal")
    if (signupText) {
        signupText.forEach(text => {
            text.addEventListener("click", function() {
                formContainer.forEach(container =>{
                    container.innerHTML = signupForm;
                    ActivateLogin();
                })
                // Re-activate login after the signup form is rendered
            });
        });
    }
}

// Use MutationObserver to detect changes in the formContainer and re-activate the event listeners
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        // Re-attach listeners when the content changes
        ActivateLogin();
        ActivateSignup();
    });
});

// Start observing the formContainer for changes
formContainer.forEach(container =>{
    observer.observe(container, { childList: true, subtree: true });
})


// Initialize the default view with the login form and activate listeners
formContainer.forEach(container =>{
    container.innerHTML = signupForm;
})
ActivateLogin();