const express = require('express');
const router = express.Router();
const actionModel = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    actionModel
      .get()
      .then(actions=> res.status(200).json(actions))
      .catch(err => res.status(500).json({ error: "The action information could not be retrieved."}))
  })
  
  router.get('/:id', async (req, res) => {
    try {
      const action = await actionModel.get(req.params.id);
      action
        ? res.status(200).json(action)
        : res.status(404).json({ message: "Could not find an action with that ID."})
    }
    catch (err) {
      res.status(500).json({ error: "The action information could not be retrieved."})
    }
  })
  
  router.post('/', async (req, res) => {
    if (req.body.project_id && req.body.description && req.body.description.length < 129 && req.body.notes){
      try {
        const newaction = await actionModel.insert(req.body);
        const action = await actionModel.get(newaction.id);
        res.status(201).json(action);
      } catch (err) {
        res.status(500).json({ error: "Could not add action."})
      }
    }
  })
  
  router.delete('/:id', async (req, res) => {
    try {
      const count = await actionModel.remove(req.params.id);
      count
      ? res.status(200).json({ message: "The action was deleted.", id: `${req.params.id}`})
      : res.status(404).json({ message: "A user with that ID could not be found."})
    } catch (err) {
      res.status(500).json({ error: 'Could not complete request.'})
    }
  })
  
  router.put('/:id', async (req, res) => {
    if (req.body.description && req.body.description.length < 129 && req.body.notes && req.body.project_id){
      try {
        const count = await actionModel.update(req.params.id, req.body);
        if (count) {
          const action = await actionModel.get(req.params.id);
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: "A action with that ID could not be found."})
        }
      } catch (err) {
        res.status(500).json({ error: "The action could not be updated."})
      }
    }
  })
  
module.exports = router;