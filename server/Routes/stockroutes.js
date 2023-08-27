// api_key = PKKM0LCA32H89WRZ8A1R
// api_secret = 7QNcVM5RSbi2aWghXVeMTlcnrrGS12fjQxDmBcmG
const express = require('express');
const router = express.Router();
const {Realtime_data} = require('../Controllers/stockcontroller')

router.post('/realtime_data',Realtime_data);

module.exports = router;