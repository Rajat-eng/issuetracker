const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
const issuesController = require("../controllers/issuesController");

router.get('/create',projectsController.index);

router.post('/create-project',projectsController.createProject);

router.get('/:id',projectsController.showProjectDetails);

router.get('/close-project/:id',projectsController.closeProject);


// issues 
router.get('/:id/create-issue',issuesController.index);
router.post('/:id/create-issue',issuesController.createIssue);

module.exports=router;