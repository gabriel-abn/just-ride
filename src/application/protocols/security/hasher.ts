export interface IHasher {
  hash(value: string): Promise<string>;
}

export interface IHashComparer {
  compare(value: string, hashedValue: string): Promise<boolean>;
}
