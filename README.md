# StockPile

Simple state & store -plugin for VueJS.

## Installation


```bash
npm install @mmmrks/vue-stockpile
```
OR
```html
<script src="https://cdn.jsdelivr.net/npm/package@version/file"></sript>
```

## Usage

```javascript
import StockPile from '@mmmrks/vue-stockpile'

Vue.use(StockPile , new StockPile.Stash({
  pile: { // mandatory
   count: 0
  },
  static: { // optional
    localhost: "http://localhost:3000"
  }
}))
```

Unlike **pile** -stash, data inside **static** -stash can only be written once and is not mandatory.

#### Access the data:
```javascript
this.$stock.pile.count
```
```html
<section>{{$stock.pile.count}}</section>
```
#### Set (stash) data:
```javascript
this.stock.pile.stash("count", this.$stock.pile.count + 1);
```

#### Remove (unstash) data:
```javascript
this.stock.pile.unstash("count");
```

!! static -stash works just like pile stash **except you can set values only once and added values can't be unstashed.**
