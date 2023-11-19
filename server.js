const app = require('./src/app');
const { app : {port} } = require('./src/configs/config.app');

const PORT = port || 3000

const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    })
})