const getDate = (date, type) => {
    let prototypeDate = new Date(date)

    let dayDate = prototypeDate.getDate() < 10 ? '0' + prototypeDate.getDate() : prototypeDate.getDate()

    let yearDate = prototypeDate.getFullYear()

    let monthDate =
        prototypeDate.getMonth() + 1 < 10
            ? '0' + (prototypeDate.getMonth() + 1)
            : prototypeDate.getMonth() + 1

    let hours = prototypeDate.getHours() < 10 ? '0' + prototypeDate.getHours() : prototypeDate.getHours()

    let hours2 = prototypeDate.getHours()

    let minutes =
        prototypeDate.getMinutes() < 10 ? '0' + prototypeDate.getMinutes() : prototypeDate.getMinutes()

    let seconds =
        prototypeDate.getSeconds() < 10 ? '0' + prototypeDate.getSeconds() : prototypeDate.getSeconds()

    let resDate = ''

    switch (type) {
        case 'YY':
            resDate = yearDate
            break

        case 'MM':
            resDate = monthDate
            break

        case 'DD':
            resDate = dayDate
            break

        case 'HH':
            resDate = hours
            break
        case 'HH2':
            resDate = hours2
            break

        case 'mim':
            resDate = minutes
            break

        case 'YYDD':
            resDate = yearDate + '-' + monthDate
            break

        case 'YYMMDD':
            resDate = yearDate + '-' + monthDate + '-' + dayDate
            break

        case 'YYMMDDHH':
            resDate = yearDate + '-' + monthDate + '-' + dayDate + hours
            break

        case 'HHmm':
            resDate = hours + ':' + minutes
            break

        case 'YYMMDDHHmm':
            resDate = yearDate + '-' + monthDate + '-' + dayDate + ' ' + hours + ':' + minutes
            break

        case 'YYMMDDHHmmSS':
            resDate = yearDate + '-' + monthDate + '-' + dayDate + ' ' + hours + ':' + minutes + ':' + seconds
            break

        default:
            resDate = yearDate + '-' + monthDate + '-' + dayDate + ' ' + hours + ':' + minutes + ':' + seconds
            break
    }

    return resDate
}

module.exports = {
    getDate
}
