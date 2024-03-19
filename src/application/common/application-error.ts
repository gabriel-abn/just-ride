export class ApplicationError extends Error {
  constructor(message: string, name: string = "ApplicationError") {
    super(message);
    this.name = name;
  }
}
