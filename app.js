import { SMTPServer } from "smtp-server";

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,

  onConnect(session, cb) {
    console.log("onConnect: ", session.id);
    cb();
    // cb(new Error('Cannot Accept the Request'))
  },

  onMailFrom(address, session, cb) {
    console.log("Mail from address", address.address, session.id);
    cb();
  },

  onRcptTo(address, session, cb) {
    console.log("onRpt To", address.address, session.id);
  },
  onData(stream, data, cb) {
    stream.on("data", (data) => {
      console.log("onData", data.toString());
    });
    stream.on("end", cb);
  },
});

server.listen(25, () => {
  console.log("Server running on port 25");
});
