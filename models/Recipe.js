const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        default: 'General'
    },
    img: {
        type: String,
        default: 'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('recipe', RecipeSchema)