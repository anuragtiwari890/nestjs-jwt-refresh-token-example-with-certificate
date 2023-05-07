// For simplicity of this example, not using the typeORM or any database
export interface UserToken {
  id: string;
  userId: string;
  tokenLastUpdatedAt: Date;
}
