const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CategoryModel = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return !(/[^-a-zA-Z]/.test(value));
            },
            message: props => 'Category name contains illegal characters'
        },
        trim: true,
        minlength: 3,
        maxlength: 24
    },
    label: {
        type: String,
        required: false,
        trim: true,
        default: function() {
            return this.name.split('-').map(function(word) { return (word.charAt(0).toUpperCase() + word.slice(1)); }).join(' ');
        }
    }
});

module.exports = Mongoose.model('categories', CategoryModel);