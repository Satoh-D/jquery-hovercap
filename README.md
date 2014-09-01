jquery-hovercap
===============

_jQuery-Hovercap is the jQuery plugin that display caption overlays over images._ 

## Demo

[Demo Page](http://satoh-d.github.io/jquery-hovercap/)

## Usage

```html
<head>
...
<script src="js/jquery.js"></script>
<script src="jquery.hovercap.js"></script>
<script>
$(function() {
  $('.target').hovercap({
    toggleElement: '.target__caption'
  });
});
</script>
</head>
<body>

<div class="target">
<div class="target__image"><img src="..." alt=""></div>
<div class="target__caption">Content...</div>
</div>

...

</body>
```

## Options

| Name | Type | Defualt | Description |
|:---- |:-----|:--------|:------------|
| toggleElement | string | None | Selector for captions. |
| toggleAnimation | string | slide | Effect for captions[slide/fade]. |
| toggleDirection | string | toTop | Direction of captions[toTop/toRight/toBottom/toLeft]. |
| animationSpeed | integer | 200 | Animation Speed(ms). |
| animationEasing | string | linear | Easing for Animation |
| onSetup | function | None | Callback function fired when after Initialization. |
| onShow | function | None | Callback function fired when captions are shown. |
| onHide | function | None | Callback function fired when captions are hidden. |

## Depends

- jQuery.js

## License

MIT

## Copyright

2014, Sato Daiki ([@Satoh_D](http://twitter.com/Satoh_D)).
