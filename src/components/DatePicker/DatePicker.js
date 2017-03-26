import React from 'react'
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames'
import moment from 'moment'

import { View } from '../'
import styles from './DatePicker.scss'

class DatePicker extends React.Component {
    static propTypes = {
        hasNoYear: React.PropTypes.bool,
        inline: React.PropTypes.bool,
    };
    static defaultProps = {
        inline: false,
        numberOfMonths: 1,
        hasNoYear: false,
    };

    constructor(props) {
        super(props)
        if (props.hasNoYear) {
            this.minDate = moment().startOf('year')
            this.maxDate = moment().endOf('year')
            this.isOutsideCurrentYear = date =>
                date.isBefore(this.minDate) || date.isAfter(this.maxDate)
        }
        this.state = { focused: false }
    }

    handleOnFocusChange = ({ focused }) => this.setState({ focused });

    handleOnChange = date => this.props.onChange(date.toISOString());

    render() {
        const { focused } = this.state
        const {
            inline,
            hasNoYear,
            name,
            monthFormat,
            displayFormat,
            isOutsideRange,
            value,
            ...props
        } = this.props

        delete props.onChange
        delete props.onBlur
        delete props.onDragStart
        delete props.onDrop
        delete props.onFocus

        return (
            <View className={classNames(inline || styles.block)}>
                <SingleDatePicker
                    id={name}
                    focused={focused}
                    date={value ? moment(value) : null}
                    onDateChange={this.handleOnChange}
                    displayFormat={hasNoYear ? 'MM/DD' : displayFormat}
                    monthFormat={hasNoYear ? 'MMMM' : monthFormat}
                    onFocusChange={this.handleOnFocusChange}
                    isOutsideRange={
                        isOutsideRange || hasNoYear ? this.isOutsideCurrentYear : undefined
                    }
                    {...props}
                />
            </View>
        )
    }
}

export default DatePicker
