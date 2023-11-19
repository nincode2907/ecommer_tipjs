const dev = {
    app : {
        port : process.env.DEV_PORT || 2907
    },
    mongo : {
        userName : process.env.MONGODB_USER_NAME || 'mongosv29',
        pass : process.env.MONGODB_PASSWORD,
        cluster : process.env.MONGODB_CLUSTER_NAME || 'cluster0',
    }
}

const product = {
    app : {
        port : process.env.PRO_PORT || 3000
    },
    mongo : {
        userName : process.env.MONGODB_USER_NAME || 'mongosv29',
        pass : process.env.MONGODB_PASSWORD,
        cluster : process.env.MONGODB_CLUSTER_NAME || 'cluster0',
    }
}

const config = {
    dev,
    product
}

const environment = process.env.MONGODB_ENVIRONMENT || 'dev'

module.exports = config[environment]