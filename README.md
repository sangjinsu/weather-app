# Weather App

## Asyncronous Node.js

- 실행 순서

  ```js
  const locationlist = (locations) => {
    locations.forEach((location) => console.log(location))
  }
  
  const locations = ['seoul', 'incheon', 'gwanju']
  
  locationlist(locations)
  ```

  1. `main()` 함수가 call stack 에 가장 먼저 쌓인다
  2.  `locationlist()` 함수가 call stack에 쌓인다
  3. `forEach()` 가 call stack에 쌓인다
  4. 익명 함수 `anonymous('seoul')` 이 call stack에 쌓인다
  5. `console.log('seoul')`이 call stack에 쌓인다
  6. 5번 실행 후 3번 4번을 다시 실행하고 FILO 으로 call stack이 비워진다

