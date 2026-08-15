const express= require("express");
const app= express();

let path=require("path");

let port=8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./ejs-render/"));

app.use(express.static(path.join(__dirname, "ejs-render/static-files/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db= [{  
            username: "anand",
            post: "i like pink oranges"
        }, 
        {   
            username: "kunal", 
            post: "i like ravi kissan jokes!"
        },
];


app.listen(port, ()=>{
    console.log("Listening");
});


app.get("/posts", (req, res)=>{
    res.render("posts", {db});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts/new", (req, res)=>{
    let {user, post}= req.body;
    db.push({user, post});
    res.redirect("http://localhost:8080/posts/");
});
