const pool = require('../db');

exports.auth=async (req,res,next)=>{
    const {cds} = req.params;
    // console.log(cds)
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
        // res.status(200).json({
        //     success:result.rows
        // });
        req.prof=cds;
        next();


    })

}