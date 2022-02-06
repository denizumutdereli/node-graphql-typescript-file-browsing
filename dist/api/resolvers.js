"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class TreeNode {
    constructor(path = './') {
        this.path = path;
        this.children = [];
    }
}
function build(rootPath, depth = 5, type = 1) {
    const root = new TreeNode(rootPath);
    const stack = [root];
    while (stack.length) {
        const currentNode = stack.pop();
        if (currentNode) {
            const children = fs_1.default.readdirSync(currentNode.path);
            currentNode.name = path_1.default.parse(currentNode.path).name;
            currentNode.size = 0;
            if (!fs_1.default.statSync(currentNode.path).isDirectory()) {
                currentNode.type = "file";
                currentNode.size = fs_1.default.statSync(currentNode.path).size;
            }
            else
                currentNode.type = "folder";
            for (let child of children) {
                const childPath = `${currentNode.path}/${child}`;
                const childNode = new TreeNode(childPath);
                currentNode.children.push(childNode);
                if (fs_1.default.statSync(childNode.path).isDirectory() && depth > 0) {
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
exports.default = resolvers;
