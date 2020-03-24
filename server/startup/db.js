const mongoose = require('mongoose');

const { mongodbUri } = require('../config/environment');

module.exports = app => { 
    const mongodbConfig = { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    mongoose.connect(mongodbUri, mongodbConfig, err => { 
        if (err) return console.log(`MongoDB error Occured\n${JSON.stringify(err)}`);

        const port = process.env.PORT || 4000;
        app.listen(port, _ => console.log(`Listening on port ${port}`));
    });
};