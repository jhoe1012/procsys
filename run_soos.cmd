@echo off
set "PROJECT_NAME=SCM LITE"
set "BRANCH_NAME=dev"
set "CLIENT_ID=qn0fh9ybn"
set "API_KEY=ODA0ZWU1M2ItNzAzOS00ODhlLWI3N2YtZTZiYmQ4NWUzNmZj"
set "SOURCE_CODE_PATH=./"
set "SEMGREP_CONFIG=%CD%\semgrep-config.yml"
@REM set "MAX_TARGET_BYTES=10000000"

REM Run Semgrep scan with custom rules and save SARIF result
docker run --rm -v "%CD%:/src" -v "%SEMGREP_CONFIG%:/semgrep-config.yml" semgrep/semgrep semgrep --config=/semgrep-config.yml --sarif --output=/src/semgrep-results.sarif.json /src

REM Install SOOS SAST if needed
if not exist ".\soos\node_modules\@soos-io\soos-sast\bin\index.js" (
    echo Installing SOOS SAST...
    npm install --prefix .\soos @soos-io/soos-sast
)

REM Run SOOS SAST scan
node .\soos\node_modules\@soos-io\soos-sast\bin\index.js ^
  --clientId=%CLIENT_ID% ^
  --apiKey=%API_KEY% ^
  --projectName="%PROJECT_NAME%" ^
  --sourceCodePath=%SOURCE_CODE_PATH% ^
  --branchName="%BRANCH_NAME%"
