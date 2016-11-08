# Depends on https://github.com/tschaub/github-changelog
git fetch
gh-changelog -m -s `git log --tags --pretty="format:%cI" -n1` -o infinitered -r ignite