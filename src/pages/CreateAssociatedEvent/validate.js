import { combineValidators } from 'revalidate'

import validators from '../../utilities/validators'

export default combineValidators({
    receivingPersonId: validators.isRequired('A contact'),
    event: combineValidators({
        name: validators.isRequired('Event name'),
        eventTypes: validators.isNotEmptyArray('event type'),
        nextDate: combineValidators({
            dateStart: validators.isRequired('Event date'),
        }),
    }),
})
