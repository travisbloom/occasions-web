export default (values) => {
    const errors = {}
    if (!values.receivingPersonId) {
        errors.receivingPersonId = 'You must select a person to associate with this event.'
    }
    if (!values.eventId) {
        errors.eventId = 'You must select an event'
    }
    return errors
}
