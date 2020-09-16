import { User } from "./user";

export class JwtResponse {
    accessToken: string;
    type: string;
    user: User;
    authorities: string[];
}
