import datastack
import os, sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
parent = os.path.dirname(SCRIPT_DIR)
sys.path.append(os.path.dirname(parent))
# datastack.workplaces.create_workspace()

datastack.functions.run_function('test')