import { connectAndDo } from '../../database';
import { IUserDocument } from "../../database/users.types"

export default (io, socket) => {
  socket.emit('test_vuex', {vuex_test: 'hi from vuex'});

  socket.on('hello', (data) => {
    console.log(`Hello received from ${socket.decoded_token.sub}, ${socket.id}`)
  });

  io.emit('test_vuex', {vuex_test: 'IO EMIT'});

  socket.on('test/addGame', (data: any) => {
    console.log("Going to add a game to the user's game list");
    console.log(data);

    connectAndDo(async (db: any) => {
      if(db === undefined || db === null){
        console.error("Cannot do the daddybase stuff");
        return;
      }

      const user = await db.UserModel.findBySub(data.sub) as IUserDocument;
      if(user == null){
        console.log("Make sure you make the user's account first");
        return;
      }
      await user.addGame(data.game);
    });
  });
}
