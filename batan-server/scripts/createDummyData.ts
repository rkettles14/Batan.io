import { UserModel } from "../app/database/users.model"
import { connect, disconnect } from "../app/database"

(async () => {
    connect();

    const users = [
        { sub: "auth0", firstName: "Bob", lastName: "Boberson", email: "bobboberson@email.com", nickname: "bobby"},
        { sub: "auth1", firstName: "Job", lastName: "Boberson", email: "jobboberson@email.com", nickname: "jobby"},
        { sub: "auth2", firstName: "Sob", lastName: "Boberson", email: "sobboberson@email.com", nickname: "sobby"},
        { sub: "auth3", firstName: "Mob", lastName: "Boberson", email: "mobboberson@email.com", nickname: "mobby"},
        { sub: "auth4", firstName: "Dick", lastName: "Dickerson", email: "dickdickerson@email.com", nickname: "dicky"},
        { sub: "auth5", firstName: "Lick", lastName: "Dickerson", email: "lickdickerson@email.com", nickname: "licky"},
    ];

    try {
        for(const user of users) {
            await UserModel.create(user);
            console.log(`Created user ${user.firstName} ${user.lastName}`);
        }
        disconnect();
    } catch(e) {
        console.error(e);
    }
})();