export default async function handler(req, res){
    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${selectedGame.api_key}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        }
    );

    const data = await response.json();
    res.status(200).json(data);
}