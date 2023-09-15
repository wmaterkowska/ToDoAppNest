import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { DataSource } from "typeorm";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueContraint implements ValidatorConstraintInterface {

  constructor(private dataSource: DataSource) { }

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    return await this.dataSource
      .getRepository(args.targetName)
      .findOne({
        where: {
          [args.property]: value,
        },
      })
      .then((entity) => {
        if (entity) return false;
        return true;
      })
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueContraint,
    });
  };
}