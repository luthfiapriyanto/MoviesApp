const Hapi = require('hapi');
const configureRoutes = require('./src/route');
var swaggerJSDoc = require('swagger-jsdoc');

//const hostname = 'localhost';
const port = 3000;

const server = new Hapi.Server();
server.connection({
	//host: hostname,
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

        register: require('hapi-swagger');

        const routes = configureRoutes();
        server.route(routes);
        server.start(() => console.log(`Server running at :${port}`));
    }
});

module.exports = server;

// var swaggerUi = new SwaggerUi({
//   url: 'http://petstore.swagger.io/v2/swagger.json',
//   dom_id: 'swagger-ui-container'
// });

// swaggerUi.load();
/*
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);
*/
