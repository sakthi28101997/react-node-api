const Testimonial = require('../models/testimonial')

exports.store = async (req, res, next) => {
    try {

        const testimonial = new Testimonial(req.body);
        const savetestimonial = await testimonial.save();

        if (savetestimonial) {
            return res.status(200).json({
                status: 1,
                message: "Data Stored Successfully",
                data: savetestimonial
            });
        } else {
            return res.status(200).json({
                status: 0,
                message: "Try again Later",
            });
        }
    } catch (err) {
        res.status(200).json({
            success: 0,
            message: err.message
        });
    }

}

exports.list = async (req, res, next) => {
    try {
        
        const testimonial = await Testimonial
            .find({
                status:true
            })
            .select("description email photo name post status id");
        if (testimonial) {
            return res.status(200).json({
                status: 1,
                message: "List get Successfully",
                data: testimonial
            });
        } else {
            return res.status(200).json({
                status: 0,
                message: "Try again Later",
            });
        }
    } catch (err) {
        res.status(200).json({
            success: 0,
            message: err.message
        });
    }
}


exports.view = async (req, res, next) => {

    console.log(req.params.id);
    try {
        const testimonial = await Testimonial
            .findById(req.params.id)
            .select("description email photo name post status id ");
        if (testimonial) {
            return res.status(200).json({
                status: 1,
                message: "data get Successfully",
                data: testimonial
            });
        } else {
            return res.status(200).json({
                status: 0,
                message: "Try again Later",
            });
        }
    } catch (err) {
        res.status(200).json({
            success: 0,
            message: err.message
        });
    }

}

exports.edit = async (req, res, next) => {
    try {

        console.log("req.body", req.body);
        req.body.photo = req.file?.path;
        const testimonial = await Testimonial
            .findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            .select("description email photo name post status id ");
        if (testimonial) {
            return res.status(200).json({
                status: 1,
                message: "data get Successfully",
                data: testimonial
            });
        } else {
            return res.status(200).json({
                status: 0,
                message: "Try again Later",
            });
        }
    } catch (err) {
        res.status(200).json({
            success: 0,
            message: err.message
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const testimonial = await Testimonial
            .findByIdAndUpdate(req.params.id, {
                status: false,
            }, {
                new: true
            })
            .select("description email photo name post status id");
        if (testimonial) {
            return res.status(200).json({
                status: 1,
                message: "data get Successfully",
                data: testimonial
            });
        } else {
            return res.status(200).json({
                status: 0,
                message: "Try again Later",
            });
        }
    } catch (err) {
        res.status(200).json({
            success: 0,
            message: err.message
        });
    }
}