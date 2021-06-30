import validator from "validator";
import isEmpty from "is-empty";

const validateLoginData = (data) => {
    let errors = {}

    data.email = isEmpty(data.email) ? '':data.email
    data.password = isEmpty(data.password) ? '':data.password

    if(validator.isEmpty(data.email)){
        errors.email = 'Email is Required'
    }else if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password is Required'
    }

    return {
        errors:errors,
        isValid:isEmpty(errors)
    }
}

export default validateLoginData