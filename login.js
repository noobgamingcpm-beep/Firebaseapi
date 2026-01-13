async function login(){
    const email = prompt("Email:");
    const password = prompt("Password:");
    if(!email || !password) return;

    const resp = await fetch("/api/auth-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    const data = await resp.json();

    if(data.idToken){
        currentUser = data.email;
        currentToken = data.idToken;
        updateStatus(`✅ Logged in as ${currentUser}`);
    } else {
        updateStatus(`❌ Login failed: ${data.error?.message}`);
    }
}