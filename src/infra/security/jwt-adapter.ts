import type { IDecrypter, IEncrypter } from "@/application/protocols/security";
import jwt from "jsonwebtoken";

class JwtAdapter implements IEncrypter, IDecrypter {
  encrypt(value: any): string {
    return jwt.sign(value, "secret");
  }

  decrypt(value: string): any {
    return jwt.verify(value, "secret");
  }
}

export default new JwtAdapter();
