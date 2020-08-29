module.exports = (sequelize,Sequelize)=>{
    const Client = sequelize.define("clients",{

        user_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        Client_ac_No: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },

        Client_Name:{
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },

        Advisor_Code: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Address1: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Address2: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Address3: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Town: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Country: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Email:{
            type:Sequelize.STRING,
            validate:{
                notEmpty:true,
                isEmail: true,
                len:[5-20]
            }
        },

        Telephone: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },

        Mobile: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Registered_Date:{
            type:Sequelize.DATE
        },
        Custodial_Accounts:{
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Client_Margin_Provider:{
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },
        Last_Trade_Date:{
            type:Sequelize.STRING,
            validate:{
                notEmpty:true
            }
        },

        Portfolio_Balance: {
            type:Sequelize.FLOAT,
            validate:{
                notEmpty:true
            }
        },

        Account_Balance:{
            type: Sequelize.FLOAT,
            validate:{
                notEmpty: true
            }
        }
    },{ timestamps: true });

    return Client;
}
