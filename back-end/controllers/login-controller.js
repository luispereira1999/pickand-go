const database = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/user");


module.exports = {
   login: async (req, res) => {
      const db = database.connect();

      if (errors = checkFields(req))
         return res.status(400).json({ "error": errors.join(" | ") });

      var user = new User(req.body);

      // selecionar utilizador que pretende fazer login
      var sql = "SELECT * FROM Users WHERE username = ?";
      var params = user.username;
      db.get(sql, params, async function (err, row) {
         if (err) {
            return res.status(400).json({ "error": err.message });
         }

         if (row) {
            const checkPassword = await bcrypt.compareSync(user.password, row.password);

            if (checkPassword) {
               // dados ao criar sessão
               const token = jwt.sign({
                  id: row.id,
                  username: row.username,
                  name: row.name,
                  email: row.email,
                  type: row.type,
               }, "hard-secret", { expiresIn: "24h" });

               res.json({
                  "message": "O utilizador: " + row.username + " efetuou login com sucesso!",
                  "session": token
               });
            } else {
               res.json({
                  "message": "Nome de utilizador ou senha inválidos. Tente novamente!"
               });
            }
         }

         db.close();
      });
   }
};


function checkFields(req) {
   var errors = [];

   if (!req.body.username) {
      errors.push("O nome de utilizador não foi preenchido.");
   }
   if (!req.body.password) {
      errors.push("A senha não foi preenchida.");
   }
   if (!req.body.password) {
      errors.push("A senha não foi preenchida.");
   }
   if (errors.length) {
      return errors;
   }
}