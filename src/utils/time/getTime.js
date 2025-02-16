import {
    format,
    formatDistance,
    formatRelative,
    subDays,
} from 'date-fns'

const getTime = (date, format = null) => {
    switch (format) {
        case 'relative':
            return formatRelative(new Date(date), new Date())
            break
        default:
            return format(new Date(date))
            break
    }
}

export default getTime