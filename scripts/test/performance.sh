#!/bin/bash
bold=$(tput bold)
normal=$(tput sgr0)

set -e

echo -e "🧪 💉 ${bold}[super-ts/test:performance]${normal} starting performance test.."

if [ $# -eq 0 ]
  then
    echo -e "[ 🛑 ] ERROR: You must inform a valid performance file. (ex: pnpm run test:performance tests/algebraic/common/sequenceTuple.performance.ts   ) \n"
    exit 1
fi

node_modules/.bin/ts-node $1