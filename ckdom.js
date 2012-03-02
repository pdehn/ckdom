(function() {
  var compile, doc, el, helpers, render, tag, templates, _fn, _i, _len, _ref,
    __slice = Array.prototype.slice;

  doc = document;

  el = null;

  templates = {};

  helpers = {
    partial: function(tmpl, context) {
      var tmp, _ref;
      tmp = el;
      render(tmpl, context);
      _ref = [el, tmpEl], tmp = _ref[0], el = _ref[1];
      el.appendChild(tmp);
    }
  };

  _ref = 'a abbr acronym address applet area article aside audio b base basefont bdo big blockquote body br button canvas caption center cite code col colgroup command datalist dd del details dfn dir div dl dt em embed fieldset figcaption figure font footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link map mark menu meta meter nav noframes noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr tt u ul var video wbr xmp'.split(' ');
  _fn = function(tag) {
    return helpers[tag] = function() {
      var arg, args, attr, key, subEl, val, _j, _len2, _ref2, _ref3, _ref4;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      subEl = doc.createElement(tag);
      el.appendChild(subEl);
      if (typeof args[0] === 'object') {
        _ref2 = args.shift();
        for (key in _ref2) {
          val = _ref2[key];
          attr = doc.createAttribute(key);
          attr.nodeValue = val;
          subEl.setAttributeNode(attr);
        }
      }
      for (_j = 0, _len2 = args.length; _j < _len2; _j++) {
        arg = args[_j];
        if (typeof arg === 'function') {
          _ref3 = [el, subEl], subEl = _ref3[0], el = _ref3[1];
          arg = arg();
          _ref4 = [el, subEl], subEl = _ref4[0], el = _ref4[1];
        }
        if (typeof arg === 'string') subEl.appendChild(doc.createTextNode(arg));
      }
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    tag = _ref[_i];
    _fn(tag);
  }

  compile = function(tmpl, code) {
    var fn;
    if (typeof tmpl === 'function') {
      code = tmpl;
      tmpl = '__anon';
    }
    code = code.toString().replace(/function\s*\(\)\s*/, '');
    fn = Function('helpers', "with (helpers) { " + code + " }");
    return templates[tmpl] = function(context) {
      if (context == null) context = {};
      el = doc.createDocumentFragment();
      fn.call(context, helpers);
      return el;
    };
  };

  render = function(tmpl, context) {
    return templates[tmpl](context);
  };

  this.ckdom = {
    compile: compile,
    render: render
  };

}).call(this);
