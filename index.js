const core = require('@actions/core')

try {
    const devVersion = core.getInput('dev-version')
    const { minDHIS2Version } = require('./d2.config.js')
    core.info('min', minDHIS2Version)

    const majorVersion = /^\d+/.exec(devVersion)[0]

    const minorVersionRegex = /[.](\d+)/
    const minMinorVersion = Number(minorVersionRegex.exec(minDHIS2Version)[1])
    const devMinorVersion = Number(minorVersionRegex.exec(devVersion)[1])

    const versions = []
    for (let index = minMinorVersion; index < devMinorVersion; index++) {
        versions.push(`${majorVersion}.${index}`)
    }
    core.info(`output-versions: ${JSON.stringify(versions)}`)
    core.setOutput('versions', versions)
} catch (error) {
    core.setFailed(error.message)
}
