const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const path = require("path")
const multer = require("multer")
const DB = require('./connection')


const currentTimestamp = Date.now();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/media')
    },
    filename: (req, file, cb) => {
        cb(null, `${currentTimestamp}-${file.originalname}`)
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
        const insertSQL = `INSERT INTO assets (judul, sumber, size, id) VALUES ('${req.body.inputJudul}', '/media/${currentTimestamp}-${req.file.originalname}', ${req.file.size}, NULL)`
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


app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
// Serve the content.js file
// Export the database connection
module.exports = DB; 