export abstract class Entity<T> {
  protected readonly _id: string;
  protected readonly _props: T;

  constructor(id: string, props: T) {
    this._id = id;
    this._props = props;
  }

  get id(): string {
    return this._id;
  }

  get props(): T {
    return this.props;
  }
}
