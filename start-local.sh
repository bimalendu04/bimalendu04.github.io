#!/bin/bash

# This script starts the portfolio application locally

echo "Starting the portfolio application locally..."

# Set environment variables for local development
export NODE_ENV=development
export PORT=3000
export HOST=localhost

# Start the application
npx tsx server/index.ts