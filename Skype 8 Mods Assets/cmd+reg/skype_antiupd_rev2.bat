rem by konalobostudio
@echo off
set "targetPath1=%appdata%\Microsoft\Skype for Desktop\Skype-Setup.exe"
set "targetPath2=%appdata%\Microsoft\Skype for Desktop\Skype-Preview-Setup.exe"
if exist "%targetPath1%" (
    rmdir /s /q "%targetPath1%"
    del /f /q "%targetPath1%"
)
if exist "%targetPath2%" (
    rmdir /s /q "%targetPath2%"
    del /f /q "%targetPath2%"
)
mkdir "%appdata%\Microsoft\Skype for Desktop\Skype-Setup.exe"
mkdir "%appdata%\Microsoft\Skype for Desktop\Skype-Preview-Setup.exe"
exit