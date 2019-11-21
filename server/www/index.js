require("@babel/register");

const app = require("../");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("listener in http://localhost:4000");
});
