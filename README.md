# summernote-code-cleaner
A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

summernote-code-cleaner clean up the code before paste from clipboard.

Support html tags, atrribute and wildcard attrribute like (data-*)

### Installation

#### 1. You can download the zip from github directly or install via bower / npm

```
bower install summernote-code-cleaner
```

```
npm install summernote-code-cleaner
```

#### 2. Include the library after summbernote:

```html
<script type="text/javascript" src="bower_components/summernote/dist/summernote.min.js" />
<script type="text/javascript" src="bower_components/summernote-code-cleaner/summernote-code-cleaner.min.js" />
```

#### 3. Sample summernote config

```javascript
$('#summernote').summernote({
  toolbar: [
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']]
  ],
  codeCleaner: {
    stripTags: ['style', 'script', 'applet', 'embed', 'param', 'noframes', 'noscript', 'font', 'span', 'iframe', 'form', 'input', 'button', 'select', 'option', 'colgroup', 'col', 'std'],
    stripAttributes: ['rel', 'class', 'style'],
    wildCardAttributesPrefix: ['data-'],
    msgStyle: 'position:absolute;top:0;left:0;right:0',
    msgShow: true, //true of false
    msgTxt: "Your pasted text has been cleaned.",
  }
});
```

#### Thanks:
- [Hitesh Aggarwal](https://github.com/hiteshaggarwa)
  - I make use of his share file to do some enahncement for match my personal requirements
