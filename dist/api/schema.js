"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
    
    type Attributes {
        name: String
        path: String
        size: String
        extension: String
        type: String
        children: [Attributes]
    }
      
    type Query {
        getFolderWithFiles(rootPath: String!, depth: Int = 10): Attributes,
        getNestedFolders(rootPath: String!, depth: Int = 5): Attributes
    }
`;
exports.default = typeDefs;
