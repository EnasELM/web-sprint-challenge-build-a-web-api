// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const { errorHandling,   validateProjId, validateProj,} = require('./projects-middleware')
const Projects = require('./projects-model');

router.get('/', (req, res, next) => {
      
     Projects.get()
       .then((projects) => {
           res.status(200).json(projects);
       })
       .catch(next);
    })

    router.get("/:id",validateProjId , (req, res, next)=> {
       res.json(req.project)
       next();
    })

    router.post("/", validateProj, (req, res, next)=> {
        Projects.insert(req.body)
           .then(addProject => {
               res.status(201).json(addProject)
               next();
           })
           .catch(next);
    });

    router.put("/:id", validateProjId , validateProj , (req, res, next)=> {
        Projects.update(req.params.id, req.body)
          .then((updateProject) => {
            res.status(200).json(updateProject)  
          })
          .catch(next)
    });

    router.delete("/:id", validateProjId , (req, res, next)=> { 
        Projects.remove(req.params.id)
        .then(project => res.json(project))    
        .catch(next);
 });

 router.get("/:id/actions", validateProjId , (req, res, next)=> { 
     Projects.getProjectActions(req.params.id)
     .then(action => res.status(200).json(action))
     .catch(next);
 })
    
router.use(errorHandling);

module.exports = router;

