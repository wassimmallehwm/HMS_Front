import { Hotel } from "./hotel.model";

export class Chamber {

  id:         number;
  ref:        string;
  type:       string;
  price:      number;
  hotel:      number;
  hotelName:  string;

  constructor(json?) {
    this.ref          = json.ref;
    this.type         = json.type;
    this.price        = json.price;
    this.hotel        = json.hotel;
    this.hotelName    = json.hotelName;
  }
}
