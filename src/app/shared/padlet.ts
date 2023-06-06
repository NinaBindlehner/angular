//import { Entry } from "./entry";
//export { Entry } from "./entry";
import { User } from "./user";
export { User } from "./user";

export class Padlet {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public is_public: boolean, //ev. weggeben
    public user_id: number, //FK user_id
    //public entries: Entry[], //Array Entries ev weggeben
    public users: User[] //Array Users ev. weggeben
    //ev. Array von Entries bzw. Array von Users -> wär sinnvoll, aber hab i in Laravel glaub i ned so angegeben
    //ev. irgendwas nullable???
  ) {
  }
}
