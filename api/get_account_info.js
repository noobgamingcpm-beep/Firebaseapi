async function getAccountInfo(){
    if(!requireLogin()) return;

    try{
        const resp=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${selectedGame.api_key}`,{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken: currentToken
            })
        });

        const data = await resp.json();

        if(data.users && data.users.length > 0){
            const user = data.users[0];

            const info = `
👤 Account Info
📧 Email: ${user.email}
🆔 UID: ${user.localId}
✅ Email Verified: ${user.emailVerified}
🕒 Created: ${new Date(+user.createdAt).toLocaleString()}
🔑 Last Login: ${new Date(+user.lastLoginAt).toLocaleString()}
🔐 Provider: ${user.providerUserInfo?.map(p => p.providerId).join(", ") || "password"}
            `.trim();

            updateStatus("✅ Account info loaded", false, "serviceStatus");
            sendCostMessage(info);

        } else {
            updateStatus("❌ Failed to load account info", true, "serviceStatus");
        }
    } catch(err){
        updateStatus(`❌ Error: ${err.message}`, true, "serviceStatus");
    }
}