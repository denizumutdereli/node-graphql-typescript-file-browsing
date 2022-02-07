import 'dotenv/config';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from 'http';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import cors from 'cors';

import typeDefs from "./api/schema";
import resolvers from "./api/resolvers";

const app = express();
app.use(cors());

const port: string | number = process.env.PORT || 5000;
const host: string | number = process.env.HOST || '0.0.0.0';

const myPlugin = {
    requestDidStart(requestContext) { //ref: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
        //requestContext.request.query;
        return {
            parsingDidStart(requestContext) {
                console.log('Parsing started!');
            },
            validationDidStart(requestContext) {
                console.log('Validation started!');
            },
        }
    },
};

const apollo = new ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    typeDefs,
    resolvers,
    plugins: [
        myPlugin,
    ],
});

/* Applying apollo middleware to express server */
apollo.applyMiddleware({ app });

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

/*  Creating the server based on the environment */
const server = http.createServer(app);

server.listen({ port, host }, () => console.log(`GraphQL is running on ${process.env.NODE_ENV} at http://${host}:${port}${apollo.graphqlPath}\``));
