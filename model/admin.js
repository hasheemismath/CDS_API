module.exports = (sequelize,Sequelize)=>{
    const Admin = sequelize.define("admin",{

        user_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        password:{
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
                len:[5-10]
            }
        }
    },{ timestamps: true });

    return Admin;
}
