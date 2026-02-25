#!/bin/bash

# Block Battle Setup Script
# This script helps you set up the development environment

set -e

echo "🥊 Block Battle Setup Script"
echo "=============================="
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. You have v$NODE_VERSION"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo ""
    echo "ℹ️  .env file already exists"
fi

# Compile contracts
echo ""
echo "Compiling smart contracts..."
if npm run compile; then
    echo "✅ Contracts compiled successfully"
else
    echo "⚠️  Contract compilation skipped (may need internet connection)"
fi

echo ""
echo "=============================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start local blockchain: npx hardhat node"
echo "2. Deploy contract: npm run deploy"
echo "3. Start frontend: npm run dev"
echo ""
echo "For more information, see README.md"
