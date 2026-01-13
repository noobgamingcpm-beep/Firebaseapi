async function deleteAccount(){
    if(!requireLogin()) return;

    const confirmDelete = confirm(
        "⚠️ This will permanently delete your account.\n\nThis action CANNOT be undone.\n\nDo you want to continue?"
    );
    if(!confirmDelete) return;

    try{
        const resp=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${selectedGame.api_key}`,{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken: currentToken
            })
        });

        const data = await resp.json();

        if(!data.error){
            const deletedEmail = currentUser;

            // Clear local state
            currentUser = null;
            currentToken = null;
            currentPassword = null;

            updateStatus("✅ Account deleted successfully.", false, "serviceStatus");

            sendCostMessage(
                `🗑️ Delete Account\n📧 Email: ${deletedEmail}\n⚠️ Account permanently removed`
            );

            // Optional: redirect or reload
            // location.reload();
        } else {
            updateStatus(
                `❌ Failed: ${data.error?.message || "Unknown"}`,
                true,
                "serviceStatus"
            );
        }
    } catch(err){
        updateStatus(`❌ Error: ${err.message}`, true, "serviceStatus");
    }
}