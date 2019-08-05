const express = require('express');
const router = express.Router();
const projectModel = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
  projectModel
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: "The project information could not be retrieved."}))
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

  router.post('/', async (req, res) => {
    if (req.body.name && req.body.name.length < 129 && req.body.description){
      try {
        const newProject = await projectModel.insert(req.body);
        const project = await projectModel.get(newProject.id);
        res.status(201).json(project);
      } catch (err) {
        res.status(500).json({ error: "Could not add project."})
      }
    }
  })
  
  router.delete('/:id', async (req, res) => {
    try {
      const count = await projectModel.remove(req.params.id);
      count
      ? res.status(200).json({ message: "The project was deleted.", id: `${req.params.id}`})
      : res.status(404).json({ message: "A user with that ID could not be found."})
    } catch (err) {
      res.status(500).json({ error: 'Could not complete request.'})
    }
  })
  
  router.put('/:id', async (req, res) => {
    if (req.body.name && req.body.name.length < 129 && req.body.description){
      try {
        const count = await projectModel.update(req.params.id, req.body);
        if (count) {
          const project = await projectModel.get(req.params.id);
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: "A project with that ID could not be found."})
        }
      } catch (err) {
        res.status(500).json({ error: "The project could not be updated."})
      }
    }
  })

module.exports = router;