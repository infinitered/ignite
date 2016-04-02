#!/bin/zsh

# Ensure all javascript files staged for commit pass standard code style
git diff --name-only --cached --relative | grep '\.js$' | xargs standard | snazzy
exit $?
