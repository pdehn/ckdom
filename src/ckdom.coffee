# A lightweight browser-based variation of coffeekup based on the technique
# used by ck, but intended for the browser. Templates are passed to ckdom as a
# function. Templates are rendered as a DocumentFragment which can then be
# inserted into the DOM.
#
# Notes:
# - doctype helper has been removed, ckdom should be appending to an existing
#   document
# - strings are automagically converted into a TextNode
# - partials are supported using named templates (see example)
#
# Example use:
#
# ckdom.compile 'hello', ->
#   h1 "Hello #{@name or 'World'}!"
#   partial 'note', named: @name?
#
# ckdom.compile 'note', ->
#   if @named
#     p "Isn't it a nice day?"
#   else
#     p "What's your name?"
#
# document.body.appendChild ckdom.render 'hello', name: 'Patrick'
#

doc = document
el = null
ctx = null
templates = {}

helpers =
  partial: (tmpl, context) ->
    tmp = el
    tmpCtx = ctx
    render tmpl, context or ctx
    ctx = tmpCtx
    [tmp, el] = [el, tmp]
    el.appendChild tmp
    return

for tag in 'a abbr acronym address applet area article aside audio b base basefont bdo big blockquote body br button canvas caption center cite code col colgroup command datalist dd del details dfn dir div dl dt em embed fieldset figcaption figure font footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link map mark menu meta meter nav noframes noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr tt u ul var video wbr xmp'.split ' '
  do (tag) ->
    helpers[tag] = (args...) ->
      subEl = doc.createElement tag
      el.appendChild subEl
      if typeof args[0] is 'object'
        for key, val of args.shift()
          attr = doc.createAttribute key
          attr.nodeValue = val
          subEl.setAttributeNode attr
      for arg in args
        if typeof arg is 'function'
          [subEl, el] = [el, subEl]
          arg = arg.call ctx
          [subEl, el] = [el, subEl]
        if typeof arg is 'string'
          subEl.appendChild doc.createTextNode arg
      return

compile = (tmpl, code) ->
  if typeof tmpl is 'function'
    code = tmpl
    tmpl = '__anon'
  code = code.toString().replace /function\s*\(\)\s*/, ''
  fn = Function 'helpers', "with (helpers) { #{code} }"
  templates[tmpl] = (context = {}) ->
    el = doc.createDocumentFragment()
    fn.call context, helpers
    el

render = (tmpl, context) ->
  templates[tmpl] ctx = context

@ckdom =
  compile: compile
  render: render
