import { gql } from "apollo-server-express";

const typeDefs = gql`
    
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
`

export default typeDefs;