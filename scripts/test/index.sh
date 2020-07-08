#!/bin/bash
bold=$(tput bold)
normal=$(tput sgr0)

set -e

echo -e "👻 💉 ${bold}[funtypes/test]${normal} starting unit testing with jest.."
jest --config jest.config.js