(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.stock = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  var StockPile = function StockPile (data) {
    if ( data === void 0 ) data = {};



    this.stashVM = new Vue({ data: data });

  };

  var prototypeAccessors = { pile: { configurable: true } };

  prototypeAccessors.pile.get = function () {
    console.log(this.stashVM.$data.pile);
    return this.stashVM.$data.pile
  };

  Object.defineProperties( StockPile.prototype, prototypeAccessors );

  var stockpileplugin = {
    Stash: StockPile,
    install: function install (Vue, options) {
      Vue.mixin({
        data: function data() {
          var this$1 = this;

          return {
            stock: {
              stash: {
                pile: function (key,value) {

                  //console.log(this.$stock.stashVM)

                  var callerName = this$1.$options.name;

                  var schema = this$1.$stock.stashVM.$data.pile;
                  var pList = key.split('.');
                  var len = pList.length;
                  for(var i = 0; i < len-1; i++) {
                      var elem = pList[i];
                      if( !schema[elem] ) { schema[elem] = {}; }
                      schema = schema[elem];
                  }


                  schema[pList[len-1]] = value;

                  if ( process.env.NODE_ENV === 'development' && typeof value === 'string' ) {
                    console.log("%c" + "[STOCK PILE updated from "+callerName+"]: " + key + " Updated to value: " + value,  'color: #2673ff' );
                  } else { console.log("%c" + "[ STOCK updated from: "+callerName+" ] — Key:" + key + " Updated with object or array", 'color: #6fb7ff'); }

                }
              }
            }
          }
        },
        beforeCreate: function beforeCreate () {
          this.$stock = options;
        }
      });
    }
  };

  exports.default = stockpileplugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
