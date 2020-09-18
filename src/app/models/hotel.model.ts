export class Hotel {
  id:         number;
  name:       string;
  adresse:    string;
  city:       string;
  tel:        string;
  stars:      number;

  constructor(json?) {
    this.name         = json.name;
    this.adresse      = json.adresse;
    this.city         = json.city;
    this.tel          = json.tel;
    this.stars        = json.stars;
  }
}
