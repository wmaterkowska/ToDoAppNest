import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueColumnConstrait implements ValidatorConstraintInterface {

  async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {

    const entity: any = validationArguments.object.constructor;
    const filter = {};
    filter[validationArguments.property] = value

    return !!!(await entity.findOneBy(filter));
  }

}

export function IsUniqueColumn(options?: ValidationOptions) {
  return (o: object, propertyName: string) => {
    registerDecorator({
      target: o.constructor,
      propertyName,
      options,
      validator: UniqueColumnConstrait,
      async: true,
    });
  };
}