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
  h1 class: 'hello', "Hello #{@name or 'World'}!"
  partial 'note', named: @name?

ckdom.compile 'note', ->
  if @named
    p "Isn't it a nice day?"
  else
    p "What's your name?"

document.body.appendChild ckdom.render 'hello', name: 'Patrick'
```

It's also possible write templates with regular javascript (as that's what the coffeescript gets compiled to anyway), things just get more verbose.

```javascript
ckdom.compile('hello', function() {
  h1({"class": 'hello'}, "Hello " + (this.name || 'World') + "!");
  partial('note', { named: this.name != null });
});

ckdom.compile('note', function() {
  if (this.named) {
    p("Isn't it a nice day?");
  } else {
    p("What's your name?");
  }
});

document.body.appendChild(ckdom.render('hello', { name: 'Patrick' }));
```