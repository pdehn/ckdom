{readFileSync, writeFileSync} = require 'fs'
{compile} = require 'coffee-script'
{parser, uglify} = require 'uglify-js'

task 'build', ->
  source = compile readFileSync("#{__dirname}/src/ckdom.coffee").toString()
  ast = parser.parse source
  ast = uglify.ast_mangle ast
  ast = uglify.ast_squeeze ast
  compressed = uglify.gen_code ast
  
  writeFileSync "#{__dirname}/ckdom.js", source
  writeFileSync "#{__dirname}/ckdom.min.js", compressed