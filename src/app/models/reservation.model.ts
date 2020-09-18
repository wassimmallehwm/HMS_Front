export class Reservation {

    id                      :number;
    client                  :number;
    chamber                 :number;
    duration                :number;
    price                   :number;
    nbAdultes               :number;
    nbKids                  :number;
    state                   :string;
    
    constructor(json?) {
        this.client                     = json.client;
        this.chamber                    = json.chamber;
        this.duration                   = json.duration;
        this.price                      = json.price;
        this.nbAdultes                  = json.nbAdultes;
        this.nbKids                     = json.nbKids;
        this.state                      = json.state;
    }

}

