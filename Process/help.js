const options = [
    'a) pid',
    'b) title',
    'c) arch',
    'd) platform',
    'e) env',
    'm) memmory usage',
    'u) uptime',
    'q) quit',
]

exports.showOptions = () => {
    options.forEach(option => {
        console.log(option)
    })
}