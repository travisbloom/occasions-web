import moment from 'moment'
import React from 'react'

// simple wrapper to make it easier to support i18n later on
const FormattedDate = ({ format, date, ...props }) => (
    <span {...props}>{moment(date).format(format)}</span>
)

FormattedDate.propTypes = {
    format: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
}

export default FormattedDate
