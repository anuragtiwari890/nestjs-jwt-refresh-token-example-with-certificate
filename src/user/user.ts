// For simplicity of this example, not using the typeORM or any database
export interface User {
  id: string;
  emailId: string;
  /**
   * Will be skipping password encryption for this project.
   * but the its alaways better encrypt the store the encrypted password
   */
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
}
