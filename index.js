import express from 'express'
import connectDB from './config/DB.js'
import authRoutes from './routes/auth.routes.js'
import fileRoutes from './routes/file.routes.js'
import mailRoutes from './routes/mail.routes.js'

connectDB()

const app = express()
const PORT = 5000
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/files", fileRoutes)
app.use("/api/mails", mailRoutes)

app.get('/', (req, res)=>{
    res.send("Cold Mailer API is running")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`)
})

