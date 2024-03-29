/**
 * Summernote Code Cleaner
 *
 * This is a plugin for Summernote (www.summernote.org) WYSIWYG editor to clean up the code before paste from clipboard.
 *
 * @author Jason Suen
 *
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.extend($.summernote.options, {
        removeTags: ['style', 'script', 'applet', 'embed', 'param', 'noframes', 'noscript', 'font', 'span', 'iframe', 'form', 'input', 'button', 'select', 'option', 'colgroup', 'col', 'std'],
        removeAttributes: ['rel', 'class', 'style'],
        wildCardAttributesPrefix: ['data-'],
        msgStyle: 'position:absolute;top:0;left:0;right:0',
        msgShow: true, //true of false
        msgTxt: "Your pasted text has been cleaned.",
    });

    $.extend($.summernote.plugins, {
        'codeCleaner': function (context) {
            var $note = context.layoutInfo.note;
            var $editor = context.layoutInfo.editor;
            var $options = context.options;

            $note.on('summernote.paste', function (e, evt) {
                evt.preventDefault();

                var text = evt.originalEvent.clipboardData.getData('text/plain'),
                    html = evt.originalEvent.clipboardData.getData('text/html');

                if (html) {
                    var tagStripper = new RegExp('<[ /]*(' + $options.removeTags.join('|') + ')[^>]*>', 'gi'),
                        attributeStripper = new RegExp(' (' + $options.removeAttributes.join('|') + ')(="[^"]*"|=\'[^\']*\'|=[^ ]+)?', 'gi'),
                        tS = new RegExp('<(/)*(meta|link|\\?xml:|st1:|o:|font)(.*?)>', 'gi'),
                        commentStripper = new RegExp('<!--(.*)-->', 'g');
                    html = html.toString().replace(tS, '').replace(commentStripper, '').replace(tagStripper, '').replace(attributeStripper, ' ');
                }

                var wCA = $options.wildCardAttributesPrefix;
                for (var i = 0; i < wCA.length; i++) {
                    var aS = new RegExp(' ' + wCA[i] + '(.*?)=[\'|"](.*?)[\'|"]', 'gi');
                    html = html.toString().replace(aS, '');
                }

                var $html = $("<section/>").html(html || text);
                $note.summernote('insertNode', $html[0]);
                if($options.msgShow){
                    $editor.find('.note-status-output').html('<div class="alert alert-success">' + $options.msgTxt + '</div>');
                }
                console.log($editor.find('.note-status-output').html().length);
                return false;
            });

            $note.on('summernote.keydown', function() {
                if($editor.find('.note-status-output').html().length > 0){
                    $editor.find('.note-status-output').html('');
                }
            });
        }
    });
}));