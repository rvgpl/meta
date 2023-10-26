#!/bin/bash

# Stops the execution of the script if any command has an error.
set -e

# Install Bun
curl -fsSL https://bun.sh/install | bash
export PATH="/opt/buildhome/.bun/bin:$PATH"

echo "bun --version"
bun --version

# Install deps
bun install

echo "Build"
bun run build:prod