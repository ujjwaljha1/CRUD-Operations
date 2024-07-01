const express = require("express");
const app = express();
const bookRoute = require('./Router/BookRoutes');

const PORT = 3031;
app.use(express.json());

app.use("/", bookRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
