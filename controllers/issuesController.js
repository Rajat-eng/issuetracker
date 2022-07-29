const Project = require("../models/project");
const Issue = require("../models/issue");

module.exports.index = async function (req, res) {
    let project = await Project.findById(req.params.id);
    return res.render('create_issue', {
        title: "Issue Tracker | Create Issue",
        project: project
    })
}

module.exports.createIssue=async function(req,res){
    const labelList = ['bug', 'documentation', 'duplicate', 'enhancement', 'invalid', 'compilance', 'observation', 'RFI'];
    try{
        let project = await Project.findById(req.params.id);
        if(project){
            const markedLabels=labelList.filter((label)=>{
                return req.body[label]!==undefined
            });
            console.log(markedLabels);
            const issue=await Issue.create({
                title:req.body.name,
                description:req.body.description,
                author:req.body.author,
                project:req.params.id,
                labels:markedLabels
            })
            project.issues.push(issue);
            project.save();
            return res.redirect(`/project/${req.params.id}`);
        }
    }catch(err){
        console.log("Error", err);
        return res.redirect('back');
    }
}

module.exports.destroy=async function(req,res){
    try{
        let issue=await Issue.findById(req.params.id);
        if(issue){
            let project_id=issue.project;
            issue.remove();
            let project=await Project.findByIdAndUpdate(project_id,{$pull:{issues:req.params.id}});
            return res.redirect('back');
        }  
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
}

module.exports.resolveIssue=async function(req,res){
    try{
        let issue = await Issue.findById(req.params.id);
        if(issue){
            issue.status = 'closed';
            issue.save();
            return res.redirect('back');
        }   
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
}

module.exports.clearFilter=async function(req,res){
    let projectid=req.query.id;
    let project = await Project.findById( projectid );
    let issues;
    issues=await Issue.find({project:projectid});
    return res.render('project_detail',{
        title:'project Details',
        project:project,
        issues:issues,
    })
}

module.exports.filterIssue=async function(req,res){
   try{
    const labelList = ['bug', 'documentation', 'duplicate', 'enhancement', 'invalid', 'compilance', 'observation', 'RFI'];
    let projectId=req.body.projectId;
    let project=await Project.findById(projectId);
    
    if(project){
        let markedLabels=labelList.filter((label)=>{
            return req.body[label]!==undefined
        });
    
        let issues=await Issue.find({project:projectId});
        const data=issues.filter((issue)=>{
            const isTitle=issue.title==req.body.title
            const isAuthor=issue.author==req.body.author
            const islabelCommon=findCommonElements(issue.labels,markedLabels)
            return isAuthor||isTitle||islabelCommon
        });
       
        return res.render('project_detail',{
            title:'project Details',
            project:project,
            issues:data,
        })
    }
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
}

function findCommonElements(arr1,arr2){
    return arr1.some(item => arr2.includes(item))
}