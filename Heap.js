/**
 * Binary heap implementation in JavaScript ES6.
 * Author: Gaëtan Covelli
 * License: MIT
 *
 * peek() - O(1)
 * pop()  - O(log n)
 * push() - O(log n)
 *
 * Usage:
 *
 * new Heap()                         - Creates an empty min heap
 * new Heap(Heap.MAX_PROPERTY)        - Creates an empty max heap
 * new Heap(Heap.MIN_PROPERTY, array) - Creates a min heap from an exsiting array
 * new Heap(Heap.MAX_PROPERTY, array) - Creates a max heap from an exsiting array
 * heap.push(1)                       - Pushes a number to the heap
 * heap.push([1, 'Task number 1'])    - Pushes an array with priority value and a string to track
 * heap.push([1, {name: 'my task'}])  - Pushes an array with priority value and an object to track
 * heap.peek()                        - Returns the top element of the heap
 * heap.pop()                         - Pops and returns the top element of the heap
 *
 * This heap implementation uses a 0-based indexing.
 */
module.exports = class Heap {

  /**
   * Creates a new heap.
   *
   * @param {number} property - Optional. The property of the heap. 
   * Heap.MIN_PROPERTY (default) or Heap.MAX_PROPERTY.
   * @param {array} array - Optional. An existing array that will get heapified.
   */
  constructor(property, array = []) {
    this.elements = array;
    this.property = Heap.MIN_PROPERTY;

    if(property === Heap.MAX_PROPERTY) {
      this.property = Heap.MAX_PROPERTY;
    }

    if(this.elements.length > 0) {
      this._heapify();
    }
  }

  static get MIN_PROPERTY() { return 0; }
  static get MAX_PROPERTY() { return 1; }

  _getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  _getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  _getParentIndex(childIndex) {
    return parseInt((childIndex - 1) / 2);
  }

  _swap(i, j) {
    [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
  }

  /**
   * Returns the top element of the heap.
   *
   * @return {element} - The element at the top of the heap.
   */
  peek() {
    return this.elements[0];
  }

  /**
   * Pops and returns the top element of the heap.
   *
   * @return {element} - The element popped from the top of the heap.
   * It can be a number or an array whose first element is the priority value
   * and second element is the record tracked.
   */
  pop() {
    let lastValue = this.elements.pop();
    let returnVal = lastValue;
    if(this.elements.length > 0) {
      returnVal = this.elements[0];
      this.elements[0] = lastValue;
      this._heapifyDown();
    }
    return returnVal;
  }

  /**
   * Pushes a new element to the heap.
   *
   * @param {element} value - The element to be pushed to the heap.
   * It can be a number or an array whose first element is the priority value
   * and second element is the record we want to track.
   *
   * push(1); // A value
   * push([1, 'My task with priority value 1']); // A string
   * push([1, {firstname: 'Gaetan', lastname: 'Covelli'}]); // An object
   */
  push(value) {
    this.elements.push(value);
    if(this.elements.length > 1) {
      this._heapifyUp(this.elements.length - 1);
    }
  }

  _heapifyUp(index) {
    while(this._getParentIndex(index) >= 0) {
      let swapNeeded = false;
      let parentIndex = this._getParentIndex(index);

      if(this.property === Heap.MIN_PROPERTY) {
        swapNeeded = this.elements[parentIndex] > this.elements[index];
      } else if(this.property === Heap.MAX_PROPERTY) {
        swapNeeded = this.elements[parentIndex] < this.elements[index];
      }
      
      if(swapNeeded) {
        this._swap(parentIndex, index);
        index = parentIndex
      } else {
        break;
      }
    }
  }

  _heapifyDown(index = 0) {
    while(this._getLeftChildIndex(index) < this.elements.length) {
      let indexToSwap = this._getLeftChildIndex(index);
      let rightChildIndex = this._getRightChildIndex(index);
      let isRightChildSwap = false;
      
      if(this.property === Heap.MIN_PROPERTY) {
        isRightChildSwap = this.elements[rightChildIndex] < this.elements[indexToSwap];
      } else if(this.property === Heap.MAX_PROPERTY) {
        isRightChildSwap = this.elements[rightChildIndex] > this.elements[indexToSwap];
      }
      
      if(rightChildIndex < this.elements.length && isRightChildSwap) {
        indexToSwap = rightChildIndex
      }
      
      let swapFinished = false;
      if(this.property === Heap.MIN_PROPERTY) {
        swapFinished = this.elements[index] < this.elements[indexToSwap];
      } else if(this.property === Heap.MAX_PROPERTY) {
        swapFinished = this.elements[index] > this.elements[indexToSwap];
      }
      
      if(swapFinished) {
        break;
      } else {
        this._swap(index, indexToSwap);
      }
      index = indexToSwap;
    }
  }

  /**
   * Heapifies an existing array.
   */
  _heapify() {
    for(let i = parseInt(this.elements.length / 2); i >= 0; i--) {
      this._heapifyDown(i);
    }
  }
}
