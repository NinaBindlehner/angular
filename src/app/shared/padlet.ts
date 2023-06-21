import { Entry } from "./entry";
export { Entry } from "./entry";
import { User } from "./user";
export { User } from "./user";

export class Padlet {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public is_public: boolean, //ev. weggeben
    public user_id: number, //FK user_id
    public created_at: Date,
    public updated_at: Date,
    public users: User[],
    public user: User,
    public entries: Entry[]
  ) {
  }
}
