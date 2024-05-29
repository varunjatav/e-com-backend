import mongoose  from 'mongoose';
const DBconnection = () => {
    try {
        const data = mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database connected!'));
       
    } catch (error) {
        console.error('Database connection error:', err)
    }

   
}
export default DBconnection