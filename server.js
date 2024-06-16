// Server.js

const express = require('express')
const path = require('path')
const app = express()

app.enable('trust proxy')

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    res.redirect(`https://${req.headers.host}${req.url}`)
  } else {
    next()
  }
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Catch-all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
