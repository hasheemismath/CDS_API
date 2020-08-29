const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const cookieParser = require('cookie-parser')
const xlsxFile = require('read-excel-file/node');
const xlsx = require('node-xlsx')
// const pool = require('./db');
require('dotenv').config();
const {auth} =require('./middleware/auth')
const fs = require("fs");
const path = require('path');
const multer = require('multer');
const { sendEmail } = require('./utils/mails/index');
const csv = require("fast-csv");
app.use(express.json())
app.use(cookieParser())
global.__basedir = __dirname;
const db = require("./model");
const Client = db.client;



const fastcsv = require("fast-csv");



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


db.sequelize.sync({force:true}).then(()=>{
    console.log("Drop and resync Db");
})


//db.sequelize.sync();


// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

app.post('/test',(req,res)=>{

    let stream = fs.createReadStream('./Client Detailss.csv');
    let csvData = [];

    let csvStream = fastcsv
        .parse()
        .on("data", function(data) {
            csvData.push(data);

        })
        .on("end", function() {
            // remove the first line: header
            csvData.shift();


            console.log(JSON.stringify(req.body))

            let client = new Client(JSON.stringify(csvData[4]))
            client.save()
                .then(user => {
                    res.send({ message: "User was registered successfully!" ,user});

                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });

        });



    stream.pipe(csvStream);



})



const upload = multer({storage: storage});
app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
    importExcelData2sQL(__basedir + '/uploads/' + req.file.filename,req,res);
    // res.json({
    //     'msg': 'File uploaded/import successfully!', 'file': req.file
    // });
});



// app.post("/add",async (req,res)=>{
//     try{
//         const {password} = req.body;
//         const newAdmin = await pool.query("INSERT INTO admin (password) VALUES ($1) RETURNING *",[password])
//         res.json(newAdmin.rows[0]);
//     }catch (e) {
//         console.log(e.message)
//     }
// })

app.get("/get",async (req,res)=>{
    try{
        const allAdmin = await pool.query("SELECT * FROM admin")
        res.json(allAdmin.rows);
    }catch (e) {
        console.log(e.message)
    }
})

// app.get("/get/:id",async (req,res)=>{
//     const {id} = req.params
//     try{
//         const admin = await pool.query("SELECT * FROM admin where admin_id= $1",[id]);
//         res.json(admin.rows[0]);
//     }catch (e) {
//         console.log(e.message)
//     }
// })


app.post('/admin/signin',async (req,res)=>{
    const {password} = req.body;
    try{
        const admin = await pool.query("SELECT * FROM admin where admin_id =1");
        if(password!==admin.rows[0].password){
            return res.json({
                error:"Password not match"
            })
        }
        const token = jwt.sign({foo:'bar'},'secret');
        //put token in cookie
        res.cookie("token",token,{expire:new Date()+999})
        res.json({
            success:"Successfully sign in",
            token:token
        })
    }catch (e) {
        console.log(e.message)
    }
});

function importExcelData2sQL(filepath,req,res){
    xlsxFile(filepath).then((rows) => {
        // console.log(rows.length,rows[2].length);
        // console.table(rows);
        try{

            for (let i=0;i<rows.length-1;i++){

                console.log(rows[i+1][11])

                // let client = new Client({
                //     Client_ac_No : rows[i+1][0],
                //     Client_Name :rows[i+1][1],
                //     Advisor_Code :rows[i+1][2],
                //     Address1 :rows[i+1][3],
                //     Address2 :rows[i+1][4],
                //     Address3 :rows[i+1][5],
                //     Town :rows[i+1][6],
                //     Country :rows[i+1][7],
                //     Email :rows[i+1][8],
                //     Telephone :rows[i+1][9],
                //     Mobile :rows[i+1][10],
                //     Registered_Date :rows[i+1][11],
                //     Custodial_Accounts :rows[i+1][12],
                //     Client_Margin_Provider :rows[i+1][13],
                //     Last_Trade_Date :rows[i+1][14],
                //     Portfolio_Balance :rows[i+1][15],
                //     Account_Balance :rows[i+1][16]
                // })
                //
                // client.save()
                //     .then(user => {
                //         res.send({ message: "User was registered successfully!" ,user});
                //
                //     })
                //     .catch(err => {
                //         res.status(500).send({ message: err.message });
                //     });

                // pool.query("INSERT INTO client(Client_ac_No, Client_Name, Advisor_Code,Address1,Address2,Address3,Town,Country,Email,Telephone,Mobile,Registered_Date,Custodial_Accounts,Client_Margin_Provider,Last_Trade_Date,Portfolio_Balance,Account_Balance) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)", [rows[i+1][0],rows[i+1][1],rows[i+1][2],rows[i+1][3],rows[i+1][4],rows[i+1][5],rows[i+1][6],rows[i+1][7],rows[i+1][8],rows[i+1][9],rows[i+1][10],rows[i+1][11],rows[i+1][12],rows[i+1][13],rows[i+1][14],rows[i+1][15],rows[i+1][16]], function(err){
                //     if(err)
                //     {
                //         console.log(err);
                //     }
                // });
            }
        }catch (e) {
            console.log(e)
        }
    })
}

app.post('/admin/check',async(req,res)=>{

    // Cookies that have not been signed
    // console.log('Cookies: ', req.cookies)

    xlsxFile('./Client Details_test.xlsx').then((rows) => {
        // console.log(rows.length,rows[2].length);
        // console.table(rows);
        try{

            for (let i=0;i<rows.length-1;i++){
                 console.log(rows[i+1])

                pool.query("INSERT INTO client(Client_ac_No, Client_Name, Advisor_Code,Address1,Address2,Address3,Town,Country,Email,Telephone,Mobile,Registered_Date,Custodial_Accounts,Client_Margin_Provider,Last_Trade_Date,Portfolio_Balance,Account_Balance) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)", [rows[i+1][0],rows[i+1][1],rows[i+1][2],rows[i+1][3],rows[i+1][4],rows[i+1][5],rows[i+1][6],rows[i+1][7],rows[i+1][8],rows[i+1][9],rows[i+1][10],rows[i+1][11],rows[i+1][12],rows[i+1][13],rows[i+1][14],rows[i+1][15],rows[i+1][16]], function(err){
                            if(err)
                            {
                                console.log(err);
                            }
                        });
            }
        }catch (e) {
            console.log(e)
        }
        res.status(200).json({
            success: "File successfully uploaded"
        })
    })
        })


app.post('/user/check_cds',async (req,res)=>{
    const {cds} = req.body;
    await pool.query("SELECT * FROM client where Client_ac_No= $1",[cds],(error,result)=>{
        if(error){
            return res.json({
                error:"Error occured"
            })
        }
        if(result.rows.length===0 ){
            return res.json({
                error:"CDS Number Invalid, Please Check and Reenter!"
            })
        }
        if(!result.rows[0].mobile || !result.rows[0].email){
            return res.json({
                error:"Please get in touch with Support to Verify Your Information"
            })
        }

        // sendEmail(result.rows[0].email)
        res.status(200).json({
            success:result.rows
        });

    })

})


app.get('/user/sendOtp/:cds',auth,(req,res)=>{

    res.send(req.prof)

})



// app.get('/admin', (req, res) => res.send('server started'))


const portRunnner = process.env.PORT || 8000;
app.listen(portRunnner,()=>{
    console.log(`Server is up and running port: ${portRunnner}`)
})