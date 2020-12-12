import { connect, disconnect } from "../app/database"

(async () => {
    const db = connect();
    db?.UserModel.deleteMany({}, (err: any){
        console.log(err);
    });

    disconnect();
})();