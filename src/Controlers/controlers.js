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

  exports.saveOPD=(req,res)=>{
    const opd = req.body;
 
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
      db.query("INSERT INTO opdrecords SET?", opd, (err, result, field) => {
        if (err) throw err;
        res.send({ mes: "OPD Add Succesfully" },
      
        );
      });
    })
  
  }

    

    // exports.getConsultantBydept=(req, res) => {
    //   // console.log(req)
    //   const serviceName = req.body.servicename;
    //  db.query(  `SELECT * FROM servicegroup Where servicename = ?`, [serviceName], (err, result)=>{
    //   if (err) throw err;
    //   else{
    //     const serviceGroup_id = result[0].id
     
    //     db.query(`SELECT * FROM service where serviceGroup_id = ? ` ,[serviceGroup_id] , (err, result, field) => {
    //       if (err) throw err;
    //       else{
    //         res.send({ message: "Room Add Succesfully" ,data:result});
    //       }
    //     });
    //   }
    //  })  }
  


    // exports.getConsultant=(req, res) => {
    //   let qrr = `SELECT * FROM consultant `;
    //   db.query(qrr, (err, result, field) => {
    //     if (err) throw err;
    //     if(result.length >0){
    //       res.send({
    //         message: "All consultant  data",
    //         data: result,
    //       });
    //     }
    //   });
    // };
    

  