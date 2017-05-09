// @flow
import moment from 'moment'
import React from 'react'

import { toMoment } from '../../utilities/datetime'

// simple wrapper to make it easier to support i18n later on
const currentYear = moment().year()
const FormattedDate = ({
    format,
    date,
    showYear,
    ...props
}: {
    format?: string,
    date: string,
    showYear?: boolean,
}) => {
    const momentObj = toMoment(date)
    return (
        <span {...props}>
            {momentObj.format(
                (() => {
                    if (format) return format
                    const shouldShowYear = showYear || currentYear !== momentObj.year()
                    if (shouldShowYear) {
                        return "MMM Do, 'YY"
                    }
                    return 'MMM Do'
                })(),
            )}
        </span>
    )
}

FormattedDate.defaultProps = {
    showYear: false,
    format: '',
}

export default FormattedDate
