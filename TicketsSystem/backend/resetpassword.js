const express = require("express")

const router = express.Router();

router.get('/resetPassword', (req, res) => {
    console.log(req.query)
    res.send("")
})

module.exports = router