require("babel-register")({
  presets: ["env"]
});

const app = require("../");

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("listener in http://localhost:3000");
});
