export class Location {
  id: number;
  name: string;
  reference: string;

  constructor(name: string, reference: string) {
    this.name = name;
    this.reference = reference;
  }
}
