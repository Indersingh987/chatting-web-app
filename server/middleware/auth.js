import jwt from 'jsonwebtoken'
import isEmpty from 'is-empty'

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if(isEmpty(token)) return res.status(403)

        if( token !== null){
            const decode = await jwt.verify(token,process.env.JWT_SECRET)
            req.userId = decode.id
            next()      
        }else{
            return res.status(403)
        }
        

    } catch (error) {
        console.log(error.message)
    }
}

export default auth