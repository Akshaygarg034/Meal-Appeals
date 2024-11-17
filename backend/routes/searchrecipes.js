const express = require('express');
const { body, validationResult } = require('express-validator');
const SearchRecipe = require('../models/SearchRecipe')
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();

router.get('/fetchallsearchrecipes', async (req, res) => {
    try {
        const searchRecipe = await SearchRecipe.find();
        res.send(searchRecipe);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.post('/addsearchrecipe', [
    body('title', 'title must be minimum of 3 characters').isLength({ min: 3 }),
    body('description', 'description must be minimum of 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        // This will throw an error if title or description is not valid
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, direction, img } = req.body;
        const searchRecipe = new SearchRecipe({ title, description, direction, img});
        const savedRecipe = await searchRecipe.save();
        res.send(savedRecipe);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.delete('/deletesearchrecipe/:id',async (req, res) => {
    try {
        let searchRecipe = await SearchRecipe.findById(req.params.id);
        if (!searchRecipe) {
            return res.status(404).send('Not Found')
        }
        
        searchRecipe = await SearchRecipe.findByIdAndDelete(req.params.id);
        res.json({
            Success: "Recipe has been deleted",
            Recipe: searchRecipe
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router