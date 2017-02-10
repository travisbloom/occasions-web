import React from 'react'

// simple wrapper to make it easier to support i18n later on
const FormattedNumber = ({ number, currency, ...props }) => (
    <span {...props}>
        {currency && '$'}{`${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    </span>
    )

FormattedNumber.propTypes = {
    number: React.PropTypes.number.isRequired,
    currency: React.PropTypes.bool,
}

FormattedNumber.defaultProps = {
    currency: false,
}

export default FormattedNumber
