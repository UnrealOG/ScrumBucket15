import baseRoutes from './baseRoutes.js'
import userRoutes from './userRoutes.js'

const constructorMethod = (app) => {
    app.use('/',baseRoutes);
    app.use('/api/users', userRoutes);
    app.use('*',(req,res) => {
        res.status(404).json({error: "Not Found!"})
    })
}

export default constructorMethod;