import { connect, getDbConnection } from "../app/database"

(async () => {
    connect();
    const db = getDbConnection();
    db?.UserModel.deleteMany({}, (err: any) => {
        console.log(err);
    });
})();