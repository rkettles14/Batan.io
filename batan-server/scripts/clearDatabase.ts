import { connectAndDo } from "../app/database"

(async () => {
    connectAndDo(async (db: any) =>{
        db?.UserModel.deleteMany({}, (err: any) => {
            console.log(err);
        });
    });
})();