const Hapi = require('hapi');
const configureRoutes = require('./route');

const hostname = 'localhost';
const port = 3000;

const server = new Hapi.Server();
server.connection({
	host: hostname,
	port: port
})

let options = {
    reporters: {
        consoleReporter: [{
            module: 'good-console',
            args: [{ log: '*', response: '*' }]
        }, 'stdout']
    }
};

server.register({ register: require('good'), options }, err => {
    if(err){
        server.error(`error`);
    } else {
        const routes = configureRoutes();
        server.route(routes);
        server.start(() => console.log(`Server running at ${hostname}:${port}`));
    }
});