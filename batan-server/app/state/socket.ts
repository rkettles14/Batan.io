export default {
  online: new Map(),

  addSocket(sub, socket_id) {
    if (this.online.has(sub)) {
      let sockList = this.online.get(sub);
      sockList.push(socket_id);
      this.online.set(sub, sockList);
    } else {
      this.online.set(sub, [socket_id]);
    }
  },

  rmSocket(sub, socket_id) {
    if (this.online.has(sub)) {
      let sockList = this.online.get(sub);
      let ind = sockList.indexOf(socket_id);
      if (ind != -1) {
        sockList.splice(ind, 1);
      }
      if (sockList.length > 0) {
        this.online.set(sub, sockList);
      } else {
        this.online.delete(sub);
      }
    }
  }
}
