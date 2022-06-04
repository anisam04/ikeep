const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, }
);

// shortcut to mongoose.connection object
const db = mongoose.connection;

//connection success check
db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
