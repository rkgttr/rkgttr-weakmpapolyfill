/**
 * rkgttr-weakmappolyfill
 *
 * Copyright © 2016 Erik Guittiere. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const weakMapPolyfill = (() => {
  /*
    * Copyright 2012 The Polymer Authors. All rights reserved.
    * Use of this source code is governed by a BSD-style
    * license that can be found in the LICENSE file.
    */
  if (typeof WeakMap === 'undefined') {
    (function() {
      var defineProperty = Object.defineProperty;
      var counter = Date.now() % 1000000000;

      var WeakMap = function() {
        this.name = '__st' + (Math.random() * 1000000000 >>> 0) +
          (counter++ + '__');
      };

      WeakMap.prototype = {
        set: function(key, value) {
          var entry = key[this.name];
          if (entry && entry[0] === key)
            entry[1] = value;
          else
            defineProperty(key, this.name, {
              value: [ key, value ],
              writable: true
            });
          return this;
        },
        get: function(key) {
          var entry;
          return (entry = key[this.name]) && entry[0] === key
            ? entry[1]
            : undefined;
        },
        delete: function(key) {
          var entry = key[this.name];
          if (!entry)
            return false;
          var hasValue = entry[0] === key;
          entry[0] = entry[1] = undefined;
          return hasValue;
        },
        has: function(key) {
          var entry = key[this.name];
          if (!entry)
            return false;
          return entry[0] === key;
        }
      };

      window.WeakMap = WeakMap;
    })();
  }
})();

export {weakMapPolyfill as default};
