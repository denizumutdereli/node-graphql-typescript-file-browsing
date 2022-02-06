"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class TreeNode {
    constructor(path) {
        this.path = path;
        this.children = [];
    }
}
const resolvers = {};
exports.default = resolvers;
