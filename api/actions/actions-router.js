// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model")
const { errorHandling } = require('../projects/projects-middleware');
const
 {
    vaildateAction,
    vaildateActionProjectId,
    vaildateActionId,
} = require("./actions-middlware");

router.get("/", (req, res, next) => {
    Actions.get()
      .then(action => {
        res.status(200).json(action);
      })
      .catch(next);
});

router.get("/:id", vaildateActionId, (req, res) =>{
    res.json(req.action);
})

router.post("/", vaildateAction, vaildateActionProjectId, (req, res, next)=> {
    Actions.insert(req.body)
      .then(action => { 
          res.status(201).json(action);
      })
      .catch(next);
});

router.put(
    "/:id",
    vaildateAction,
    vaildateActionId,
    vaildateActionProjectId,
    (req, res, next) => {
        Actions.update(req.params.id, req.body)
         .then(action => {
            res.status(200).json(action);
         })
         .catch(next);
    }
);

router.delete("/:id", vaildateActionId, (req, res, next)=> { 
     Actions.remove(req.params.id)
    .then(project => res.json(project))    
    .catch(next);
});

router.use(errorHandling);

module.exports = router;