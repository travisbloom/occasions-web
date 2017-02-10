import moment from 'moment'
import React from 'react'

// simple wrapper to make it easier to support i18n later on
const FormattedDate = ({ format, date, showYear, ...props }) => (
    <span {...props}>
        {moment(date).format((() => {
            if (format) return format
            const shouldShowYear = showYear || moment().year() !== moment(date).year()
            if (shouldShowYear) {
                return 'MMM Do, \'YY'
            }
            return 'MMM Do'
        })())}
    </span>
    )

FormattedDate.propTypes = {
    format: React.PropTypes.string,
    date: React.PropTypes.string.isRequired,
    showYear: React.PropTypes.bool,
}

FormattedDate.defaultProps = {
    showYear: false,
    format: '',
}

export default FormattedDate
