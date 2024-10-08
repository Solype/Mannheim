#!/bin/bash
cd ..
# python -m server.main
uvicorn server.server:app --host 0.0.0.0 --port 5000 --reload