export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${selectedGame.api_key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: req.body.email,
          password: req.body.password,
          returnSecureToken: true
        })
      }
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}