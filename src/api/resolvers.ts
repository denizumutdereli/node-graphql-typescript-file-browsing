import fs from "fs";
import path from "path";

type Types = 'folder' | 'file';

class TreeNode {
    public path: string;
    public name: string;
    public type: Types;
    public size: number;
    public children: Array<TreeNode>;

    constructor(path) {
        this.path = path;
        this.children = [];
    }
}

function build(rootPath: string, depth: number = 5, type: number = 1) {
    /*  browsing limitation
    */
    //rootPath = path.normalize(rootPath)
    rootPath = (rootPath.startsWith('../') || rootPath.startsWith('/')) ? './' : rootPath;
    console.log(rootPath)

    const root = new TreeNode(rootPath);
    const stack = [root];

    while (stack.length) {
        const currentNode = stack.pop();

        if (currentNode) {
            const children = fs.readdirSync(currentNode.path);
            currentNode.name = path.parse(currentNode.path).name;
            currentNode.size = 0;

            if (!fs.statSync(currentNode.path).isDirectory()) {
                currentNode.type = "file"
                currentNode.size = fs.statSync(currentNode.path).size;
            } else
                currentNode.type = "folder";

            for (let child of children) {
                const childPath = `${currentNode.path}/${child}`;
                const childNode = new TreeNode(childPath);
                childNode.size = fs.statSync(childNode.path).size

                childNode.name = path.parse(childNode.path).name;
                childNode.path = childPath
                if (fs.statSync(childNode.path).isFile())
                    childNode.type = "file";
                else childNode.type = "folder";

                currentNode.children.push(childNode);

                if (fs.statSync(childNode.path).isDirectory() && depth > 0) {
                    stack.push(childNode);
                }
            }
        }
    }

    return root;
}

const resolvers = {
    Query: {
        getFolderWithFiles: (root, { rootPath, depth }) => {
            return build(rootPath, depth, 1);
        },
        getNestedFolders: (root, { rootPath, depth }) => {
            return build(rootPath, depth, 0);
        },
    },
};

export default resolvers;