#!/bin/sh
# Exit with nonzero exit code if anything fails
set -e

git config --global user.name 'Travis'
git config --global user.email 'travis@travis-ci.com'

# setup ssh-agent and provide the GitHub deploy key
openssl aes-256-cbc -K $encrypted_46247defc183_key -iv $encrypted_46247defc183_iv -in scripts/deploy.enc -out deploy -d

# 对解密后的私钥添加权限
chmod 600 deploy

# 启动 ssh-agent
eval "$(ssh-agent -s)"

ssh-add deploy

# 删除解密后的私钥
rm deploy

# commit the assets in dist/ to the gh-pages branch and push to GitHub using SSH
./node_modules/.bin/gh-pages -d dist/ -b gh-pages -r git@github.com:${TRAVIS_REPO_SLUG}.git
