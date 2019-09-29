const defaultException = (code, msg, stack) => {
    exception = {
        code: code,
        msg: msg,
        stack: stack,
    }

    return exception
}

module.exports = {
    defaultException: defaultException
}