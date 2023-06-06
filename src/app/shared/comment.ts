export class Comment {
  constructor(
    public id: number,
    public text: string,
    public entry_id: number, //FK
    public user_id: number //FK
  ) {
  }
}
