const mongoose = require('mongoose');
// mongoose.set('strictQuery',true);
// const dotenv = require('.env');
const DB = 'mongodb+srv://tejutej07:Ravi1234567@cluster0.osqumwb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function () {
	console.log('Connected to Database :: Mongodb');
});

module.exports = mongoose;
