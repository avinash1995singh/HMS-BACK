const controlers =require('../Controlers/controlers')
const express=require('express');
const Route= express.Router();


Route.post('/hospitaldetails',controlers.hospitalDetails)
Route.post('/consultant', controlers.saveConsultant);
Route.post('/opdRecords', controlers.saveOPD);

// Route.post('/consultantByDept', controlers.getConsultantBydept);

// Route.get('/consultant', controlers.getConsultant)


module.exports=Route;