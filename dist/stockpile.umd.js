!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define(["vue"],e):(t=t||self).StockPile=e(t.Vue)}(this,(function(t){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var e=function(e){void 0===e&&(e={}),e.pile||console.error("[StockPile]: You need to create at least pile object to your stash"),this.stashVM=new t({data:e})},o={pile:{configurable:!0},static:{configurable:!0}};return o.pile.get=function(){return this.stashVM.$data.pile},o.static.get=function(){return this.stashVM.$data.static},Object.defineProperties(e.prototype,o),{Stash:e,install:function(t,e){t.mixin({data:function(){var t=this;return{stock:{pile:{stash:function(e,o){return t.__stashParser(e,o,"pile",!1)},unstash:function(e,o){return t.__stashParser(e,o,"pile",!0)}},static:{stash:function(e,o){return t.__stashParser(e,o,"static")}}}}},beforeCreate:function(){this.$stock=e},methods:{__stashParser:function(e,o,n,s){for(var c=this.$options.name||"[unnamed]",r=this.$stock.stashVM.$data[n],a=e.split("."),i=a.length,l=0;l<i-1;l++){var u=a[l];r[u]||(r[u]={}),r=r[u]}if("pile"==n)r[a[i-1]]=s?null:o;else{if(r[a[i-1]])return console.error("[StockPile Warning]: "+e+" already exist in Static stash");r[a[i-1]]=o}t.config.devtools&&("string"==typeof o?(console.log("%c[StockPile]: "+n.toUpperCase()+" stash updated FROM "+c+" component — "+e+" = "+o,"color:#42b983"),"[unnamed]"===c&&console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking","color:#dccd53")):"object"==typeof o?(console.log("%c[StockPile]: "+n.toUpperCase()+" stash updated FROM "+c+" component — "+e+" = "+JSON.stringify(o),"color:#42b983"),"[unnamed]"===c&&console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking","color:#dccd53")):(console.log("%c[StockPile]: "+n.toUpperCase()+" stash updated FROM "+c+" component — UNSTASHED the key "+e,"color:#42b983"),"[unnamed]"===c&&console.log("%c[StockPile WARNING]: It's recommended to name you components for better tracking","color:#dccd53")))}}})}}}));
