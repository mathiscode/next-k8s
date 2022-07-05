"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_bcrypt_1 = __importDefault(require("mongoose-bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        }
    }
});
userSchema.plugin(mongoose_bcrypt_1.default);
exports.UserModel = mongoose_1.default.model('User', userSchema);
class User extends exports.UserModel {
    constructor(attributes) {
        super(attributes);
    }
}
exports.default = User;
