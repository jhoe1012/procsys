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

@REM REM ======================================
@REM REM Step 2: Run Semgrep scan
@REM REM ======================================
@REM echo Running Semgrep scan
@REM docker run --rm -v %CD%:/src semgrep/semgrep semgrep scan ^
@REM   --verbose --metrics=off ^
@REM   --config=p/default ^
@REM   --config=p/owasp-top-ten ^
@REM   --config=p/cwe-top-25 ^
@REM   --sarif --sarif-output=/src/semgrep.sarif.json /src

@REM REM ======================================
@REM REM Step 3: Upload SARIF to SOOS
@REM REM ======================================
@REM echo Uploading SARIF to SOOS
@REM node .\soos\node_modules\@soos-io\soos-sast\bin\index.js ^
@REM   --clientId=%CLIENT_ID% ^
@REM   --apiKey=%API_KEY% ^
@REM   --projectName="%PROJECT_NAME%" ^
@REM   --sourceCodePath=%SOURCE_CODE_PATH% ^
@REM   --branchName="%BRANCH_NAME%"

@REM REM ======================================
@REM REM Step 4: Run SOOS SCA scan
@REM REM ======================================
@REM echo Running SOOS SCA scan
@REM node .\soos\node_modules\@soos-io\soos-sca\bin\index.js ^
@REM   --clientId=%CLIENT_ID% ^
@REM   --apiKey=%API_KEY% ^
@REM   --projectName="%PROJECT_NAME%" ^
@REM   --branchName="%BRANCH_NAME%"

REM ======================================
REM Step 5: Run SOOS DAST (Container Image Scan)
REM ======================================
echo Running SOOS DAST container scan
docker run -u zap -it soosio/dast ^
  --clientId=%CLIENT_ID% ^
  --apiKey=%API_KEY% ^
  --projectName="%PROJECT_NAME%" ^
  http://host.docker.internal:80/procsys/dast-sca
endlocal
 