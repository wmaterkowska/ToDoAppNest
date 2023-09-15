"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const todo_entity_1 = require("../../todo/entities/todo.entity");
const password_entity_1 = require("../../password/entities/password.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => password_entity_1.Password),
    (0, typeorm_1.JoinColumn)({ name: "id" }),
    __metadata("design:type", password_entity_1.Password)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => todo_entity_1.Todo, todo => todo.userId),
    __metadata("design:type", Array)
], User.prototype, "todos", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Unique)(["email"]),
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map