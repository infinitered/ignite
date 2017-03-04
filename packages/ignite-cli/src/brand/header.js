const { print } = require('gluegun')

module.exports = function () {
  const {
    info,
    colors: { red, yellow }
  } = print

  info('-----------------------------------------------')
  info(red('  (                  )   (                   '))
  info(red('  )\\ )   (        ( /(   )\\ )    *   )       '))
  info(red(' (()/(   )\\ )     )\\()) (()/(  ` )  /(   (   '))
  info(red('  /(_)) (()/(    ((_)\\   /(_))  ( )(_))  )\\  '))
  info(red(' (_))    /(_))_   _((_) (_))   (_(_())  ((_) '))
  info(' |_ _|  ' + red('(_))') + ' __| | \\| | |_ _|  |_   _|  | __|')
  info('  | |     | (_ | | .` |  | |     | |    | _| ')
  info(' |___|     \\___| |_|\\_| |___|    |_|    |___|')
  info('-----------------------------------------------')
  info('')
  info('An unfair headstart for your React Native apps.')
  info(yellow('https://infinite.red/ignite'))
  info('')
  info('-----------------------------------------------')
}
