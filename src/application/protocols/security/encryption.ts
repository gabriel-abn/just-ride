export interface IEncrypter {
  encrypt(value: any): string;
}

export interface IDecrypter<T = any> {
  decrypt(value: string): T;
}
