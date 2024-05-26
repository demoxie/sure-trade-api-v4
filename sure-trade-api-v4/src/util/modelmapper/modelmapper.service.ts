import { Injectable } from "@nestjs/common";

@Injectable()
export class ModelMapperService {}

export class ModelMapper<S, D> {
  map = (source: S): D => {
    const destinationObject = {};
    Object.entries(source).forEach(([key, value]) => {
      destinationObject[key] = value;
    });
    return destinationObject as D;
  };
}
