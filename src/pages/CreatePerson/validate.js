import {
    createValidator,
    composeValidators,
    combineValidators,
    hasLengthGreaterThan,
} from 'revalidate'

import validators from '../../utilities/validators'

export default combineValidators({
    firstName: validators.isRequired,
    lastName: validators.isRequired,
    email: validators.email,
    'associatedLocations[]': validators.location,
})
