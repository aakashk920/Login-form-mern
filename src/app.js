const express = require('express');
require("../src/db/conn");
const path = require("path")
const app = express();
const hbs = require("hbs")
const Register = require("../src/models/register");
//const static_path = path.join(__dirname, "../public")
const templates_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

//app.use(express.static(static_path))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

//create a new user in the databased
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {

            const registerEmployee = new Register({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                password:password,
                confirmpassword: cpassword,
                gender: req.body.gender,
            })
            const registered=await registerEmployee.save();
            res.status(201).render("index");

        } else {
            res.send("Password are not matching, Try again for password");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register", (req, res) => {
    res.render("register");
})
app.listen(8000, () => {
    console.log("......Connection done succesfully at app.js.....");
})