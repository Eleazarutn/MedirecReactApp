export const loginUser = (app, db) => {
  app.post("/LoginUser", (req, res) => {
    const { email, password } = req.body;
  
    // Verificar las credenciales del usuario en la base de datos
    const LOGIN_USER_QUERY = `SELECT * FROM usuario WHERE usa_email = ? AND usa_contraseña = ?`;
    db.query(LOGIN_USER_QUERY, [email, password], (err, result) => {
      if (err) {
        console.error("Error al verificar credenciales:", err);
        res.status(500).send("Error al verificar credenciales");
      } else if (result.length === 0) {
        res.status(401).send("Correo electrónico o contraseña incorrectos");
      } else {
        res.status(200).json(result[0]); // Devuelve el primer usuario encontrado (deberías verificar si hay más de uno)
      }
    });
  });
};
