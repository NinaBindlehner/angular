export class Rating {
  constructor(
    public id: number,
    public number: number,
    public entry_id: number, //FK
    public user_id: number //FK
  ) {
  }
}
