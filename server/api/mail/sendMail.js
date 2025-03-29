// const { exec } = require('node:child_process')
var exec = require('node:child_process').exec
var spawn = require('node:child_process').spawn
    // ls    = spawn('ls', ['-lh', '/usr'])

const sendMail = async (req, res) => {
    
    const { content, email } = req.body
    // const command = `echo "${content}" | s-nail -s "testing email" "contact@iameric.me" "${email}"`
    // const args = ["-s", "testing email", "contact@iameric.me", email]
    // console.log('command', command)

    // var spawn = require('child_process').spawn
        // ls    = spawn('ls', ['-lh', '/usr'])
    // var args = ['-s', command]

    const out = spawn('s-nail', ['-s', 'testing email', 'contact@iameric.me', `<${email}>`])
    const process = spawn('sh', [`echo "${content}"`, { stdio: ['pipe', out] }])
    // process.stdout.pipe(child.stdin)
    // child.stdin.write('your input string\n')
    // child.stdin.end()
    // child.stderr.on('data', data => {
    //     console.log('child error: ' + data.toString())
    // })
    // process.stderr.on('data', data => {
    //     console.log('process error: ' + data.toString())
    // })
    // const process = spawn(`echo "${content}"`)
    // const mailProcess = spawn(`s-nail -s "testing email" "contact@iameric.me" "${email}"`)
    
    process.stdout.on('data', data => {
        console.log('stdout: ' + data.toString())
        return res.json({ data })
    })

    // process.stdout.on('error', error => {
    //     console.log('error: ' + error.toString())
    //     return res.json(error)
    // })

    // console.log('process', process)
    
    // process.stdout.on('data', data => {
    //     console.log('stdout: ' + data.toString())
    //     return res.json({ data })
    // })

    // process.stderr.on('data', data => {
    //     console.log('stderr: ' + data.toString())
    // })

    // process.on('exit', code => {
    //     console.log('child process exited with code ' + code.toString())
    //     return res.json(null)
    // })

    // , (error, stdout, stderr) => {
        
    //     if (error) {
    //         console.error(`Error executing s-nail: ${error}`)
            
    //         return res.json(null)
    //     }
    //     console.log(`stdout ${stdout}<---`)
    //     if (stderr) {
    //          console.error(`stderr: ${stderr}`)
    //     }

    //     console.log(`Email sent successfully: ${stdout}`)

    //     return res.json({ data: stdout })
    // })
}

module.exports = sendMail