import { connect, disconnect } from "../app/database"

/**
 * This assumes that the createDummyData.ts script has been run and was successful
 */
(async () => {
    const db = connect();

    if(db === undefined){
        console.error("Cannot connect to database");
        return;
    }
    const bob = await db.UserModel.findBySub("auth0");
    console.log(bob);

    const dick = await db.UserModel.findByEmail("dickdickerson@email.com");
    console.log(dick);

    // for an existing guy
    const job = await db.UserModel.findOneOrCreate({ sub: "auth1", firstName: "Job", lastName: "Boberson", email: "jobboberson@email.com", nickname: "jobby"});
    console.log(job);

    // for a not existing guy. May need to change every run
    const lob = await db.UserModel.findOneOrCreate({ sub: "auth9", firstName: "Lob", lastName: "Loberson", email: "lobloberson@email.com", nickname: "lobby"});
    console.log(lob);

    disconnect();
})();