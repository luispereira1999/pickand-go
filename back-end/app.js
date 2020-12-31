const express = require("express");
const bodyParser = require("body-parser");

// iniciar servidor
const app = express();
const port = 4000;
app.listen(port, () => {
   console.log("Servidor aberto na porta", port);
});

// necessário para pré-processar o corpo das solicitações POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas
const defaultRoute = require("./routes/default-route");
const registerRoute = require("./routes/register-route");
const loginRoute = require("./routes/login-route");
const usersRoute = require("./routes/users-route");
const productsRoute = require("./routes/products-route");
const ordersRoute = require("./routes/orders-route");
const deliveriesRoute = require("./routes/deliveries-route");

app.use("/api", defaultRoute);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/deliveries", deliveriesRoute);

// rota quando uma rota não existe
app.use(function (req, res, next) {
   res.status(404).json({ "error": "Ah não! A página não foi encontrada!" });
});