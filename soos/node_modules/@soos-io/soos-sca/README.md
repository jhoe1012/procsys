# [SOOS Core SCA](https://soos.io/sca-product)

SOOS is an independent software security company, located in Winooski, VT USA, building security software for your team. [SOOS, Software security, simplified](https://soos.io).

Use SOOS to scan your software for [vulnerabilities](https://app.soos.io/research/vulnerabilities) and [open source license](https://app.soos.io/research/licenses) issues with [SOOS Core SCA](https://soos.io/products/sca). [Generate and ingest SBOMs](https://soos.io/products/sbom-manager). [Export reports](https://kb.soos.io/project-exports-and-reports) to industry standards. Govern your open source dependencies. Run the [SOOS DAST vulnerability scanner](https://soos.io/products/dast) against your web apps or APIs. [Scan your Docker containers](https://soos.io/products/containers) for vulnerabilities. Check your source code for issues with [SAST Analysis](https://soos.io/products/sast).

[Demo SOOS](https://app.soos.io/demo) or [Register for a Free Trial](https://app.soos.io/register).

If you maintain an Open Source project, sign up for the Free as in Beer [SOOS Community Edition](https://soos.io/products/community-edition).

## soos-sca
NPM package to run SOOS Core SCA

## SOOS Badge Status
[![Dependency Vulnerabilities](https://img.shields.io/endpoint?url=https%3A%2F%2Fapi-hooks.soos.io%2Fapi%2Fshieldsio-badges%3FbadgeType%3DDependencyVulnerabilities%26pid%3Dvuvlvqa79%26)](https://app.soos.io)
[![Out Of Date Dependencies](https://img.shields.io/endpoint?url=https%3A%2F%2Fapi-hooks.soos.io%2Fapi%2Fshieldsio-badges%3FbadgeType%3DOutOfDateDependencies%26pid%3Dvuvlvqa79%26)](https://app.soos.io)

## Supported Languages and Package Managers
Our full list of supported manifest formats can be found [here](https://kb.soos.io/supported-languages-and-files).

## Need an Account?
**Visit [soos.io](https://app.soos.io/register) to create your trial account.**

## Requirements
  - [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  
## Installation

### Globally
run `npm i -g @soos-io/soos-sca@latest`

Then Run `soos-sca` from any terminal and add the parameters you want.

### Locally
run `npm install --prefix ./soos @soos-io/soos-sca`

Then run from the same terminal `node ./soos/node_modules/@soos-io/soos-sca/bin/index.js`

## Running the CLI
See [CLI Knowledge Base Documentation](https://github.com/soos-io/kb-docs/blob/main/SCA/Script.md)

### Linux Shell CLI Example
See [Linux GitHub Gist](https://gist.github.com/soostech/8c86376f84667b14a4901f4ed0726d5d)

### Windows CMD CLI Example
See [Windows Batch File Gist](https://gist.github.com/soostech/d5f8c2a929902f30231a0e0699474af5)

### Client Parameters

| Argument | Default | Description |
| --- | --- | --- |
| `--apiKey` |  | SOOS API Key - get yours from [SOOS Integration](https://app.soos.io/integrate/sca). Uses `SOOS_API_KEY` env value if present.  
| `--branchName` |  | The name of the branch from the SCM System. |
| `--branchURI` |  | The URI to the branch from the SCM System. |
| `--buildURI` |  | URI to CI build info. |
| `--buildVersion` |  | Version of application build artifacts. |
| `--clientId` |  | SOOS Client ID - get yours from [SOOS Integration](https://app.soos.io/integrate/sca). Uses `SOOS_API_CLIENT` env value if present. |
| `--commitHash` |  | The commit hash value from the SCM System. |
| `--directoriesToExclude` | `**/node_modules/**, "**/bin/**", "**/obj/**", "**/lib/**` | Listing of directories or patterns to exclude from the search for manifest files. eg: **bin/start/**, **/start/** |
| `--exportFormat`   |  | Write the scan result to this file format. Options: CsafVex, CycloneDx, Sarif, Spdx, SoosIssues, SoosLicenses, SoosPackages, SoosVulnerabilities |
| `--exportFileType` |  | Write the scan result to this file type (when used with exportFormat). Options: Csv, Html, Json, Text, Xml                                       |
| `--filesToExclude` |  | Listing of files or patterns to exclude from the search for manifest files. eg: **/req**.txt/, **/requirements.txt |
| `--logLevel`  |  | Minimum level to show logs: DEBUG, INFO, WARN, FAIL, ERROR. |
| `--onFailure` | `continue_on_failure` | Action to perform when the scan fails. Options: fail_the_build, continue_on_failure. |
| `--operatingEnvironment` |  | Set Operating environment for information purposes only. |
| `--outputDirectory` |  | Export file destination. | 
| `--packageManagers` |  | A list of package managers, delimited by comma, to include when searching for manifest files. |
| `--projectName` |  | Project Name - this is what will be displayed in the SOOS app. |
| `--scriptVersion` |  | None provided. |
| `--sourceCodePath` | `process.cwd()` | Root path to begin recursive search for manifests. |
| `--workingDirectory` | `process.cwd()` | Absolute path where SOOS may write and read persistent files for the given build. eg Correct: /tmp/workspace/ | Incorrect: ./bin/start/ |

## Feedback and Support
See [SOOS Knowledge Base](https://kb.soos.io)
