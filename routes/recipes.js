const express = require('express');
const { body, validationResult } = require('express-validator');
const Recipe = require('../models/Recipe')
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();

router.get('/fetchallrecipes', fetchuser, async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user.id });
        res.send(recipes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

})

router.post('/addrecipe', fetchuser, [
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
        const recipe = new Recipe({ title, description, direction, user: req.user.id, img });
        const savedRecipe = await recipe.save();
        res.json(savedRecipe);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.put('/updaterecipe/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newRecipe = {};
    try {
        if (title) { newRecipe.title = title };
        if (description) { newRecipe.description = description };
        if (tag) { newRecipe.direction = direction };

        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send('Not Found')
        }
        // Checks if the recipe User is same as the User of the token
        if (recipe.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        recipe = await Recipe.findByIdAndUpdate(req.params.id, { $set: newRecipe }, { new: true });
        res.json(recipe)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.delete('/deleterecipe/:id', fetchuser, async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send('Not Found')
        }
        // Checks if the recipe User is same as the User of the token
        if (recipe.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        recipe = await Recipe.findByIdAndDelete(req.params.id);
        res.json({
            Success: "Recipe has been deleted",
            recipe: recipe
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.get('/getrecipe/:id', fetchuser, async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send('Not Found')
        }
        // Checks if the recipe User is same as the User of the token
        if (recipe.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        res.send(recipe);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router