const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Books', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Помилка підключення до бази даних:'));
db.once('open', function() {
    console.log('Підключено до бази даних MongoDB');

});