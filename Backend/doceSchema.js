const mongoose = require('mongoose');

const doceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['bolos', 'cupcakes', 'docinhos', 'tortas', 'outros'],
        required: true
    }
});

module.exports = mongoose.model('Doce', doceSchema);