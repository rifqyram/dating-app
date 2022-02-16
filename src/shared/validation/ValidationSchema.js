import * as yup from 'yup';
import {differenceInYears} from "date-fns";

class ValidationSchema {

    authValidation = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(6, 'Password should be of minimum 6 character')
            .required('Password is required')
    })

    updateProfileValidation = yup.object({
        name: yup
            .string('Enter your name')
            .required('Name is required'),
        mobilePhone: yup
            .number('Enter your mobile phone')
            .required('Mobile phone is required'),
        address: yup
            .string('Enter your address'),
        city: yup
            .string('Enter your city')
            .required('City is required'),
        bio: yup
            .string('Enter your bio')
            .required('Bio is required'),
        bod: yup
            .date('Enter your birthdate')
            .test("bod", "Should be greater than 18", function (value) {
                return differenceInYears(new Date(), value) >= 18;
            })
            .required('Birthdate is required'),
    })

    profilePreferenceValidation = yup.object({
        domicileInterest: yup
            .string('Enter your domicile interest')
            .required('Domicile interest is required'),
        startAgeInterest: yup
            .number('Enter your start age interest')
            .min(18, 'Start age interest should be greater than 18')
            .max(40, 'Start age interest should be less than 40')
            .required('Start age interest is required'),
        endAgeInterest: yup
            .number('Enter your start age interest')
            .min(18, 'Start age interest should be greater than 18')
            .max(40, 'Start age interest should be less than 40')
            .required('Start age interest is required'),
    })
}

export default new ValidationSchema();