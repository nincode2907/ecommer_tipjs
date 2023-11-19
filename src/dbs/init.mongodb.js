'use strict';

const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://mongosv29:12345678x@cluster0.2e3y9hj.mongodb.net/?retryWrites=true&w=majority'


class Database {
    constructor() {
        this.connect();
    }

    connect(type='mongodb') {
        if(true) {
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true});
        }

        mongoose.connect(connectionString)
            .then(() => {
                console.log('Connected to MongoDB')
            })
            .catch(err => {
                console.log('Error connecting to MongoDB')
            });
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;