require("@babel/register");

const app = require("../");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listener in http://localhost:3000");
});
