import React from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

import { View } from '../'
import './DatePicker.scss'

class DatePicker extends React.Component {
    static propTypes = {
        hasNoYear: React.PropTypes.bool,
    };
    static defaultProps = {
        numberOfMonths: 1,
        hasNoYear: false,
    };

    constructor(props) {
        super(props)
        if (props.hasNoYear) {
            this.minDate = moment().startOf('year')
            this.maxDate = moment().endOf('year')
        }
        this.state = { focused: false }
    }

    handleOnFocusChange = ({ focused }) => this.setState({ focused });

    handleOnChange = date => this.props.onChange(date.toISOString());

    render() {
        const { focused } = this.state
        const {
            hasNoYear,
            minDate,
            maxDate,
            name,
            monthFormat,
            value,
            ...props
        } = this.props

        delete props.onChange

        return (
            <View>
                <SingleDatePicker
                    id={name}
                    name={name}
                    focused={focused}
                    date={value ? moment(value) : null}
                    onDateChange={this.handleOnChange}
                    monthFormat={hasNoYear ? 'MMMM' : monthFormat}
                    onFocusChange={this.handleOnFocusChange}
                    minDate={hasNoYear ? this.minDate : minDate}
                    maxDate={hasNoYear ? this.maxDate : maxDate}
                    {...props}
                />
            </View>
        )
    }
}

export default DatePicker
