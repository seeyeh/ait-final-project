const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.json({"testing": "hello"})
})

app.listen(5001, ()=> {
    console.log('Server running on port 5001')
})
