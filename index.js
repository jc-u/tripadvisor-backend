require("dotenv").config();
const express = require("express");
const formRoutes = require("./routes/form");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express());
app.use(formRoutes);

app.all("*", function (req, res) {
	res.status(400).json("this route does not exist");
});

app.listen(process.env.PORT, () => {
	console.log("Server has server🤓");
});
