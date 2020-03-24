const mongoose = require('mongoose');

const { mongodbUri } = require('../config/environment');

module.exports = server => {
    const mongodbConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    
    mongoose.connect(mongodbUri, mongodbConfig, err => {
        if (err) throw err;

        const port = process.env.PORT || 4000;
        server.listen(port);
    });
};