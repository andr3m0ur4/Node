class SerialGenerator {
    constructor() {
        this.max = 10000
    }

    generate = () => Math.floor(Math.random() * this.max)
}

module.exports = SerialGenerator