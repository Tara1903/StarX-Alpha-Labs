@echo off
title StarX Alpha Labs Server
cd /d "%~dp0"
echo ========================================================
echo Starting StarX Alpha Labs Production Server on port 3000
echo Address: http://localhost:3000
echo ========================================================
node node_modules\next\dist\bin\next start -p 3000
pause
