"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
const find_1 = __importDefault(require("./find"));
const create_1 = __importDefault(require("./create"));
const update_1 = __importDefault(require("./update"));
exports.default = [find_1.default, get_1.default, create_1.default, update_1.default];
