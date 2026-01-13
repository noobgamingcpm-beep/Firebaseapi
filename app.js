let currentUser = null;
let currentToken = null;

function requireLogin(){
    if(!currentToken){
        alert("Login required");
        return false;
    }
    return true;
}

function updateStatus(msg){
    document.getElementById("serviceStatus").textContent = msg;
}