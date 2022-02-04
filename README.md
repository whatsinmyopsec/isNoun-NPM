## INSTALL

```sh
npm install isword-npm
```


## example

---

```javascript
const isWord = require('isword-npm');

(async () => {
  const type = await isWord('cruelly');
  console.log(type);
})(); 
```
### Which displays

```sh
cruelly is not a noun
cruelly is not a verb
cruelly is not an adjective
cruelly is an adverb
0 no results
0
```


