import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  class PasswordStrengthConstraint implements ValidatorConstraintInterface {

    validate(password: string, args: ValidationArguments) {

      // Checks for minimum length, letter, number and special character
      const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
      return regex.test(password);
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Password does not meet the strength requirements.';
    }
  }
  
  export function IsStrongPassword(validationOptions?: ValidationOptions) {

    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isStrongPassword',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: PasswordStrengthConstraint,
      });
    };

  }