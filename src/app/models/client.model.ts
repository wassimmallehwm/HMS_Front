export class Client{

    id              :number;
    cin             :number;
    firstname       :string;
    lastname        :string;
    age             :number;
    email           :string;
    phone           :string;
    
    constructor(json?) {
        this.cin                    = json.cin;
        this.firstname              = json.firstname;
        this.lastname               = json.lastname;
        this.age                    = json.age;
        this.email                  = json.email;
        this.phone                  = json.phone;
    }

}