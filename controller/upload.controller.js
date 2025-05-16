const upload = require("../helper/uploader");
const util = require("util");
const db = require("../config/Database.js");
const uniqid = require("uniqid");
const fs = require("fs");
const baseUrl = "http://43.228.126.245/united-ecomm-api/storage/uploads/";
const path = require("path");
const directoryPath = path.join(__dirname, "../storage/uploads/");


exports.index = (req, res) => {
  return res.render("index", { message: req.flash() });
};

exports.uploadSingle = (req, res) => {
  if (req.file) {
    console.log(req.file);

    req.flash("success", "File Uploaded.");
  }
  return res.redirect("/");
};

exports.uploadFile = (req, res) => {
//     console.log('file',req.file)
//   if (req.file === undefined) {
//     return res.status(400).send({ data:req.file,message: "Please upload a file..." });
//   }

//   if (req.file) {

try{
    let data = {
      creation_date: new Date(),
      media_type: "attachment",
      actual_file_name: req.file.originalname,
      display_title: req.file.originalname,
      file_name: req.file.filename,
      content_type: "attachment",
      media_size: req.file.size,
      room_name: req.body.room_name,
      record_type: "attachment",
      alt_tag_data: req.body.alt_tag_data,
      external_link: "",
      caption: "",
      record_id: req.body.record_id,
      modification_date: new Date(),
      description: req.body.description,
    };

    let sql = "INSERT INTO media SET ?";

    let query = db.query(sql, data, (err, result) => {
      if (err) {
        res.status(400).send({ message: err });
      } else {
        res
          .status(200)
          .send({
              file:req.file,data:req.body,
            message:
              "Uploaded the file successfully : " + req.file.originalname,
          });
      }
    });}
    catch(err){
          res.status(401).send({ file:req.file,data:req.body,message: err });
    }
//   }
};

exports.updateFile = (req, res) => {
  try {
    const data = {
      actual_file_name: req.file.originalname,
      file_name: req.file.filename,
      alt_tag_data: req.body.alt_tag_data,
      room_name: req.body.room_name,
      record_id: req.body.record_id,
      description: req.body.description,
    };

    const sql = `
      UPDATE media
      SET
        actual_file_name = ${db.escape(data.actual_file_name)},
        file_name = ${db.escape(data.file_name)},
        alt_tag_data = ${db.escape(data.alt_tag_data)},
        room_name = ${db.escape(data.room_name)},
        description = ${db.escape(data.description)}
      WHERE record_id = ${db.escape(data.record_id)} AND room_name = 'profile'
    `;

    db.query(sql, (err, result) => {
      if (err) {
        res.status(400).send({ message: err });
      } else {
        res.status(200).send({ message: "File updated successfully" });
      }
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

exports.getFileList = (req, res) => {
  let data = { record_id: req.body.record_id };
  let sql = "SELECT file_name,media_id FROM media WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    // const fileName = result[0].file_name;
    // const filePath = path.resolve(directoryPath + result[0].file_name);
    // console.log("fileName : ",fileName);
    // console.log("filePath : ",filePath);
    if (err) {
      res.status(400).send({
        message: err,
      });
    } else {
      res.status(200).send({
        data: result,
        message: "Success",
      });
    }
  });
  // fs.readdir("/www/wwwroot/43.228.126.245/smartco-api/storage/uploads/", function (err, files) {
  //     if (err) {
  //       res.status(500).send({
  //         message: err,
  //       });
  //     }

  //     let fileInfos = [];

  //     files.forEach((file) => {
  //       fileInfos.push({
  //         name: file,
  //         url: baseUrl + file,
  //       });
  //     });

  //     res.status(200).send(fileInfos);
  //   });
};

exports.getFile = (req, res) => {
  const fileName = req.params.name;
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

exports.removeFile = (req, res) => {
  let data = { media_id: req.body.media_id };
  let select_sql = "SELECT file_name FROM media WHERE ?";
  let query = db.query(select_sql, data, (err, result) => {
    const filePath = "storage/uploads/" + result[0].file_name;

    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(400).send({
          message: "Could not delete the file. " + err,
        });
      } else {
        let delete_sql = "DELETE FROM media WHERE ?";
        let query = db.query(delete_sql, data, (err, result) => {
          if (err) {
            console.log("error: ", err);
            return;
          }
        });
        res.status(200).send({
          message: "File is deleted.",
        });
      }
    });
  });
};

exports.removeFilesByRoomRecord = (req, res) => {
  
  let select_sql = `SELECT * FROM media WHERE room_name=${db.escape(req.body.room_name)} AND record_id=${db.escape(req.body.record_id)}`;
  let query = db.query(select_sql,(err, result) => {

    if(result.length > 0){
        
         let delete_sql = `DELETE FROM media WHERE room_name=${db.escape(req.body.room_name)} AND record_id=${db.escape(req.body.record_id)}`;
          let query = db.query(delete_sql, (err, result) => {
            if (err) {
              res.status(400).send({
                message: "File is deleted.",
                });
            }else{
                 res.status(200).send({
                    message:'File is deleted',
                  });
            }
          });
         
       
    }else{
        res.status(200).send({
            message: "File is deleted.",
          });
    }
  });
};

exports.uploadMultiple = (req, res) => {
  if (req.files.length) {
    var arrayData = [];
    req.files.forEach((f) => {
      let data = {
        creation_date: new Date(),
        media_type: "attachment",
        actual_file_name: f.originalname,
        display_title: f.originalname,
        file_name: f.filename,
        content_type: "attachment",
        media_size: f.size,
        room_name: req.body.room_name,
        record_type: "attachment",
        alt_tag_data: req.body.alt_tag_data,
        external_link: "",
        caption: "",
        record_id: req.body.record_id,
        modification_date: new Date(),
        description: req.body.description,
      };
      arrayData.push(data);
    });
    arrayData.forEach((data) => {
      db.query("INSERT INTO media SET ?", data, (err, result) => {
        if (err) {
          return res.status(400).send({ message: err });
        }
      });
    });
    return res.status(200).send({ message: "success" });
  }
}; 


exports.uploadMultipleFile = (req, res) => {
  if (req.files.length) {
    var arrayData = [];
    req.files.forEach((f) => {
      let data = {
        creation_date: new Date(),
        media_type: "attachment",
        actual_file_name: f.originalname,
        display_title: f.originalname,
        file_name: f.filename,
        content_type: "attachment",
        media_size: f.size,
        room_name: req.body.room_name,
        record_type: "attachment",
        alt_tag_data: req.body.alt_tag_data,
        external_link: "",
        caption: "",
        record_id: req.body.record_id,
        modification_date: new Date(),
        description: req.body.description,
      };
      arrayData.push(data);
    });

    // Delete existing records with the same contact ID
    db.query("SELECT file_name FROM media WHERE record_id = ?", req.body.record_id, (err, result) => {
      if (err) {
        return res.status(400).send({ message: err });
      }

      // Delete old image files
      result.forEach((record) => {
        const filePath = path.join(directoryPath, record.file_name);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      });

      // Delete existing records with the same contact ID
      db.query("DELETE FROM media WHERE record_id = ?", req.body.record_id, (err, result) => {
        if (err) {
          return res.status(400).send({ message: err });
        }

        // Insert new records
        db.query(
          "INSERT INTO media (creation_date, media_type, actual_file_name, display_title, file_name, content_type, media_size, room_name, record_type, alt_tag_data, external_link, caption, record_id, modification_date, description) VALUES ?",
          [arrayData.map(Object.values)],
          (err, result) => {
            if (err) {
              return res.status(400).send({ message: err });
            }
            return res.status(200).send({ message: "success" });
          }
        );
      });
    });
  }
};

exports.getFilesByRecordIdAndRoomName = (req, res) => {
  let query = db.query(
    `SELECT * FROM media WHERE record_id = ${db.escape(
      req.body.record_id
    )} AND room_name = ${db.escape(req.body.room_name)}`,
    (err, result) => {
      let fileInfos = [];
      {
        result
          ? result.map((resu) => {
              const fileName = resu.file_name;
              console.log("fileName : ", fileName);
              const filePath = path.resolve(directoryPath + resu.file_name);
              console.log("filePath : ", filePath);
              fileInfos.push({
                name: fileName,
                url: filePath,
                media_id: resu.media_id,
              });
              fs.readdir(filePath, function (err, files) {});
            })
          : res.status(500).send({
              message: "Could not find the file. ",
            });
      }
      console.log("fileInfos : ", fileInfos);
      res.status(200).send(fileInfos);
    }
  );
};


exports.updateMedia = (req, res) => {
  const { moduleId } = req.params;
  const { altTagData, fileName } = req.body;
  const file = req.file;

  db.query(
    'SELECT file_name FROM media WHERE record_id = ?',
    [moduleId],
    (err, rows) => {
      if (err) {
        console.error('Error retrieving old file name:', err);
        return res.status(500).send({ message: 'Error updating the media' });
      }

      const oldFileName = rows[0].file_name;
      const oldFilePath = path.join(directoryPath, oldFileName);

      // Delete the old file
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error('Error deleting old file:', err);
          return res.status(500).send({ message: 'Error updating the media' });
        }

        if (!file) {
          // If no new file is provided, only update the altTagData and file_name fields
          db.query(
            'UPDATE media SET alt_tag_data = ?, file_name = ? WHERE record_id = ?',
            [altTagData, fileName, moduleId],
            (err, result) => {
              if (err) {
                console.error('Error updating the media:', err);
                return res.status(500).send({ message: 'Error updating the media' });
              }

              return res.status(200).send({ message: 'Media updated successfully' });
            }
          );
        } else {
          const updatedFileName = uniqid() + '_' + file.originalname; // Generate a unique file name
          const updatedFilePath = path.join(directoryPath, updatedFileName);

          // Copy the updated image file to the same location as the old file
          fs.copyFile(file.path, oldFilePath, (err) => {
            if (err) {
              console.error('Error copying updated file:', err);
              return res.status(500).send({ message: 'Error updating the media' });
            }

            // Update the media table with the new file name
            db.query(
              'UPDATE media SET alt_tag_data = ?, file_name = ? WHERE record_id = ?',
              [altTagData, updatedFileName, moduleId],
              (err, result) => {
                if (err) {
                  console.error('Error updating the media:', err);
                  return res.status(500).send({ message: 'Error updating the media' });
                }

                // Construct the URL for the updated image
                const updatedImageUrl = baseUrl + updatedFileName;

                return res.status(200).send({ message: 'Media updated successfully', imageUrl: updatedImageUrl });
              }
            );
          });
        }
      });
    }
  );
};


exports.uploadSingleV2 = async (req, res) => {
  const uploadFile = util.promisify(upload.single("file"));
  try {
    await uploadFile(req, res);
    console.log(req.file);

    req.flash("success", "File Uploaded.");
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/");
};
