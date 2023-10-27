require("dotenv").config();
const express = require("express");
const formRoutes = require("./routes/form");
const cors = require("cors");
const app = express();

app.use(express());
app.use(express.json());
app.use(formRoutes);
app.use(cors());

app.all("*", function (req, res) {
	res.status(400).json("this route does not exist");
});

app.listen(3000, () => {
	console.log("Server has server🤓");
});
