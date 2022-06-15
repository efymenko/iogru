export interface ExceptionsTransformFactory<From, To> {
  transform(error: From): To;
}
