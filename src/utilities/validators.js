import {
    createValidator,
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan,
} from 'revalidate'

const email = composeValidators(
    isRequired,
    createValidator(
        message => value => (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? message : false
        ),
        field => `this ${field} is not a valid format`,
    ),
)('email')

const addressLine1 = composeValidators(isRequired, hasLengthGreaterThan(3))(
    'address line 1',
)

const zipCode = composeValidators(
    isRequired,
    createValidator(
        message => value => (
            !/^\d{5}(?:[-\s]\d{4})?$/i.test(value) ? message : false
        ),
        field => `this ${field} is not a valid format`,
    ),
)('zip code')

const address = (parentName = 'address') =>
    combineValidators({
        [`${parentName}.addressLine1`]: addressLine1,
        [`${parentName}.zipCode`]: zipCode,
        [`${parentName}.state`]: isRequired('state'),
    })

export default {
    address,
    zipCode,
    addressLine1,
    email,
}
