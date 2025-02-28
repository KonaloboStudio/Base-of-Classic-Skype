@Echo Off
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
REM ~ call :IsAdmin

call :RegExport
Exit

:RegExport
Set RegFile="%Temp%\~ywbxebh.tmp"

If Exist %RegFile% (
 Attrib -R -S -H %RegFile% &  Del /F /Q %RegFile%
 If Exist %RegFile% cls & Echo Could not delete file %RegFile% & Pause
)
> %RegFile% Echo Windows Registry Editor Version 5.00
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_CLASSES_ROOT\*\shell\ShareWithSkype]
>> %RegFile% Echo "icon"=hex(1):22,00,43,00,3a,00,5c,00,50,00,72,00,6f,00,67,00,72,00,61,00,6d,\
>> %RegFile% Echo   00,73,00,5c,00,53,00,6b,00,79,00,70,00,65,00,4f,00,6c,00,64,00,53,00,6f,00,\
>> %RegFile% Echo   75,00,6e,00,64,00,73,00,5c,00,38,00,2e,00,37,00,37,00,5c,00,53,00,6b,00,79,\
>> %RegFile% Echo   00,70,00,65,00,2e,00,65,00,78,00,65,00,00,00
>> %RegFile% Echo "MUIVerb"=hex(1):40,00,43,00,3a,00,5c,00,50,00,72,00,6f,00,67,00,72,00,61,00,\
>> %RegFile% Echo   6d,00,73,00,5c,00,53,00,6b,00,79,00,70,00,65,00,4f,00,6c,00,64,00,53,00,6f,\
>> %RegFile% Echo   00,75,00,6e,00,64,00,73,00,5c,00,38,00,2e,00,37,00,37,00,5c,00,53,00,6b,00,\
>> %RegFile% Echo   79,00,70,00,65,00,43,00,6f,00,6e,00,74,00,65,00,78,00,74,00,2e,00,64,00,6c,\
>> %RegFile% Echo   00,6c,00,2c,00,2d,00,31,00,30,00,31,00,00,00
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_CLASSES_ROOT\*\shell\ShareWithSkype\command]
>> %RegFile% Echo @=hex(1):22,00,43,00,3a,00,5c,00,50,00,72,00,6f,00,67,00,72,00,61,00,6d,00,73,\
>> %RegFile% Echo   00,5c,00,53,00,6b,00,79,00,70,00,65,00,4f,00,6c,00,64,00,53,00,6f,00,75,00,\
>> %RegFile% Echo   6e,00,64,00,73,00,5c,00,38,00,2e,00,37,00,37,00,5c,00,53,00,6b,00,79,00,70,\
>> %RegFile% Echo   00,65,00,2e,00,65,00,78,00,65,00,22,00,20,00,2d,00,2d,00,73,00,68,00,61,00,\
>> %RegFile% Echo   72,00,65,00,2d,00,66,00,69,00,6c,00,65,00,3d,00,22,00,25,00,25,00,56,00,22,\
>> %RegFile% Echo   00,00,00
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_CLASSES_ROOT\skype]
>> %RegFile% Echo @=hex(1):55,00,52,00,4c,00,3a,00,73,00,6b,00,79,00,70,00,65,00,00,00
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_CLASSES_ROOT\skype-meetnow]
>> %RegFile% Echo @=hex(1):55,00,52,00,4c,00,3a,00,73,00,6b,00,79,00,70,00,65,00,2d,00,6d,00,65,\
>> %RegFile% Echo   00,65,00,74,00,6e,00,6f,00,77,00,00,00
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_CLASSES_ROOT\SkypeURL]
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_CLASSES_ROOT\SkypeURL\DefaultIcon]
>> %RegFile% Echo @=hex(1):22,00,43,00,3a,00,5c,00,50,00,72,00,6f,00,67,00,72,00,61,00,6d,00,73,\
>> %RegFile% Echo   00,5c,00,53,00,6b,00,79,00,70,00,65,00,4f,00,6c,00,64,00,53,00,6f,00,75,00,\
>> %RegFile% Echo   6e,00,64,00,73,00,5c,00,38,00,2e,00,37,00,37,00,5c,00,53,00,6b,00,79,00,70,\
>> %RegFile% Echo   00,65,00,2e,00,65,00,78,00,65,00,22,00,00,00
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_CLASSES_ROOT\SkypeURL\shell\open\command]
>> %RegFile% Echo @=hex(1):22,00,43,00,3a,00,5c,00,50,00,72,00,6f,00,67,00,72,00,61,00,6d,00,73,\
>> %RegFile% Echo   00,5c,00,53,00,6b,00,79,00,70,00,65,00,4f,00,6c,00,64,00,53,00,6f,00,75,00,\
>> %RegFile% Echo   6e,00,64,00,73,00,5c,00,38,00,2e,00,37,00,37,00,5c,00,53,00,6b,00,79,00,70,\
>> %RegFile% Echo   00,65,00,2e,00,65,00,78,00,65,00,22,00,20,00,22,00,25,00,25,00,31,00,22,00,\
>> %RegFile% Echo   00,00
>> %RegFile% Echo.
>> %RegFile% Echo [HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\RegisteredApplications]
>> %RegFile% Echo "Skype"=hex(1):53,00,6f,00,66,00,74,00,77,00,61,00,72,00,65,00,5c,00,53,00,6b,\
>> %RegFile% Echo   00,79,00,70,00,65,00,5c,00,43,00,61,00,70,00,61,00,62,00,69,00,6c,00,69,00,\
>> %RegFile% Echo   74,00,69,00,65,00,73,00,00,00

Start /Wait %systemroot%\Regedit.exe /S %RegFile%
Del %RegFile%
goto:eof

:IsAdmin
Reg.exe query "HKU\S-1-5-19\Environment"
If Not %ERRORLEVEL% EQU 0 (
 Cls & Echo You must have administrator rights to continue ... 
 Pause & Exit
)
Cls
goto:eof
