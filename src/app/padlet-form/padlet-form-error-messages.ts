export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const PadletFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Bitte gib einen Titel an'),
  new ErrorMessage('description', 'required', 'Bitte gib eine Beschreibung für das' +
    'Padlet an')
];
