const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/Database.js");
const userMiddleware = require("../middleware/UserModel.js");
var md5 = require("md5");
const fileUpload = require("express-fileupload");
const _ = require("lodash");
const mime = require("mime-types");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/getAttendance", (req, res, next) => {
  db.query(
    `SELECT s.attendance_id  
  ,s.staff_id
  ,s.leave_time
  ,s.creation_date
  ,s.modification_date 
  ,s.notes
  ,s.record_date
  ,s.on_leave
  ,s.time_in 
  ,s.over_time 
  ,s.due_time 
  ,s.description
  ,s.type_of_leave 
  ,s.created_by
  ,s.modified_by 
  ,s.task 
  ,s.latitude
  ,s.longitude 
  ,s.task_pending
  ,s.task_progress
  ,s.task_complete 
  FROM attendance s
  LEFT JOIN staff b ON (b.staff_id = s.staff_id)
  WHERE s.attendance_id!=''`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.get("/getStaff", (req, res, next) => {
  db.query(
    `SELECT s.staff_id
    ,s.name
    ,a.time_in
    ,a.task_pending
    ,a.task_progress
    ,a.task_complete 
    ,a.attendance_id
    FROM staff s 
    LEFT JOIN (attendance a) ON (a.staff_id = s.staff_id)
    WHERE s.staff_id!='' ORDER BY s.name ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/getAttendanceById", (req, res, next) => {
  db.query(
    `SELECT s.attendance_id  
    ,s.staff_id
    ,s.leave_time
    ,s.creation_date
    ,s.modification_date 
    ,s.notes
    ,s.record_date
    ,s.on_leave
    ,s.time_in 
    ,s.over_time 
    ,s.due_time 
    ,s.description
    ,s.type_of_leave 
    ,s.created_by
    ,s.modified_by 
    ,s.task 
    ,s.latitude
    ,s.longitude 
    FROM attendance s
    LEFT JOIN staff b ON (b.staff_id = s.staff_id)
    WHERE s.attendance_id =${db.escape(req.body.attendance_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/editAttendance", (req, res, next) => {
  db.query(
    `UPDATE attendance
              SET staff_id=${db.escape(req.body.staff_id)}
              ,leave_time=${db.escape(req.body.leave_time)}
              ,creation_date=${db.escape(req.body.creation_date)}
              ,modification_date=${db.escape(new Date().toISOString().slice(0, 19).replace("T", " "))}
              ,notes=${db.escape(req.body.notes)}
              ,record_date=${db.escape(req.body.record_date)}
              ,on_leave=${db.escape(req.body.on_leave)}
              ,time_in=${db.escape(req.body.time_in)}
              ,over_time=${db.escape(req.body.over_time)}
              ,due_time=${db.escape(req.body.due_time)}
              ,description=${db.escape(req.body.description)}
              ,type_of_leave=${db.escape(req.body.type_of_leave)}
              ,created_by=${db.escape(req.body.created_by)}
              ,modified_by=${db.escape(req.body.modified_by)}
              ,task=${db.escape(req.body.description)}
              ,latitude=${db.escape(req.body.latitude)}
              ,longitude=${db.escape(req.body.longitude)}
              ,task_pending=${db.escape(req.body.task_pending)}
              ,task_progress=${db.escape(req.body.task_progress)}
              ,task_complete=${db.escape(req.body.task_complete)}
              WHERE attendance_id = ${db.escape(req.body.attendance_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/insertAttendance", (req, res, next) => {
  let data = {
    attendance_id: req.body.attendance_id,
    staff_id: req.body.staff_id,
    leave_time: req.body.leave_time,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    notes: req.body.notes,
    record_date:  new Date().toISOString(),
    on_leave: req.body.on_leave,
    time_in: new Date().toLocaleTimeString(),
    over_time: req.body.over_time,
    due_time: req.body.due_time,
    description: req.body.description,
    type_of_leave: req.body.type_of_leave,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    task: req.body.task,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    task_pending: req.body.task_pending,
    task_progress: req.body.task_progress,
    task_complete: req.body.task_complete
  };
  let sql = "INSERT INTO attendance SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Attendance has been created successfully",
      });
    }
  });
});

                

module.exports = app;
