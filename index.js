const express=require("express");
const app=express();

const port = 8080;
const { v4: uuidv4 } = require('uuid');


const path=require("path");
app.listen(port,()=>{
    console.log("Listening to port 8080");
});

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));



app.set("view engine","ejs");

const methodOverride = require("method-override");
app.use(methodOverride("_method"))



let posts=[
    {
        id:uuidv4(),
        username:"Jash",
        content:"I am a student"
    },
    {   
        id:uuidv4(),
        username:"Rahul",
        content:"Hardwork is important in life"
    },
    {   
        id:uuidv4(),
        username:"Ramya",
        content:"I am a Teacher"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");

});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);
    res.render("view.ejs" , {post});
});

app.get("/posts/:id/edit" ,(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id===p.id)
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);
    let newContent=req.body.content;
    console.log(newContent);
    console.log(post);
    post.content=newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p) => id != p.id);
    res.redirect("/posts")
    
    

});

