// Register validation 

const idButton = document.getElementById("button");
idButton.addEventListener("click", validationRegister);

function validationRegister(){
    var result = document.getElementById("result")
    var username = document.formInput.Username.value.trim();
    var email = document.formInput.Email.value.trim();    
    var password = document.formInput.Password.value.trim();
    var conPass = document.formInput.ConfPass.value.trim();

     if(username === ""){
        result.innerHTML="Enter Username*";
        return false;
    } 
    else if(username.length < 5){
        result.innerHTML= "Username at least five letters*";
        return false;
    }
    else if(email === ""){
        result.innerHTML="Enter your Email Addres*";
        return false; 
    }
    else if(password === ""){
        result.innerHTML="Enter Password*";
        return false;   
    }
    else if(password.length < 6){
        result.innerHTML="Password must be at least 6-digits*";
        return false;        
    }
    else if(conPass === ""){
        result.innerHTML="Enter Confirm Password*";
        return false;   
    }
    else if(password !== conPass){
        result.innerHTML="Password doesn't matched. Try again.*";
        return false;
    }

    // var checkFiledsNotEmpty = username && email && password && conPass;
    
    // var regConfirm = checkFiledsNotEmpty && localStorage.getItem("name");      
    
    // document.getElementById("Greetings").innerHTML = regConfirm ? 
    //   " <b> Registration successful. </b>" :
    //   " <b> Registration is not successful. Try again. </b>"; 

    storeUser();
    return true; 
}
// Register local storage 
// button.addEventListener("click", storeUser);
window.localStorage = storeUser;
function storeUser(/*event*/){
    //  event.preventDefault();

    // DOM elements 
    var userName = document.formInput.Username.value;
    var emailAdr = document.formInput.Email.value;    
    var passWord = document.formInput.Password.value;
    
// to get the stored data form the use data
    // const storedData = localStorage.getItem("name");
// empty array for storring key names
    let users = JSON.parse(localStorage.getItem("users"))|| [];

    const userExist = users.find(user => user.username === userName || user.email === emailAdr);

    if(userExist) {
        alert("Username or email already exist");
        return;
    }
    // array to save the user
    var user = {
        username: userName,
        email: emailAdr,
        password: passWord,
        topScore: ""
    };
// add the storing key names with  saving user 
    users.push(user);

    localStorage.setItem("users", JSON.stringify( users));
    alert("Registration successful");
    
// get the unique ame of the user to an array and save all of the data 
    let keyNames = [];
    if (users.length > 0) {
        
        var usersArray = users.map(user => user.username);

        usersArray.forEach(username => {
            if (!usersArray.indexOf(username) === -1){
            keyNames.push(username);
            }
        });
    } 
 } 

// Login Validation 
function validationLogin(){
    
    var result = document.getElementById("result");
    var username = document.formInput.Username.value;
    var password = document.document.formInput.Password.value;


    if (username.trim() === ""){
        result.innerHTML="Enter Username*";
        return false;
    } else if(username.trim().length < 5){
        result.innerHTML="Username should be least five characters*";
        return false;
    }else if(password.trim() === ""){
        result.innerHTML="Enter Password*";
        return false;
    }
    else if(password.length<6){
        result.innerHTML="Password must be 6-digits*";
        return false;
    }
}

// Login Local Storage 
window.onload = checkLogin;
window.sessionStorage = checkLogin;

function checkLogin(){
    if (sessionStorage.loggedInUsrUsername !== undefined){
        let userObj = JSON.parse(sessionStorage.getItem(sessionStorage.loggedInUsrUsername));

        let loginWrapper = document.getElementById("loginWrapper");     
        
        if(loginWrapper){
            loginWrapper.innerHTML=" Welcome back, " + userObj.username + ".";
        }
    }
}

function login(/*event*/){
    // event.preventDefault();
    let username = document.formInput.Username.value;
    let userObj = JSON.parse(sessionStorage.getItem(username));
   
    if(!userObj){
        document.getElementById("loginFailure").innerHTML = "Username not recognized. Do you have an account?";
        return;
    }

    let password = document.formInput.Password.value;
    
    if(password === userObj.password){ // display this if the login is succesful
        let loginWrapper = document.getElementById("loginWrapper");    
        if(loginWrapper){
            loginWrapper.innerHTML=" Welcome back, " + userObj.username + ".";
        }
        // get rid of error messages
        document.getElementsById("loginFailure").innerHTML = "";
        document.getElementById("result").innerHTML ="";

        sessionStorage.loggedInUsrUsername = userObj.username;
    } else {
        document.getElementById("loginFailure").innerHTML = "Password not correct. Please try again. ";
        }
    }
// Forgotten password validation 
function validationFP(){
    var result = document.getElementById("result")
    if(document.formInput.Email.value==""){
        result.innerHTML="Enter your Email Addres*";
        return false;
    }else if(document.formInput.ConfEmail.value==""){
        result.innerHTML="Enter Confirm Email Addres*";
        return false;
    }else if(document.formInput.Email.value !== document.formInput.ConfEmail.value){
        result.innerHTML="Email doesn't matched. Try again.*";
        return false;
    }
}
