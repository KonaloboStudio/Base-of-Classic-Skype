/*global SKYPE*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: false, white: true, widget: true, undef: true, indent: 2*/

/**
 * Namespace utils, for standalone scripts
 */
if (typeof SKYPE === "undefined")
{
  var SKYPE = {};
}

SKYPE.namespace = function ()
{
  var a = arguments, o = null, i, j, d;
  for (i = 0; i < a.length; ++i)
  {
    d = a[i].split(".");
    o = SKYPE;
    // SKYPE is implied, so it is ignored if it is included
    for (j = (d[0] === "SKYPE") ? 1 : 0; j < d.length; ++j)
    {
      o[d[j]] = o[d[j]] || {};
      o = o[d[j]];
    }
  }
  return o;
};