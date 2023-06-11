import {Padlet} from "./padlet";

export class PadletFactory {

  static empty() : Padlet {
    return new Padlet(0, '', '', true, 0, new Date(), new Date(),
      [{id: 0, firstname: '', lastname: '', image: '', email: '', password: '', padlet_id: 0, role_id: 0}],
      {id: 0, firstname: '', lastname: '', image: '', email: '', password: '', padlet_id: 0, role_id: 0},
      [{id: 0, title: '', description: '', padlet_id: 0, user_id: 0}])
  }

  //Mapping-Methode, die aus dem RAW-JSON ein Padlet-Objekt erzeugt
  static fromObject(rawPadlet: any) : Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.title,
      rawPadlet.description,
      rawPadlet.is_public,
      rawPadlet.user_id,
      typeof(rawPadlet.created_at) === 'string' ? new Date(rawPadlet.created_at) : rawPadlet.created_at, //Datum konvertieren also wenn Datum vom Typ String ist, dann wirds auf new Date gemapped und ansonsten wirds direkt übernommen als Datum
      typeof(rawPadlet.updated_at) === 'string' ? new Date(rawPadlet.updated_at) : rawPadlet.updated_at,
      rawPadlet.users,
      rawPadlet.user,
      rawPadlet.entries
    )
  }

}
