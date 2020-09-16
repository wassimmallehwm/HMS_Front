export class Airplane {
  id: number;
  name: string;
  reference: string;
  designation: string;
  reactorType: string;

  constructor(name: string, reference: string, designation: string, reactorType: string) {
    this.name = name;
    this.reference = reference;
    this.designation = designation;
    this.reactorType = reactorType;
  }
}
