require("dotenv").config();
exports.connect = ()=>{
    try {
        const mangoose =require("mongoose")
        mangoose.connect(`mongodb+srv://m001-student:${process.env.MONGO_PASS}@cluster0.yj2ao.mongodb.net/reset-password?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true})
        // mangoose.set('useFindandModify',false)
        mangoose.connection.once("open",()=>{console.log("connected")})
        .on("error",error =>{
            console.log("Your Error",error)
        })
      
        
    } catch (error) {
        console.log(error)
        process.exit()
        
    }
}