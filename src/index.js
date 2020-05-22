import Vue from 'vue';

class StockPile {

  constructor (data = {}) {


    this.stashVM = new Vue({ data })

  }

  get pile () {
    console.log(this.stashVM.$data.pile)
    return this.stashVM.$data.pile
  }

}

const stockpileplugin = {
  Stash: StockPile,
  install (Vue, options) {
    Vue.mixin({
      data() {
        return {
          stock: {
            stash: {
              pile: (key,value) => {

                //console.log(this.$stock.stashVM)

                var callerName = this.$options.name;

                var schema = this.$stock.stashVM.$data.pile
                var pList = key.split('.');
                var len = pList.length;
                for(var i = 0; i < len-1; i++) {
                    var elem = pList[i];
                    if( !schema[elem] ) schema[elem] = {}
                    schema = schema[elem];
                }


                schema[pList[len-1]] = value;

                if ( process.env.NODE_ENV === 'development' && typeof value === 'string' ) {
                  console.log("%c" + "[STOCK PILE updated from "+callerName+"]: " + key + " Updated to value: " + value,  'color: #2673ff' )
                } else { console.log("%c" + "[ STOCK updated from: "+callerName+" ] — Key:" + key + " Updated with object or array", 'color: #6fb7ff') }

              }
            }
          }
        }
      },
      beforeCreate () {
        this.$stock = options.stash
      }
    })
  }
}

export default stockpileplugin;
