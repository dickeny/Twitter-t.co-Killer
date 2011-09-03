
var _debug          = false;
var _link_class     = "twitter-timeline-link";

function debug(str) {
    if (_debug) {
        opera.postError(str);
    }
}

function resolveLink(target) {
    var nodes = target.getElementsByClassName(_link_class);
    for (var i = 0, l = nodes.length; i < l; i += 1) {
        debug(nodes[i]);
        nodes[i].href = nodes[i].title;
    }
}

function newNodeHandler(w) {
    w.addEventListener('DOMNodeInserted', function(event) {
        var target = event.target;

        if (target.dataset && target.dataset.itemType === "tweet") {
            if (typeof target.getElementsByClassName !== 'function') {
                return;
            }
            resolveLink(target);
        }
    }, false);
}

window.addEventListener('load', function(event) {
    // 'WATCH' is only defined in the main document, not some iframe
    // created by Twitter
    if (window.WATCH !== undefined) {
        window.WATCH('boot', function() {
            if (window.using !== undefined) {
                window.using(function(){
                    newNodeHandler(window);
                    resolveLink(window.document);
                });
            }
        });
    }
}, false);

