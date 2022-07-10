#!/bin/bash
echo "Script executed from: ${PWD}"

BASEDIR=$(dirname $0)
echo "Script location: ${BASEDIR}"

export JUPYTER_CONFIG_DIR=./dependency/jupyter
export JUPYTER_DATA_DIR=./dependency/jupyter
export JUPYTER_RUNTIME_DIR=./dependency/jupyter

jupyter notebook