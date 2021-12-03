// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

async function vaildateActionId(req, res, next) {
    try{
        const actions = await Actions.get(req.params.id)
        if (actions){
            req.action = actions; 
            next();
        } else {
            next({ status: 404, message:"action not found"})
        }

    } catch(err){
        next(err)
    }
}

function vaildateAction(req, res, next){
    const{ project_id, notes, description,completed} = req.body;
    if(project_id && notes && description &&(
        completed === true || completed === false
    )) {
        next();
    } else {
        next({ status: 400, message:"missing required filed"})
    }
}


function vaildateActionProjectId(req, res, next) {
    const {project_id} = req.body;
    Projects.get(project_id)
      .then(project => {
          if (project){
              next();
          } else {
            next({ status: 404, message:"project with specific id not found"})
          }
      })
      .catch(next);
}

module.exports = { vaildateActionId, vaildateActionProjectId, vaildateAction }