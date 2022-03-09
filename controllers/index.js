const pool = require('../db');
const hasErrors = (errors) => {
    for (const [key, value] of Object.entries(errors)) {
        if(value) return true;
    }

    return false;
}

module.exports = {
    get: {
        home: (req, res) => {
            res.render("home");
        }, 
        dashboard: async (req, res) => {
            const plans = (await pool.query("SELECT * FROM plans")).rows;
            
            for(let i=0;i<plans.length;i++) {
                let features = (await pool.query(`SELECT feature FROM plan_features WHERE plan_id=${plans[i].plan_id}`)).rows;
                plans[i].features = Object.keys(features).map(function(k){return features[k].feature});
            }

            res.render("dashboard", {plans:plans});
        }, 
        gallery: (req, res) => {
            res.render("gallery");
        }, 
        login: (req, res) => {
            res.render("login");
        },
        registration: (req, res) => {
            res.render("registration");
        }
    },
    post: {
        login: async(req, res) => {
            let errors = {
                email: "",
                password: ""
            };

            if(!req.body.email) errors.email = "Email is required";
            if(!req.body.password) errors.password = "Password is required";
            
            if(hasErrors(errors)) {  
                res.render("login", {errors:errors});
            }
            else {
                const result = await pool.query(`SELECT email, name FROM users WHERE email='${req.body.email}' AND password='${req.body.password}'`);
                if(result.rowCount!=0) {
                    req.session.isLoggedIn = true;
                    req.session.email = req.body.email;
                    res.redirect("/dashboard");
                } else {
                    res.render('login', {formStatus: "Invalid Credentials"});
                }
            }
        },
        registration: async (req, res) => {
            let errors = {
                name: "",
                email: "",
                password: ""
            };

            const minPassLength = 5;

            if(!req.body.name) errors.name = "Name is required";
            if(!req.body.email) errors.email = "Email is required";
            if(!req.body.password) {
                errors.password = "Password is required";
            } else {
                if(req.body.password.length < minPassLength)
                    errors.password = `Password length must be atleast ${minPassLength} characters long`;
                else if(req.body.password != req.body.cpassword)
                    errors.password = "Passwords do not match";
            }
            
            if(hasErrors(errors)) {    
                res.render("registration", {errors:errors});
            }
            else {
                try {
                    let response = await pool.query(`INSERT INTO users VALUES('${req.body.email}', '${req.body.name}', '${req.body.password}', now())`);
                    if(response) {
                        response = await pool.query(`SELECT * FROM users WHERE email='${req.body.email}' AND password='${req.body.password}'`);
                        req.session.isLoggedIn=true;
                        req.session.email = req.body.email;
                        res.redirect("/dashboard");
                    }
                } catch (exp) {
                    res.render("registration", {formStatus: "Email already in use"});
                }
            }
        }
    }
};