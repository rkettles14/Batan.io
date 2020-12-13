import { connectAndDo } from "../app/database"

/**
 * This assumes that the createDummyData.ts script has been run and was successful
 */
(async () => {
    connectAndDo(async (db : any){
        if(db === undefined){
            console.error("Cannot connect to database");
            return;
        }

        const bob = await db.UserModel.findBySub("auth0");
        console.log(bob);

        // check adding a game
        await bob.addGame({
            gameId: 1234,
            date: Date.now(),
            gameName: "testymctester",
            numPlayers: 4,
            playerWon: true,
            playerSettlements: 3,
            playerCities: 1,
            playerRoads: 15,
            playerResourceCards: 4,
            playerVictoryPoints: 10,
            playerLargestArmy: true,
            playerLongestRoad: true,
        });

        // check for removing the user
        const dick = await db.UserModel.findByEmail("dickdickerson@email.com");
        console.log(dick);

        dick.removeAllUserData();

        const dick2 = await db.UserModel.findByEmail("dickdickerson@email.com");
        console.log(dick2);

        // for an existing guy
        const job = await db.UserModel.findOneOrCreate({ sub: "auth1", firstName: "Job", lastName: "Boberson", email: "jobboberson@email.com", nickname: "jobby"});
        console.log(job);

        // for a not existing guy. May need to change every run
        const lob = await db.UserModel.findOneOrCreate({ sub: "auth9", firstName: "Lob", lastName: "Loberson", email: "lobloberson@email.com", nickname: "lobby"});
        console.log(lob);
    });
})();