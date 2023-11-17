// create web server
// create router object
const express = require('express');
const comments = require('../models/comments');
const router = express.Router();

// get all comments
router.get('/', (req, res) => {
    comments.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

// get comment by id
router.get('/:id', (req, res) => {
    comments.getById(req.params.id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

// get comments by post id
router.get('/post/:id', (req, res) => {
    comments.getByPostId(req.params.id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

// create comment
router.post('/', (req, res) => {
    comments.create(req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

// update comment by id
router.put('/:id', (req, res) => {
    comments.updateById(req.params.id, req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

// delete comment by id
router.delete('/:id', (req, res) => {
    comments.deleteById(req.params.id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

module.exports = router;