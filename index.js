const express = require("express");
const { appInstanceRouter } = require("./services/app_instance/app_instance.route");
const app = express()
const router = express.Router();


app.use(express())

app.use(express.json());
app.use("/api", appInstanceRouter)


app.listen(8080, () => {
    console.log("server is running on port number 8080");
})