#!/bin/sh
pip install -r requirements.txt
# python api/app.py

# sh scripts/run_jupyter.sh
scripts/run_jupyter.sh &
scripts/api.sh
