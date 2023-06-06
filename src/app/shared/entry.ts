export class Entry {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public padlet_id: number, //FK
    public user_id: number //FK
  ) {
  }
}
