export class Role {
  constructor(
    public id: number,
    public title: string,
    public user_id: number //FK
  ) {
  }
}
