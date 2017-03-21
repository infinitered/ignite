## Uninstall nvm

`rm -rf $NVM_DIR ~/.npm ~/.bower`

Delete any `source ~/.nvm` lines, as well as any lines that reference the nvm installation, from your terminal config file (.bash_profile, .zshrc, etc)

## Reload terminal config file

This makes sure that your terminal is reloaded without the nvm config settings

`source ~/.bash_profile`

Substitute your terminal config file for `.bash_profile` if you do not use that file

## Re-install Node

`brew install node`

## Install n

`npm install -g n`

## Enjoy

Now you can easily install node versions with `n <version>`

For more info on how to use n see the readme [here](https://github.com/tj/n)
