!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e=e||self).StockPile={},e.Vue)}(this,(function(e,t){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var o=function(e){void 0===e&&(e={}),e.pile||console.error("[StockPile]: You need to create at least pile object to your stash"),this.stashVM=new t({data:e})},n={pile:{configurable:!0},static:{configurable:!0}};n.pile.get=function(){return this.stashVM.$data.pile},n.static.get=function(){return this.stashVM.$data.static},Object.defineProperties(o.prototype,n);var s={Stash:o,install:function(e,t){e.mixin({data:function(){var e=this;return{stock:{pile:{stash:function(t,o){return e.__stashParser(t,o,"pile",!1)},unstash:function(t,o){return e.__stashParser(t,o,"pile",!0)}},static:{stash:function(t,o){return e.__stashParser(t,o,"static")}}}}},beforeCreate:function(){this.$stock=t},methods:{__stashParser:function(e,t,o,n){for(var s=this.$options.name||"[unnamed]",c=this.$stock.stashVM.$data[o],r=e.split("."),a=r.length,i=0;i<a-1;i++){var l=r[i];c[l]||(c[l]={}),c=c[l]}if("pile"==o)c[r[a-1]]=n?null:t;else{if(c[r[a-1]])return console.error("[StockPile Warning]: "+e+" already exist in Static stash");c[r[a-1]]=t}"development"==process.env.NODE_ENV&&("string"==typeof t?(console.log("%c[StockPile]: "+o.toUpperCase()+" stash updated FROM "+s+" component — "+e+" = "+t,"color:#42b983"),"[unnamed]"===s&&console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking","color:#dccd53")):"object"==typeof t?(console.log("%c[StockPile]: "+o.toUpperCase()+" stash updated FROM "+s+" component — "+e+" = "+JSON.stringify(t),"color:#42b983"),"[unnamed]"===s&&console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking","color:#dccd53")):(console.log("%c[StockPile]: "+o.toUpperCase()+" stash updated FROM "+s+" component — UNSTASHED the key "+e,"color:#42b983"),"[unnamed]"===s&&console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking","color:#dccd53")))}}})}};e.default=s,Object.defineProperty(e,"__esModule",{value:!0})}));
