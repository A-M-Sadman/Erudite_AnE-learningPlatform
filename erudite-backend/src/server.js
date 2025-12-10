const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

// In your backend (app.js or server.js):
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001', // Your frontend URL
  credentials: true
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
