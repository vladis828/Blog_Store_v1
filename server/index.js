const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const db = require('./db/database')

/**Port set by Heroku if not use 5000 */
const port = process.env.PORT || 5000;


/**Middleware for logging requests and responses */
app.use(volleyball)

/**After getting index.html send all related styling and image files*/
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./api/index'))

/**Send index.html for any request*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

/**Listen for port and send the message to the console */
db.sync()
  .then(() => {
    console.log('Database connected!');
    app.listen(port, console.log(`Server started on port http://localhost:${port}`))
  })
  .catch(err => console.log(`ERROR!!! =>>> ${err}`))



