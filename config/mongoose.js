const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
module.exports = app => {
    mongoose.connect(process.env.MONGO_URL, {
        // useUnifiedTopology: true,
        useNewUrlParser: true,
        // useFindAndModify: false
    }).then(res => console.log("Connected")).catch(err => console.log(err))
    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);
    if (app) {
        app.set("mongoose", mongoose);
    }
};
function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}