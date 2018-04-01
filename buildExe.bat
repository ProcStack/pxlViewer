@echo off
@setlocal
set start=%time%
set /a distrd=0
if exist dist set /a distrd=1
set /a buildrd=0
if exist build set /a buildrd=1

set /a prompt=0
if %distrd% == 1 set /a prompt=1
if %buildrd% == 1 set /a prompt=1

if %prompt% == 0 goto :buildPxl

:prompt
set /a cont=0
echo -- Previous Build Found --
echo Continuing will erase any changes to prior build, continue?  y/n 
set /p cn=" >> "
if %cn% == y set /a cont=1
if %cn% == Y set /a cont=1

if %cont% == 0 goto :exit

if %distrd% equ 1 rd /s /q "dist"
if %buildrd% equ 1 rd /s /q "build"


:buildPxl
echo Starting pxlViewer build- %start%
pyinstaller --noconsole pxlViewer.spec
set end=%time%

:: Help from- https://stackoverflow.com/questions/673523/how-do-i-measure-execution-time-of-a-command-on-the-windows-command-line
set token="tokens=1-4 delims=:.,"
for /f %token% %%a in ("%start%") do set start_h=%%a&set /a start_m=100%%b %% 100&set /a start_s=100%%c %% 100&set /a start_ms=100%%d %% 100
for /f %token% %%a in ("%end%") do set end_h=%%a&set /a end_m=100%%b %% 100&set /a end_s=100%%c %% 100&set /a end_ms=100%%d %% 100

set /a h=%end_h%-%start_h%
set /a m=%end_m%-%start_m%
set /a s=%end_s%-%start_s%
set /a ms=%end_ms%-%start_ms%
if %ms% lss 0 set /a s=%s% - 1&set /a ms=100%ms%
if %s% lss 0 set /a m=%m%-1&set /a s=60%s%
if %m% lss 0 set /a h=%h%-1&set /a m=60%m%
if %h% lss 0 set /a h=24%h%
if 1%ms% lss 100 set ms=0%ms%

set /a total=%h%*3600+%m%*60+%s% 
echo. 
echo ----------------------
echo. 
echo Finished build- %end%
echo.  
echo Build executable path-
echo %CD%\dist\pxlViewer\pxlViewer.exe
echo.  
if %total% lss 60 (
	echo Time elapsed - %s%.%ms% Seconds
) else (
	echo Time elapsed - %h%:%m%:%s%.%ms%;  %total%.%ms% Seconds Total 
)
echo. 
echo Press any key to close window . . .
pause > NUL
:exit