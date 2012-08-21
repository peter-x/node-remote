function asc(x) { return x.charCodeAt(0); }

/* mapping from key names to X11 keycodes for keys understood by omxplayer */
mappingsOMXPlayer = {
    'top': null, /* not used */
    'video': null,
    'music': null,
    'images': null,
    'tv': null,
    'rewind': asc('1'), /* slower */
    'fast-forward': asc('2'), /* faster */
    'play': asc('p'),
    'pause': asc('p'),
    'prev': 0xff54, /* down, skip backward 600 seconds */
    'next': 0xff52, /* up, skip forward 600 seconds */
    'stop': asc('q'), /* quit */
    'title': asc('s'), /* show or hide subtitles */
    'info': asc('z'), /* show or hide info */
    'menu': null,
    'back': asc('q'),
    'select': asc('p'),
    'up': asc('+'), /* volume up */
    'down': asc('-'), /* volume down */
    'left': 0xff51, /* left, skip backward 30 seconds */
    'right': 0xff53 /* right, skip forward 30 seconds */
}

function button(which) {
    var keyCode = mappingsOMXPlayer[which];
    if (keyCode === null || keyCode === undefined)
        return;

    $.post('/keyPress?keyCode=' + keyCode);
    $.post('/keyRelease?keyCode=' + keyCode);
}

$(document).keydown(function(e) {
    return;
    $.post('/keyPress?keyCode=' + e.which);
});

$(document).keyup(function(e) {
    return;
    $.post('/keyRelease?keyCode=' + e.which);
});
