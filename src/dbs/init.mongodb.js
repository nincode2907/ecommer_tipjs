'use strict';

const mongoose = require('mongoose');
const { mongo : {userName, pass, cluster, databaseName} } = require('../configs/config.app');

const connectionString = `mongodb+srv://${userName}:${pass}@${cluster}.igrf69t.mongodb.net/${databaseName}?retryWrites=true&w=majority`

class Database {
    constructor() {
        this.connect();
    }

    connect(type='mongodb') {
        if(true) {
            mongoose.set('debug', {color: true, debug: true});
        }

        mongoose.connect(connectionString)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.log('Error connecting to MongoDB')
            console.log(err.message);
        })
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