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
        dashboard: (req, res) => {
            res.render("dashboard");
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
        login: (req, res) => {
            let errors = {
                email: "",
                password: ""
            };

            if(!req.body.email) errors.email = "Email is required";
            if(!req.body.password) errors.password = "Password is required";
            
            if(hasErrors(errors))          
                res.render("login", {errors:errors});
            else
                res.redirect("/dashboard");
        },
        registration: (req, res) => {
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
            
            if(hasErrors(errors))          
                res.render("registration", {errors:errors});
            else
                res.redirect("/dashboard");
        }
    }
};