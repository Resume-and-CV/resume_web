//server.js

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
const staticPath = path.join(__dirname, 'build')
console.log('Serving static files from:', staticPath)
app.use(express.static(staticPath))

// Catch-all handler
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html')
  console.log('Serving index.html from:', indexPath)
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err)
      res.status(404).send('File not found')
    }
  })
})

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
