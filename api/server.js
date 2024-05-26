const dotenv = require("dotenv");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const server = app.listen(3000, () => {
  console.log("Server is listening");
});

// LAST SAFETY NET
// every error gets carried on process.on which could be used if not handled

// this is for async code
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
