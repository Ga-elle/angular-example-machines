import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {
    private users: User[] = [
        {
            firstName: "James",
            lastName: "Smith",
            email: "james.smith@smith.com",
            drinkPreference: "coca",
            hobbies: ['coder', 'manger', 'degustation de cafe']
        }
    ];
    userSubject = new Subject<User[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}