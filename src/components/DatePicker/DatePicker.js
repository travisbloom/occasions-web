// @flow
import React from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

import { View } from '../'
import './DatePicker.scss'

type Props = {
    hasNoYear: boolean,
    inline: boolean,
    numberOfMonths: number,
    onChange: (date: string) => void,
    name: string,
    monthFormat: string,
    displayFormat: string,
    isOutsideRange: boolean,
    value: string,
    onBlur: () => void,
    onDragStart: () => void,
    onDrop: () => void,
    onFocus: () => void,
}
class DatePicker extends React.Component {
    props: Props
    maxDate: moment
    minDate: moment
    isOutsideCurrentYear: (date: moment) => boolean
    state: {
        focused: boolean,
    }

    static defaultProps = {
        inline: false,
        numberOfMonths: 1,
        hasNoYear: false,
    }

    constructor(props: Props) {
        super(props)
        if (props.hasNoYear) {
            this.minDate = moment().startOf('year')
            this.maxDate = moment().endOf('year')
            this.isOutsideCurrentYear = date =>
                date.isBefore(this.minDate) || date.isAfter(this.maxDate)
        }
        this.state = { focused: false }
    }

    handleOnFocusChange = ({ focused }: { focused: boolean }) => this.setState({ focused })

    handleOnChange = (date: moment) => this.props.onChange(date.toISOString())

    render() {
        const { focused } = this.state
        const {
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
            <View>
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
