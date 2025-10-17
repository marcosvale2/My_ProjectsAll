@echo off
title Iniciando Gestao Loja

REM ======= Backend =======
echo Abrindo Backend...
start cmd /k "cd /d %~dp0\backend && uvicorn main:app --reload"

REM ======= Frontend =======
echo Abrindo Frontend...
start cmd /k "cd /d %~dp0\frontend && npm start"

echo Sistema iniciado! Aguarde alguns segundos...
pause
