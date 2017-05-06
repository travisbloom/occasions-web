// @flow
import moment from 'moment'
import React from 'react'

// simple wrapper to make it easier to support i18n later on
const FormattedDate = ({
    format,
    date,
    showYear,
    ...props
}: {
    format?: string,
    date: string,
    showYear?: boolean,
}) => (
    <span {...props}>
        {moment(date).format(
            (() => {
                if (format) return format
                const shouldShowYear = showYear || moment().year() !== moment(date).year()
                if (shouldShowYear) {
                    return "MMM Do, 'YY"
                }
                return 'MMM Do'
            })(),
        )}
    </span>
)

FormattedDate.defaultProps = {
    showYear: false,
    format: '',
}

export default FormattedDate
