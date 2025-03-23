const { exec } = require('node:child_process')

const body = 'test email'
const subject = 'testing'
const recipient = 'ezivnuska@gmail.com'
const command = `echo "${body}" | s-nail -s "${subject}" "${recipient}"`

const sendMail = async (req, res) => {

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing s-nail: ${error}`)
            return req.json(null)
        }
        if (stderr) {
             console.error(`stderr: ${stderr}`)
        }
        console.log(`Email sent successfully: ${stdout}`)
        return res.json({ data: stdout })
    })
}

module.exports = sendMail