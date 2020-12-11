import { UserModel } from "../app/database/users.model"
import { connect, disconnect } from "../app/database"

(async () => {
    connect();

    const users = [
        { firstName: "Bob", lastName: "Boberson", email: "bobboberson@email.com", nickname: "bobby"},
        { firstName: "Job", lastName: "Boberson", email: "jobboberson@email.com", nickname: "jobby"},
        { firstName: "Sob", lastName: "Boberson", email: "sobboberson@email.com", nickname: "sobby"},
        { firstName: "Mob", lastName: "Boberson", email: "mobboberson@email.com", nickname: "mobby"},
        { firstName: "Dick", lastName: "Dickerson", email: "dickdickerson@email.com", nickname: "dicky"},
        { firstName: "Lick", lastName: "Dickerson", email: "lickdickerson@email.com", nickname: "licky"},
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