import validator from "validator";
import isEmpty from "is-empty";

const validateRegisterData = (data) => {
    let errors = {}

    //converst empty field to string to use in validte function
    data.name = isEmpty(data.name) ? '':data.name
    data.email = isEmpty(data.email) ? '':data.email
    data.password = isEmpty(data.password) ? '':data.password
    data.password2 = isEmpty(data.password2) ? '':data.password2

    if(validator.isEmpty(data.name)){
        errors.name = 'Name is Requered'
    }

    if(validator.isEmpty(data.email)){
        errors.email = 'Email is Required'
    }else if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password is required'
    }

    if(validator.isEmpty(data.password2)){
        errors.password = 'Confirm Password is required'
    }

    if(!validator.isLength(data.password,{min:3,max:30})){
        errors.password = 'Password must be of atleast 3 characters'
    }

    if(!validator.equals(data.password,data.password2)){
        errors.password = 'Password must match'
    }

    return {
        errors:errors,
        isValid:isEmpty(errors)
    }
}

export default validateRegisterData