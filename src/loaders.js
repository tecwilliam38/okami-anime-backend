const Connection = require('./db');

class Loaders{
start(){
    Connection();
}
}

module.exports = new Loaders;