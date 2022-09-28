const core = require('@actions/core')

try {
    const devVersion = Number(core.getInput('dev-version'))
    const { minDHIS2Version } = require('./d2.config.js')

    const majorVersion = /^\d+/.exec(devVersion)[0]

    const minorVersionRegex = /[.](\d+)/
    const devMinorVersion = Number(minorVersionRegex.exec(devVersion)[1])
    const minMinorVersion = Number(minorVersionRegex.exec(minDHIS2Version)[1])

    const versions = []
    for (let index = minMinorVersion; index < devMinorVersion; index++) {
        versions.push(`${majorVersion}.${index}`)
    }
    core.info(`output-versions: ${JSON.stringify(versions)}`)
    core.setOutput('versions', versions)
} catch (error) {
    core.setFailed(error.message)
}
