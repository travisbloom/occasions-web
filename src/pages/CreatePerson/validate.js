import { combineValidators } from 'revalidate'

import validators from '../../utilities/validators'

export default combineValidators({
    firstName: validators.isRequired('first name'),
    lastName: validators.isRequired('last name'),
    email: validators.email,
    birthday: validators.date('birthday'),
    'associatedLocations[]': validators.location,
})
