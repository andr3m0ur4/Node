const konsole = {
    log: msg => {
        process.stdout.write(`${msg}\n`)
    },
    error: msg => {
        process.stderr.write(`${msg}\n`)
    }
}

konsole.log('A TTY: ' + !!process.stdout.isTTY)
konsole.error('B TTY: ' + !!process.stderr.isTTY)