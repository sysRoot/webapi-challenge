const express = require('express');
const router = express.Router();
const projectModel = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
  projectModel
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: "The project information could not be retrieved."}))
})

// router.get('/:id/actions', async (req, res) => {
//   try {
//     const actions = await projectModel.getProjectActions(req.params.id);
//     actions
//     ? res.status(200).json(actions)
//     : res.status(404).json({ message: "Actions for that project number could not be found"})
//   } catch (err) {
//     res.status(500).json({ error: "The actions information could not be retrieved."})
//   }
// })

router.get('/:id', async (req, res) => {
  try {
    const project = await projectModel.get(req.params.id);
    project
      ? res.status(200).json(project)
      : res.status(404).json({ message: "A project with that ID could not be found."})
  }
  catch (err) {
    res.status(500).json({ error: "The project information could not be retrieved."})
  }
})

router.get('/:id', async (req, res) => {
    try {
      const project = await projectModel.get(req.params.id);
      project
        ? res.status(200).json(project)
        : res.status(404).json({ message: "A project with that ID could not be found."})
    }
    catch (err) {
      res.status(500).json({ error: "The project information could not be retrieved."})
    }
  })

  
module.exports = router;