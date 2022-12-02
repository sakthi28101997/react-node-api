const mongoose = require('mongoose');
const validator = require("validator");

const testimonialSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: [true, "This email id is already in use"],
        validate: [(val) => validator.isEmail(val)],
    },
    photo: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
});

testimonialSchema.index({
    email: 1
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;