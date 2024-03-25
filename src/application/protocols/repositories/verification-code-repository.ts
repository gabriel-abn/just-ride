export interface SaveVerificationCodeRepository {
  save: (email: string, code: string) => Promise<void>;
}

export interface CheckVerificationCodeRepository {
  check: (email: string, code: string) => Promise<boolean>;
}
