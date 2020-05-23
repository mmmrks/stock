import Vue from 'vue';

class StockPile {

  constructor (data = {}) {

    if( !data.pile ) console.error("[StockPile]: You need to create at least pile object to your stash");

    this.stashVM = new Vue({ data })

  }

  get pile () {
    return this.stashVM.$data.pile
  }

  get static () {
    return this.stashVM.$data.static
  }

}

const stockpileplugin = {
  Stash: StockPile,
  install (Vue, options) {

    Vue.mixin({
      data() {
        return {
          stock: {
            pile: {
              stash: (key,value) => this.__stashParser(key,value,"pile",false),
              unstash: (key,value) => this.__stashParser(key,value,"pile",true)
            },
            static: {
              stash: (key,value) => this.__stashParser(key,value,"static")
            }
          }
        }
      },
      beforeCreate () {
        this.$stock = options
      },
      methods: {

        __stashParser(key,value,type,unset) {

          var callerName = this.$options.name || "[unnamed]";

          var schema = this.$stock.stashVM.$data[type]
          var pList = key.split('.');
          var len = pList.length;
          for(var i = 0; i < len-1; i++) {
              var elem = pList[i];
              if( !schema[elem] ) schema[elem] = {}
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
              return console.error(`[StockPile Warning]: ${key} already exist in Static stash`);
            }

          }

          if( process.env.NODE_ENV != 'development' ) return;

          if ( typeof value === 'string' )
          {
            console.log(`%c[StockPile]: ${type.toUpperCase()} stash updated FROM ${callerName} component — ${key} = ${value}`, "color:#42b983")
            if( callerName === "[unnamed]" ) console.log(`%c[StockPile WARNING]: It's recommended to name you components for better tracking`, "color:#dccd53");
          }
          else if( typeof value === 'object' )
          {
            console.log(`%c[StockPile]: ${type.toUpperCase()} stash updated FROM ${callerName} component — ${key} = ${JSON.stringify(value)}`, "color:#42b983")
            if( callerName === "[unnamed]" ) console.log(`%c[StockPile WARNING]: It's recommended to name you components for better tracking`, "color:#dccd53");
          }
          else
          {
            console.log(`%c[StockPile]: ${type.toUpperCase()} stash updated FROM ${callerName} component — UNSTASHED the key ${key}`, "color:#42b983")
            if( callerName === "[unnamed]" ) console.log(`%c[StockPile WARNING]: It's recommended to name you components for better tracking`, "color:#dccd53");
          }

        }

      }
    })

  }
}

export default stockpileplugin;
