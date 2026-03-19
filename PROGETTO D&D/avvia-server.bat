@echo off
echo ========================================
echo   SERVER LOCALE per D^&D Manager
echo ========================================
echo.

REM Prova con Python
python -m http.server 8080 2>nul
if %errorlevel% == 0 goto :server_started

python3 -m http.server 8080 2>nul
if %errorlevel% == 0 goto :server_started

REM Prova con PHP
php -S localhost:8080 2>nul
if %errorlevel% == 0 goto :server_started

REM Prova con Node.js (npx serve)
where node >nul 2>&1
if %errorlevel% == 0 (
    echo Avvio server con Node.js...
    npx serve . -p 8080
    goto :server_started
)

echo ERRORE: Nessun server trovato (Python, PHP, Node.js).
echo.
echo Installa uno di questi:
echo  - Python: https://www.python.org/downloads/
echo  - Node.js: https://nodejs.org/
echo.
pause
exit /b 1

:server_started
echo.
echo Server avviato su: http://localhost:8080/gioca.html
echo Apri il link sopra nel browser!
pause
