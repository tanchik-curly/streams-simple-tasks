# Стрім з лімітом передачі даних

Клас `LimitSizeStream` буде підраховувати
кількість переданих через нього даних і кидати помилку якщо її обсяг перевищить допустимий
ліміт.

Клас наслідує `stream.Transform` і приймає параметр` limit`, який і є
максимальним розміром даних в байтах.

Таким чином, при включенні цього стріму в пайп він повинен буде підраховувати кількість
переданих даних, а при перевищенні максимально допустимого значення кидати помилку
`LimitExceededError`. Стрім не змінює дані, що передаються, просто передаючи їх далі.

Приклад:

```js
const LimitSizeStream = require("./LimitSizeStream");
const fs = require("fs");

const limitedStream = new LimitSizeStream({ limit: 8 }); // 8 байт
const outStream = fs.createWriteStream("out.txt");

limitedStream.pipe(outStream);

limitedStream.write("hello"); // 'hello' - це 5 байт, тому цей стрінг повністю записаний у файл

setTimeout(() => {
  limitedStream.write("world"); // помилка LimitExceeded! у файлі лишилось лише 'hello'
}, 10);
```
