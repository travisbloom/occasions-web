import { combineValidators } from 'revalidate'

import validators from '../../utilities/validators'

export default combineValidators({
    firstName: validators.isRequired('first name'),
    lastName: validators.isRequired('last name'),
    email: validators.email,
    birthdayDate: validators.isRequired('birthday date'),
    birthdayYear: validators.isRequired('birthday year'),
    'associatedLocations[]': validators.location,
})
