const express= require("express");
const app= express();

let path=require("path");

let port=8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./ejs-render/"));
const {v4 : uuidv4}= require("uuid");

app.use(express.static(path.join(__dirname, "ejs-render/static-files/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


let posts= [{  
            id: uuidv4(),
            username: "anand",
            post: "i like pink oranges"
        }, 
        {   
            id: uuidv4(),
            username: "kunal", 
            post: "i like ravi kissan jokes!"
        },
];


app.listen(port, ()=>{
    console.log("Listening");
});


app.get("/posts", (req, res)=>{
    res.render("posts", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts/new", (req, res)=>{
    let id= uuidv4();
    let {user, post}= req.body;
    posts.push({id, user, post});
    res.redirect("http://localhost:8080/posts/");
});

app.get("/posts/:id", (req, res)=>{
    let {id}= req.params;
    let s= posts.find((p)=> id===p.id);
    res.render("single.ejs", {s});
});

app.patch("/posts/:id", (req, res)=>{
    let {id}= req.params;
    
});

app.get("posts/:id/edit", (req, res)=>{
    let {id}= req.params;
    let ost= posts.find((p)=> id===p.id);
    res.render("edited.ejs", {ost});
});