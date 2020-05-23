(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.StockPile = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  var StockPile = function StockPile (data) {
    if ( data === void 0 ) data = {};


    if( !data.pile ) { console.error("[StockPile]: You need to create at least pile object to your stash"); }

    this.stashVM = new Vue({ data: data });

  };

  var prototypeAccessors = { pile: { configurable: true },static: { configurable: true } };

  prototypeAccessors.pile.get = function () {
    return this.stashVM.$data.pile
  };

  prototypeAccessors.static.get = function () {
    return this.stashVM.$data.static
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
              pile: {
                stash: function (key,value) { return this$1.__stashParser(key,value,"pile",false); },
                unstash: function (key,value) { return this$1.__stashParser(key,value,"pile",true); }
              },
              static: {
                stash: function (key,value) { return this$1.__stashParser(key,value,"static"); }
              }
            }
          }
        },
        beforeCreate: function beforeCreate () {
          this.$stock = options;
        },
        methods: {

          __stashParser: function __stashParser(key,value,type,unset) {

            var callerName = this.$options.name || "[unnamed]";

            var schema = this.$stock.stashVM.$data[type];
            var pList = key.split('.');
            var len = pList.length;
            for(var i = 0; i < len-1; i++) {
                var elem = pList[i];
                if( !schema[elem] ) { schema[elem] = {}; }
                schema = schema[elem];
            }

            if( type == "pile" )
            {

              if( unset ) {
                schema[pList[len-1]] = null;
              } else {
                schema[pList[len-1]] = value;
              }

            }
            else
            {

              if( !schema[pList[len-1]] )
              {
                schema[pList[len-1]] = value;
              }
              else
              {
                return console.error(("[StockPile Warning]: " + key + " already exist in Static stash"));
              }

            }

            if( process.env.NODE_ENV != 'development' ) { return; }

            if ( typeof value === 'string' )
            {
              console.log(("%c[StockPile]: " + (type.toUpperCase()) + " stash updated FROM " + callerName + " component — " + key + " = " + value), "color:#42b983");
              if( callerName === "[unnamed]" ) { console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking", "color:#dccd53"); }
            }
            else if( typeof value === 'object' )
            {
              console.log(("%c[StockPile]: " + (type.toUpperCase()) + " stash updated FROM " + callerName + " component — " + key + " = " + (JSON.stringify(value))), "color:#42b983");
              if( callerName === "[unnamed]" ) { console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking", "color:#dccd53"); }
            }
            else
            {
              console.log(("%c[StockPile]: " + (type.toUpperCase()) + " stash updated FROM " + callerName + " component — UNSTASHED the key " + key), "color:#42b983");
              if( callerName === "[unnamed]" ) { console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking", "color:#dccd53"); }
            }

          }

        }
      });

    }
  };

  exports.default = stockpileplugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
