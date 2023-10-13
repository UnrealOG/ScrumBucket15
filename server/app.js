import express, { urlencoded } from 'express';
const  app=express();
import cors from 'cors';
// import validation from './validation.js'
import configRoutes from './routes/index.js'
import connection from './config/mongoConnection.js'
import session from 'express-session'

async function main() {
    const db = await connection.dbConnection();
}
app.use(cors())

// app.use(function(req,res,next) {
//     res.header('Access-Control-Allow-Origin',"*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//middleware
app.use(            //authentication middleware
    session({
        name:'AuthCookie',
        secret: "There's nothing important here 🤓",
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1800000}
    })
)

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

configRoutes(app);

app.listen(4000, () => {
    console.log("Express server running on http://localhost:4000")
})

main()