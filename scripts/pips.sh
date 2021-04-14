#!/bin/sh
pip3 install -U "$1" && pip3 freeze > ../api/requirements.txt