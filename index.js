const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const Route = require('./src/Routes/routes');
const db = require('./src/Models/index')
app.use(cors());
app.use(bodyparser.json());
app.use(Route)


// Connect MySql Database



// //Post department
app.post("/department", (req, res) => {
  const saleData = req.body;
  db.query("INSERT INTO department SET?", saleData, (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Department Add Succesfully" });
  });
});

//Get All department
app.get("/department", (req, res) => {
  let qrr = `SELECT * FROM department `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
    if(result.length >0){
      res.send({
        message: "All Department data",
        data: result,
      });
    }
  });
});
app.put("/updatedepartment/:id", (req, res) => {
  const department = req.body;
  db.query(`UPDATE department SET name="${department.name}" where id = ${req.params.id}` , (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Department Update Succesfully" });
  });
});



app.post("/designation", (req, res) => {
  const designation = req.body;
  db.query("INSERT INTO designation SET?", designation, (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Designation Add Succesfully" });
  });
});

app.put("/updatedesignation/:id", (req, res) => {
  const department = req.body;
  db.query(`UPDATE designation SET designation="${department.designation}" where id = ${req.params.id}` , (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Designation Update Succesfully" });
  });
});
//Get All department
app.get("/designation", (req, res) => {
  let qrr = `SELECT * FROM designation `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
    if(result.length >0){
      res.send({
        message: "All Designation data",
        data: result,
      });
    }
  });
});


app.post("/specialization", (req, res) => {
  const specialization = req.body;
  db.query("INSERT INTO specialization SET?", specialization, (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Specialization Add Succesfully" });
  });
});
app.put("/updatespecialization/:id", (req, res) => {
  const specialization = req.body;
  db.query(`UPDATE specialization SET specialization="${specialization.specialization}" where id = ${req.params.id}` , (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Specialization Update Succesfully" });
  });
});
//Get All department
app.get("/specialization", (req, res) => {
  let qrr = `SELECT * FROM specialization `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
    if(result.length >0){
      res.send({
        message: "All Designation data",
        data: result,
      });
    }
  });
});

app.post("/ward", (req, res) => {
  const ward = req.body;
  db.query("INSERT INTO ward SET?", ward, (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Ward Add Succesfully" });
  });
});

app.put("/updateward/:id", (req, res) => {
  const ward = req.body;
  db.query(`UPDATE ward SET ward="${ward.ward}" where id = ${req.params.id}` , (err, result, field) => {
    if (err) throw err;
    res.send({ message: "ward Update Succesfully" });
  });
});
//Get All department
app.get("/ward", (req, res) => {
  let qrr = `SELECT * FROM ward `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
    if(result.length >0){
      res.send({
        message: "All Ward data",
        data: result,
      });
    }
  });
});

app.post("/room", (req, res) => {
  const room = req.body;
 const wardName= room.ward
 db.query(  `SELECT * FROM ward Where ward = ?`, [wardName], (err, result)=>{
  if (err) throw err;
  else{
    // room.ward_id = res[0].id
    const newData = {
      ward_id: result[0].id,
      room: room.room,
      status: room.status 
    }
    db.query("INSERT INTO room SET?",newData , (err, result, field) => {
      if (err) throw err;
      else{
        res.send({ message: "Room Add Succesfully" });
      }
    });
  }
 })
  
});



app.put("/updateroom/:id", (req, res) => {
  const room = req.body;
  db.query(`UPDATE room SET room="${room.room}" where id = ${req.params.id}` , (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Room Update Succesfully" });
  });
});

app.post("/getroom", (req, res) => {
  // console.log(req)
  const wardName = req.body.ward;
  console.log(req.body)
 db.query(  `SELECT * FROM ward Where ward = ?`, [wardName], (err, result)=>{
  if (err) throw err;
  else{
    const ward_id = result[0].id
 
    db.query(`SELECT * FROM room where ward_id = ? ` ,[ward_id] , (err, result, field) => {
      if (err) throw err;
      else{
        res.send({ message: "Room Add Succesfully" ,data:result});
      }
    });
  }
 })  
});


// Service Gruop
app.post("/servicegroup", (req, res) => {
  const Servicegroup = req.body;
  db.query("INSERT INTO servicegroup SET?", Servicegroup, (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Service Group Add Succesfully" });
  });
});


app.put("/updateServiceGroup/:id", (req, res) => {
  const servicegroup = req.body;
  db.query(`UPDATE servicegroup SET servicename ="${servicegroup.servicename}" ,servicetype ="${servicegroup.servicetype}"  where id = ${req.params.id}` , (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Room Update Succesfully" });
  });
});

//Get All department
app.get("/servicegroup", (req, res) => {
  let qrr = `SELECT * FROM servicegroup `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
    if(result.length >0){
      res.send({
        message: "All Service Group data",
        data: result,
      });
    }
  });
});

app.post("/service", (req, res) => {
  const service = req.body;
 const sG_id= service.servicename
 db.query(  `SELECT * FROM servicegroup Where servicename = ?`, [sG_id], (err, result)=>{
  if (err) throw err;
  else{
    // room.ward_id = res[0].id
    const newData = {
      serviceGroup_id: result[0].id,
      sName: service.sName,
      sCharge: service.sCharge 
    }
    db.query("INSERT INTO service SET?",newData , (err, result, field) => {
      if (err) throw err;
      else{
        res.send({ message: "Service Add Succesfully" });
      }
    });
  }
 })
  
});

app.put("/updateService/:id", (req, res) => {
  const service = req.body;
  db.query(`UPDATE service SET sName ="${service.sName}" ,sCharge ="${service.sCharge}"  where id = ${req.params.id}` , (err, result, field) => {
    if (err) throw err;
    res.send({ message: "Service Update Succesfully" });
  });
});

app.post("/getService", (req, res) => {
  // console.log(req)
  const serviceName = req.body.servicename;
 db.query(  `SELECT * FROM servicegroup Where servicename = ?`, [serviceName], (err, result)=>{
  if (err) throw err;
  else{
    const serviceGroup_id = result[0].id
 
    db.query(`SELECT * FROM service where serviceGroup_id = ? ` ,[serviceGroup_id] , (err, result, field) => {
      if (err) throw err;
      else{
        res.send({ message: "Room Add Succesfully" ,data:result});
      }
    });
  }
 })  
});

// app.post("/hospitaldetails", (req, res) => {
//   const hospitalDetails = req.body;
//   db.query("INSERT INTO hospitaldetails SET?", hospitalDetails, (err, result, field) => {
//     if (err) throw err;
//     res.send({ message: "Ward Add Succesfully" });
//   });
// });

//Get All department
app.get("/hospitaldetails", (req, res) => {
  let qrr = `SELECT * FROM hospitaldetails `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
    if(result.length >0){
      res.send({
        message: "All Ward data",
        data: result,
      });
    }
  });
});


// delete 


app.delete("/department/:id", (req, res) => {
  console.log(req.params)
  let qrr = `DELETE  FROM department where id = ${req.params.id} `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
  else{
    res.send({message : "delete"})
  }
  });
});


app.delete("/designation/:id", (req, res) => {
  console.log(req.params)
  let qrr = `DELETE  FROM designation where id = ${req.params.id} `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
  else{
    res.send({message : "delete"})
  }
  });
});


app.delete("/specialization/:id", (req, res) => {
  console.log(req.params)
  let qrr = `DELETE  FROM specialization where id = ${req.params.id} `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
  else{
    res.send({message : "delete"})
  }
  });
});

app.get("/consultant", (req, res) => {
  let qrr = `SELECT * FROM consultant `;
  db.query(qrr, (err, result, field) => {
    if (err) throw err;
    if(result.length >0){
      res.send({
        message: "All consultant data",
        data: result,
      });
    }
  });
});

app.post("/consultantByDept", (req, res) => {

  const department = req.body.Department;
    db.query(`SELECT * FROM consultant where Department = ? ` ,[department] , (err, result, field) => {
      if (err) throw err;
      else{
        res.send({ message: "consultant Data" ,data:result});
      }
    });
});



app.listen(3000, () => {
  console.log("Server is Running on 3000 port");
}); 

