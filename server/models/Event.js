const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    date: {
        type: Date,
        required: [true, 'Please add an event date']
    },
    time: {
        type: String,
        required: [true, 'Please add an event time'],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please use HH:MM format']
    },
    venue: {
        type: String,
        required: [true, 'Please add a venue'],
        maxlength: [255, 'Venue cannot exceed 255 characters']
    },
    ticketAvailability: {
        type: Number,
        required: true,
        min: [0, 'Ticket availability cannot be negative'],
        default: 0
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: {
            values: ['Music', 'Sports', 'Conference', 'Workshop', 'Festival', 'Art', 'Other'],
            message: 'Please select a valid category'
        },
        index: WebTransportDatagramDuplexStream
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


EventSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'event',
    justOne: false
});


EventSchema.pre('deleteOne', { document: true }, async function (next) {
    await mongoose.model('Booking').deleteMany({ event: this._id });
    next();
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;