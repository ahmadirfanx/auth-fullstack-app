"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStrongPassword = void 0;
const class_validator_1 = require("class-validator");
let PasswordStrengthConstraint = class PasswordStrengthConstraint {
    validate(password, args) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        return regex.test(password);
    }
    defaultMessage(args) {
        return 'Password does not meet the strength requirements.';
    }
};
PasswordStrengthConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], PasswordStrengthConstraint);
function IsStrongPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isStrongPassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: PasswordStrengthConstraint,
        });
    };
}
exports.IsStrongPassword = IsStrongPassword;
//# sourceMappingURL=password-validation.decorator.js.map