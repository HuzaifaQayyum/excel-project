const { Schema, model } = require('mongoose');

const supervisorSchema = new Schema({ 
    name: { type: String, required: true }
});

module.exports = model('supervisors', supervisorSchema);