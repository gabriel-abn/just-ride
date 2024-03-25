import type {
  CheckVerificationCodeRepository,
  SaveVerificationCodeRepository,
} from "@/application/protocols/repositories";
import type { KeyValueDatabase } from "../common";

export default class VerificationCodeRepository
  implements SaveVerificationCodeRepository, CheckVerificationCodeRepository
{
  constructor(private readonly keyValue: KeyValueDatabase) {}

  async save(email: string, code: string): Promise<void> {
    await this.keyValue.set(email, code);
  }

  async check(email: string, code: string): Promise<boolean> {
    const savedCode = await this.keyValue.get(email);

    return savedCode === code;
  }
}
