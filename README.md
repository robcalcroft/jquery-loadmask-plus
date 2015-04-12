# jquery-loadmask-plus

A fork of [jquery-loadmask](https://code.google.com/p/jquery-loadmask/) which intends to modernise the look and feel of the original plugin by way of CSS updates and improved API usage.

The source code was exported to GitHub from Google Code

My additional functionality is noted in the original README document from the original repository along with some edits *(shown below)*.

####Project installation
- Download the release .zip
- Use the hosted version:
```
//cdn.calcroft.co/jquery.loadmask-plus.min.js
//cdn.calcroft.co/jquery.loadmask-plus.min.css
```

####Development install
1. Get the source code `git clone https://github.com/robcalcroft/jquery-loadmask-plus.git`
2. [Install Ruby](https://www.ruby-lang.org/en/downloads/)
3. Install Compass `gem update --system && gem install compass`
4. Install dependancies `npm install gulp jshint -g && npm install`
5. Build out the source `gulp`

####Notes
- Only use this on container elements; I have found that this does not play well with padding and causes an offset on the text.


---

LoadMask jQuery plugin can mask DOM elements while their content is loading or changing to prevent user interactions and inform that some background task is still running. It is very light (~2Kb) and easy to use.

The behavior of this plugin is largely based on handy Element.mask() method from [ExtJS Framework](http://extjs.com/deploy/dev/examples/form/xml-form.html).

#Usage
jQuery version required: > 1.2.3.

Please note that only elements that accept child nodes can be masked.

To start using the plugin you need to include jquery.loadmask.css and jquery.loadmask.js (or its minified version jquery.loadmask.min.js) to your html page:

```html
<link rel="stylesheet" type="text/css" href="//cdn.calcroft.co/jquery.loadmask-plus.min.css" />
<script type="text/javascript" src="//cdn.calcroft.co/jquery.loadmask-plus.min.js"></script>
```

##Masking
To put a mask over an element (or multiple elements) simply call `mask(options)` method :

```javascript
$("#myDiv").mask() // Will show the loading animation in white

$("#myDiv").mask({
  iconColour: "red" // Updates the colour of the loading animation
});

// Alternatively, specify a label to be shown instead of the icon
$("#myDiv").mask({
  label: "Loading",
  delay: 500
});
```

###Options can be:
- `iconColour`
- `bgColour`
- `delay`
- `label`

The `delay` property sets a delay in milliseconds before element(s) is masked. If `unmask()` is called before the delay times out, no mask is displayed. This can be used to prevent unnecessary mask display for quick processes.

**Note that the if the `label` property is set the icon will not be shown**

##Unmasking
To remove a previously displayed mask from an element (or multiple elements) call `unmask()` without any parameters:

```javascript
$("#mydiv").unmask();
```

Calling `unmask()` on a delayed mask prevents it from showing up.

##Checking if an element is masked

You can use `isMasked()` method on a single element to check if it is currently masked. Please note that this method will return `false` whilst mask is delayed.

```javascript
if($("#mydiv").isMasked()) { ... }
```

#Integration with ASP.net UpdatePanel
Please take a look at [this code](http://plugins.jquery.com/node/10817).

#Integration with Jquery UI
Please take a look at [this code](http://code.google.com/p/jquery-loadmask/issues/detail?id=4&can=1).

#Contributors
 - wpaap - provided snapshot for integration with ASP.net UpdatePanel
 - Artur Alexandre Moreira (artur.alexandre@gmail.com) - implemented delayed mask
 - theonlylawislove - provided Jquery UI integration solution

Thank you!

---

Thanks to Sergiy for the creation of this plugin!
