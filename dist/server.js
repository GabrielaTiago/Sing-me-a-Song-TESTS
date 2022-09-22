import app from "./app.js";
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT, "."));
});
