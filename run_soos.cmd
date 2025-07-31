@echo off
setlocal EnableDelayedExpansion

REM ======================================
REM Load soos.env file
REM ======================================
for /f "usebackq tokens=1,* delims==" %%A in (`findstr /v "#" "soos.env"`) do (
    if not "%%A"=="" (
        call set "%%A=%%B"
    )
)

REM ======================================
REM Step 1: Show Semgrep version
REM ======================================
echo Checking Semgrep Version
docker run --rm semgrep/semgrep semgrep --version

REM ======================================
REM Step 2: Run Semgrep scan
REM ======================================
echo Running Semgrep scan
docker run --rm -v %CD%:/src semgrep/semgrep semgrep scan ^
  --verbose --metrics=off ^
  --config=p/default ^
  --config=p/owasp-top-ten ^
  --config=p/cwe-top-25 ^
  --sarif --sarif-output=/src/semgrep.sarif.json /src

REM ======================================
REM Step 3: Upload SARIF to SOOS
REM ======================================
echo Uploading SARIF to SOOS
node .\soos\node_modules\@soos-io\soos-sast\bin\index.js ^
  --clientId=%CLIENT_ID% ^
  --apiKey=%API_KEY% ^
  --projectName="%PROJECT_NAME%" ^
  --sourceCodePath=%SOURCE_CODE_PATH% ^
  --branchName="%BRANCH_NAME%"

REM ======================================
REM Step 4: Run SOOS SCA scan
REM ======================================
echo Running SOOS SCA scan
node .\soos\node_modules\@soos-io\soos-sca\bin\index.js ^
  --clientId=%CLIENT_ID% ^
  --apiKey=%API_KEY% ^
  --projectName="%PROJECT_NAME%" ^
  --branchName="%BRANCH_NAME%"


REM ======================================
REM Step 5: Run SOOS DAST (Container Image Scan)
REM ======================================
echo Running SOOS DAST container scan
docker run -it soosio/csa ^
  --clientId=%CLIENT_ID% ^
  --apiKey=%API_KEY% ^
  --projectName="%PROJECT_NAME%" ^
  --targetUrl=http://host.docker.internal:80

endlocal
