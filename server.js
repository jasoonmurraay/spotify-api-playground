const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.send("hello world!")
})

app.put('/:playlistId', (req, res) => {
    console.log("Req: ", req)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
