const express = require('express');
const routes = express.Router();
const Ticker = require('../models/datamodel')

routes.get('/', async(req,resp)=>{
    try {
        console.log("5");
        const details=await Ticker.find();
        console.log(details);
        resp.render('index',{details})
    } catch (error) {
        resp.send("failed the get data")
    }
})


module.exports = routes;
