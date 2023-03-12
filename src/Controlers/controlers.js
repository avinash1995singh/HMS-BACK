const db = require('../Models/index')

exports.hospitalDetails=  (req, res) => {
    const hospitalDetails = req.body;
    db.query("INSERT INTO hospitaldetails SET?", hospitalDetails, (err, result, field) => {
      if (err) throw err;
      res.send({ message: "Ward Add Succesfully" });
    });
  }

  exports.saveConsultant=(req,res)=>{
    const consultant = req.body;
    db.query("INSERT INTO consultant SET?", consultant, (err, result, field) => {
      if (err) throw err;
      res.send({ message: "consultant Add Succesfully" });
    }); 
  }

  exports.saveUser=(req,res)=>{
    const consultant = req.body;
    db.query("INSERT INTO user SET?", consultant, (err, result, field) => {
      if (err) throw err;
      res.send({ message: "User Add Succesfully" });
    }); 
  }
  exports.getUser=(req,res)=>{
    db.query("SELECT * FROM user", (err, result, field) => {
      if (err) throw err;
      res.send({ data:result,message: "User Add Succesfully" });
    }); 
  }

  exports.getRole=(req,res)=>{
    db.query("SELECT * FROM role", (err, result, field) => {
      if (err) throw err;
      res.send({ data:result, message: "User Add Succesfully" });
    }); 
  }

  exports.saveOPD=(req,sss)=>{
    var opd = req.body;
    db.query( `SELECT * FROM opdrecords Where Counsultant_Id = ?`, [opd.Counsultant_Id], (err, result)=>{
      if (err) throw err;
      else{
      
        if(result.length==0){
          opd.Token=1
        }
        else{
          let Data = result.filter((resp)=>{
           if(resp.Date==opd.Date)
           {
            return resp;
           }
          })
          let len =Data.length-1
          if(Data[len]!==undefined){
            opd.Token=(1+Data.length)
          }
          else{
            opd.Token=1
          }
        }   
      }

// for RECIPET NO
db.query ("SELECT * FROM payment ORDER BY receipt_number LIMIT 1", (err,res,field)=>{
  if(err) throw err
  else{
    let obj = {
      payment_type: "OPD",
      receipt_number	:res[0]['receipt_number'] +1
    }
    db.query("INSERT INTO payment SET? ",obj,(err,resul,field)=>{
    if(err) throw err;
    else {
      opd.Payment_Recp_No=obj.receipt_number;
      db.query ("SELECT * FROM uhid ORDER BY UHID LIMIT 1", (err,res,field)=>{
        if(err) throw err
        else{
          let obj = {
            pasent_type: "OPD",
            UHID:res[0]['UHID']+1
          }
          db.query("INSERT INTO uhid SET? ",obj,(err,resul,field)=>{
          if(err) throw err;
          else {
            opd.UHID=obj.UHID
            db.query("INSERT INTO opdrecords SET?", opd, (err, result, field) => {
              if (err) throw err;
              sss.send({ mes: "OPD Add Succesfully",data:opd},
            
              );
            });
          }
           } )
        }
        })


    
    }
     } )
  }
  })
  
 
 


})



  }

    

   