const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const path = require("path")
const multer = require("multer")
const fs = require("fs");
const { getRandomValues } = require("crypto")

const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "resource"
})




console.log("test")



const currentTimestamp = Date.now();
const randomFileId = Math.floor(Math.random() * 10000);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/media')
    },
    filename: (req, file, cb) => {
        cb(null, `${currentTimestamp}-${randomFileId}-${file.originalname}`)
    }
})

const upload = multer({ storage })


const app = express();

app.use(express.static('public'))

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))



DB.connect((err) => {
    if (err) throw err
    console.log("Connected to database");
    // get data
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM assets"
        DB.query(sql, (err, result) => {
            if (err) throw err;
            const assets = JSON.parse(JSON.stringify(result));
            module.exports = assets;
            // render data
            res.render("index", {assets: assets, title: ""});
        })
    })        
    
         
    app.get("/upload-media", (req, res) => {
        const sql = "SELECT * FROM assets"
        DB.query(sql, (err, result) => {
            if (err) throw err;
            const assets = JSON.parse(JSON.stringify(result));
            // render data
            return res.render("upload", {assets: assets, title: "Upload Media"});
        })
    })        

    

    // insert data
    app.post("/postMedia", upload.single('inputSumber'), (req, res) => {
        const insertSQL = `INSERT INTO assets (judul, sumber, size) VALUES ('${req.body.inputJudul}', '/media/${currentTimestamp}-${randomFileId}-${req.file.originalname}', ${req.file.size})`
        DB.query(insertSQL, (err, result) => {
            if (err) throw err
            res.redirect("/upload-media")
        })
        console.log(req.file)
        console.log(req.body)

    })
})
// Download file endpoint



    app.post("/download", (req, res) => {
        const selectSumber = `SELECT sumber FROM assets WHERE id = ${req.body.idVideo};`
        DB.query(selectSumber, (err, result) => {
            if (err) throw err;
            console.log(result[0].sumber)
            res.download(path.join(__dirname, "public", result[0].sumber), (err) => {
                if (err) {
                    console.error("Error downloading file:", err);
                    res.status(500).send("Error downloading file");
                }
            });
        });
    });



// Search data using wildcard
app.get("/search", (req, res) => {
    const searchValue = req.query.searchValue || '';
    const sql = `SELECT * FROM assets WHERE judul LIKE ?`;
    DB.query(sql, [`%${searchValue}%`], (err, result) => {
        if (err) throw err;
        const assets = JSON.parse(JSON.stringify(result));
        res.render("index", {assets: assets, title: `Search Results for "${searchValue}"`});
        // Render the search results
    });
});


// Delete data
app.post("/deleteMedia", (req, res) => {
    const delId = req.body.delId;
    if (!delId) {
        return res.status(400).send("Invalid or missing 'delId'");
    }
    
    const selectSQL = `SELECT sumber FROM assets WHERE id = ?;`;
    DB.query(selectSQL, [delId], (err, result) => {
        if (err) throw err;
    
        if (result.length === 0) {
            return res.status(404).send("No record found with the given 'delId'");
        }
    
        const filePath = path.join(__dirname, "public", result[0].sumber); // Get file path
        fs.unlink(filePath, (fsErr) => { // Delete file
            if (fsErr) {
                console.error("Error deleting file:", fsErr);
                return res.status(500).send("Error deleting file");
            }
    
            const deleteSQL = `DELETE FROM assets WHERE id = ?;`;
            DB.query(deleteSQL, [delId], (dbErr, dbResult) => {
                if (dbErr) throw dbErr;
                console.log("Data and file deleted successfully");
                res.redirect("/upload-media");
            });
        });
    });
});

app.listen(8008, () => {
    console.log("Server is running on port 8008");
})


// Serve the content.js file
// Export the database connection
module.exports = DB; 