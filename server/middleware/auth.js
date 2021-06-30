import jwt from 'jsonwebtoken'

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        
        console.log(token)

        if(token){
            const decode = await jwt.verify(token,'test')
            console.log(decode)
            req.userId = decode.id
        }
        next()       

    } catch (error) {
        console.log(error.message)
    }
}

export default auth