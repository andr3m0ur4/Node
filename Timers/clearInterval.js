const i = setInterval(() => {
    console.log('I ' + new Date())
}, 1000)
setTimeout(() => {
    clearInterval(i)
}, 5000)