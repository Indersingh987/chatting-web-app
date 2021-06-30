import jwt from 'jsonwebtoken'

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization
        
        if(token){
            const decode = await jwt.verify(token,"jwtSecret")
            console.log(decode)
            req.userId = decode.id
        }
        next()       

    } catch (error) {
        console.log(error.message)
    }
}

export default auth