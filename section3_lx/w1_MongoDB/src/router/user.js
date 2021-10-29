const {Router} = require('express')

const router = Router();
module.exports = router;

const db = require('../db')
const {formatData} = require('../utils')

// get /api/user/list
router.get('/list',async (req,res)=>{
   
})
router.put('/:id',async (req,res)=>{
    
})