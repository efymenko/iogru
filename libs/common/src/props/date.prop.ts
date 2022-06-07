import { applyDecorators } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';

const get = (val: Date) => {
  if (val) {
    return val.getTime();
  }
};

export const DateProp = (props?: object) =>
  applyDecorators(Prop({ ...props, type: Date, get }));
