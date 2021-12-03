// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateProjId(req, res, next) {
  try {
    const proj = await Projects.get(req.params.id);
    if (proj) {
      req.project = proj;
      next();
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch (error) {
    next(error);
  }
}

function validateProj(req, res, next) {
  const { name, description, completed } = req.body;
  if (name && description && (completed === true || completed === false)) {
    next();
  } else {
    next({ status: 400, message: "missing required project field" });
  }
}

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: `Horror in the router: ${err.message}`,
    stack: err.stack,
  });
}

module.exports = { errorHandling, validateProjId, validateProj };
