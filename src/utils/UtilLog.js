// const isSentry = require('../../project.config.js').isSentry

const Console = Object.create(console, {
    error: {
        enumerable: true,
        get() {
            // isSentry
            return console.error
        },
    },
})

export default Console
