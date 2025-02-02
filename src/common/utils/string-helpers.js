﻿export default {
  format: format
};

function format(format, args) {
  var i;
  if (args instanceof Array) {
    for (i = 0; i < args.length; i++) {
      format = format.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return format;
  }
  for (i = 0; i < arguments.length - 1; i++) {
    format = format.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
  }
  return format;
};

export function uniqueid() {
  // always start with a letter (for DOM friendlyness)
  var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
  do {
    // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
    var ascicode = Math.floor((Math.random() * 42) + 48);
    if (ascicode < 58 || ascicode > 64) {
      // exclude all chars between : (58) and @ (64)
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < 32);

  return (idstr);
}