const express = require('express');
const cors = require('cors');
const { router } = require("./routes/user"); // Correct import
const app = express();

app.use(cors());
app.use(express.json());
app.use('/app/v1', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});