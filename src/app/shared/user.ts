export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public image: string,
    public email: string,
    public password: string,
    public padlet_id: number, //FK
    public role_id: number //FK
  ) {
  }
}
