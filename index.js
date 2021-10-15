const sequelize = require('./database');
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const Client = require('./models/client.model');
const Token = require('./models/token.model');
const Exchange = require('./models/exchange.model');
const Capital = require('./models/capital.model');
const Pair = require('./models/pair.model');
const Progress = require('./models/progress.model');
const Pool = require('./models/pool.model');

// Cargamos app
const app = require('./app');

//Server is started, port 3000
app.listen(3000, async () => {
  //console.log(sequelize);
    await sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');

      // Capital model associations
        Client.hasMany(Capital, { foreignKey: 'capital_client' });
          // Capital.belongsTo(Client);
        Progress.hasMany(Capital, { foreignKey: 'capital_progress' });
          // Capital.belongsTo(Progress);

      // Pair model associations
        Token.hasMany(Pair, { foreignKey: 'tokenA' });
        // Pair.belongsTo(Token);
        Token.hasMany(Pair, { foreignKey: 'tokenB' });
        // Pair.belongsTo(Token);
        Exchange.hasMany(Pair, { foreignKey: 'pair_exchange' });
          // Pair.belongsTo(Token);

      // Pool model associations
        Pair.hasMany(Pool, { foreignKey: 'pool_pair' });
          // Pool.belongsTo(Pair);
      

      Client.sync();
      Token.sync();
      Exchange.sync();
      Capital.sync();
      Pair.sync();
      Progress.sync();
      Pool.sync();

    })
    .catch((err) => {
      console.error('Unable to connect to the database:', error);
    });
  console.log("Server started (http://localhost:3000/) !");
});
