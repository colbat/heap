# Heap
A binary heap implementation in JavaScript ES6.  
It supports the basic heap operations and the creation of a heap from an existing array.  
This heap implementation uses a 0-based indexing.

## Installation
`$ npm install @gaetancovelli/heap`

## Usage
```javascript
var Heap = require('@gaetancovelli/heap');
```

### Creation
Creates an empty min heap
```javascript
var heap = new Heap();
```
Creates an empty max heap  
```javascript
var heap = new Heap(Heap.MAX_PROPERTY);
```
Creates a min heap from an existing array that will get heapified
```javascript
var array = [5, 4, 3, 2, 1];
var heap = new Heap(Heap.MIN_PROPERTY, array);
```
Creates a max heap from an existing array that will get heapified
```javascript
var array = [1, 2, 3, 4, 5];
var heap = new Heap(Heap.MAX_PROPERTY, array);
```

### Operations
Push - Pushes a number to the heap.  
It can be a number or an array whose first element is the priority value and second element is the record we want to track. It has to be consistent for every elements of the heap.
```javascript
heap.push(1); // A value OR
heap.push([1, 'My task with priority value 1']); // A record with a string OR
heap.push([1, {firstname: 'Gaetan', lastname: 'Covelli'}]); // A record with an object
```

Peek - Returns the top element of the heap
```javascript
heap.peek();
```

Pop - Pops and return the top element of the heap
```javascript
heap.pop()
```

## Tests
Tests are performed with mocha.  
To run the tests:  
`$ npm test`

## Build
The ES6 code is transpiled with Babel to dist/Heap.js  
To run babel and build the dist:  
`$ gulp babel`

You can transpile automatically everytime the source file is saved by:  
`$ gulp dev`

## License
Copyright (c) 2017 Gaëtan Covelli.  
Released under the [MIT License](https://github.com/colbat/heap/blob/master/LICENSE)
