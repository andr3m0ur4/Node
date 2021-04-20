const interval = (callback, time) => {
    setTimeout(() => {
        callback()
        interval(callback, time)
    }, time)
}

interval(() => {
    console.log('R ' + new Date())
}, 1000)