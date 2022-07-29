const Project = require("../models/project")

module.exports.home=async function(req,res){
    const projects=await Project.find({}).sort('-createdAt');
    if(!req.body.title || req.body.title==undefined){
        // if search bar is empty
        return res.render('home',{
            title:"Issue Tracker", 
            projects:projects,
            input_value:''   
        })
    }

    const searchText=req.body.title;
    const newProjectList=projects.filter((project)=>{
        let projectName=project.name;
        return projectName.includes(searchText);
    })

    return res.render('home',{
        title: "Issue Tracker | Home",
        projects: newProjectList,
        input_value: req.body.title
    })    
};

