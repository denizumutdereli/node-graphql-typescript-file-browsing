"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = __importDefault(require("http"));
const middleware_1 = require("graphql-voyager/middleware");
const schema_1 = __importDefault(require("./api/schema"));
const resolvers_1 = __importDefault(require("./api/resolvers"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';
const myPlugin = {
    requestDidStart(requestContext) {
        //requestContext.request.query;
        return {
            parsingDidStart(requestContext) {
                console.log('Parsing started!');
            },
            validationDidStart(requestContext) {
                console.log('Validation started!');
            },
        };
    },
};
const apollo = new apollo_server_express_1.ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    plugins: [
        myPlugin,
    ],
});
/* Applying apollo middleware to express server */
apollo.applyMiddleware({ app });
app.use('/voyager', (0, middleware_1.express)({ endpointUrl: '/graphql' }));
/*  Creating the server based on the environment */
const server = http_1.default.createServer(app);
server.listen({ port, host }, () => console.log(`🚀 GraphQL playground is running on ${process.env.NODE_ENV} at http://${host}:${port}${apollo.graphqlPath}\``));
