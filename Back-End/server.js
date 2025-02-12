const dotenv = require('dotenv');


// load the environment variables
dotenv.config();










const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});