A lightweight browser-based variation of coffeekup based on the technique
used by ck, but intended for the browser. Templates are passed to ckdom as a
function. Templates are rendered as a DocumentFragment which can then be
inserted into the DOM.

Notes
---
 - doctype helper has been removed, ckdom should be appending to an existing
   document
 - strings are automagically converted into a TextNode
 - partials are supported using named templates (see example)

Example
---

```coffeescript
ckdom.compile 'hello', ->
  h1 "Hello {@name or 'World'}!"
  partial 'note', named: @name?

ckdom.compile 'note', ->
  if @named
    p "Isn't it a nice day?"
  else
    p "What's your name?"

document.body.appendChild ckdom.render 'hello', name: 'Patrick'
```
