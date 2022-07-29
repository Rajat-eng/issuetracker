const Project = require("../models/project");
const Issue = require("../models/issue");


module.exports.index=function (req, res) {
    return res.render("create_project", {
        title: "Issue Tracker | Create Project"
    });
};

module.exports.createProject=async function(req,res){
    const project=await Project.findOne({name:req.body.name});
    if(!project){
        await Project.create({
            name:req.body.name,
            description:req.body.description,
            author:req.body.author
        })
        return res.redirect('/');
    }else{
        return res.redirect('back');
    }
}

module.exports.showProjectDetails= async function(req,res){
    let project = await Project.findById( req.params.id );
    let issues;
    issues=await Issue.find({project:req.params.id});
    return res.render('project_detail',{
        title:'project Details',
        project:project,
        issues:issues,
    })
}

module.exports.closeProject = async function (req, res) {
    const project = await Project.findById(req.params.id ).populate({ path: 'issues' });
    if (project) {

        for (issue of project.issues) {
            issue.status = 'closed';
            issue.save();
        }
        
        project.status = 'closed';
        project.save();
    }
    return res.redirect("/");
}

