import type { IHashComparer, IHasher } from "@/application/protocols/security";

class Hasher implements IHashComparer, IHasher {
  async compare(plainText: string, digest: string): Promise<boolean> {
    return await Bun.password.verify(plainText, digest);
  }

  async hash(plainText: string): Promise<string> {
    return await Bun.password.hash(plainText);
  }
}

export default new Hasher();
