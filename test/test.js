var assert = require('assert');
var Heap = require('../dist/Heap');

describe('Heap', function() {

  describe('Instanciate', function() {

    describe('new Heap()', function() {

      it('should instanciate a new heap with min property', function() {
        var heap = new Heap();
        assert.equal(heap.property, Heap.MIN_PROPERTY);
      });
    });

    describe('new Heap(INVALID_PROPERTY)', function() {

      it('should instanciate a new heap with min property', function() {
        var heap = new Heap('othervalue');
        assert.equal(heap.property, Heap.MIN_PROPERTY);
      });
    });

    describe('new Heap(Heap.MAX_PROPERTY)', function() {

      it('should instanciate a new heap with max property', function() {
        var heap = new Heap(Heap.MAX_PROPERTY);
        assert.equal(heap.property, Heap.MAX_PROPERTY);
      });
    });

    describe('new Heap(Heap.MIN_PROPERTY, [array to heapify])', function() {

      it('should instanciate a new heap with an existing array to heapify', function() {
        var heap = new Heap(Heap.MIN_PROPERTY, [5, 4, 3, 2, 1]);
        assert.equal(heap.elements.join(), [1, 2, 3, 5, 4].join());
      });
    });

    describe('new Heap(Heap.MAX_PROPERTY, [array to heapify])', function() {

      it('should instanciate a new heap with an existing array to heapify', function() {
        var heap = new Heap(Heap.MAX_PROPERTY, [1, 2, 3, 4, 5]);
        var heap2 = new Heap(Heap.MAX_PROPERTY, [10, 5, 2, 6, 12, 15, 1]);
        assert.equal(heap.elements.join(), [5, 4, 3, 1, 2].join());
        assert.equal(heap2.elements.join(), [15, 12, 10, 6, 5, 2, 1].join());
      });
    });
  });


  describe('Utils', function() {

    describe('#getLeftChildIndex(parentIndex)', function() {

      it('should return the index of the left child', function() {
        var heap = new Heap();
        heap.elements = [1, 2, 3];
        var leftChildIndex = heap._getLeftChildIndex(0);
        assert.equal(leftChildIndex, 1);
      });
    });

    describe('#getRightChildIndex(parentIndex)', function() {

      it('should return the index of the right child', function() {
        var heap = new Heap();
        heap.elements = [1, 2, 3];
        var rightChildIndex = heap._getRightChildIndex(0);
        assert.equal(rightChildIndex, 2);
      });
    });

    describe('#getParentIndex(childIndex)', function() {

      it('should return the index of the parent', function() {
        var heap = new Heap();
        heap.elements = [1, 2, 3];
        var parentIndex = heap._getParentIndex(1);
        assert.equal(parentIndex, 0);
      });
    });

    describe('#swap(i, j)', function() {

      it('should swap two elements of the heap', function() {
        var heap = new Heap();
        heap.elements = [1, 2, 3];
        heap._swap(0, 2);
        assert.equal(heap.elements[0], 3);
        assert.equal(heap.elements[2], 1);
      });
    });

    describe('#heapify()', function() {

      it('should heapify an existing array', function() {
        var heap = new Heap();
        heap.elements = [5, 4, 3, 2, 1];
        heap._heapify();
        assert.equal(heap.elements.join(), [1, 2, 3, 5, 4].join());
      });
    });
  });


  describe('Operations', function() {

    describe('#peek()', function() {

      it('should return the first element of the heap', function() {
        var heap = new Heap();
        heap.elements = [1, 2, 3];
        assert.equal(heap.peek(), 1);
      });

      it('should return undefined when the heap is empty', function() {
        var heap = new Heap();
        assert.equal(heap.peek(), undefined);
      });
    });

    describe('#push(value)', function() {

      describe('MIN_PROPERTY', function() {

        it('should insert and preserve the heap property', function() {
          var minHeap = new Heap();
          minHeap.elements = [2, 3, 4];
          minHeap.push(1);
          assert.equal(minHeap.elements[0], 1);
        });

        it('should insert and preserve the heap property when not min', function() {
          var minHeap = new Heap();
          minHeap.elements = [2, 3, 4];
          minHeap.push(5);
          assert.equal(minHeap.elements[0], 2);
        });
      });

      describe('MAX_PROPERTY', function() {

        it('should insert and preserve the heap property', function() {
          var maxHeap = new Heap(Heap.MAX_PROPERTY);
          maxHeap.elements = [3, 2, 1];
          maxHeap.push(4);
          assert.equal(maxHeap.elements[0], 4);
        });

        it('should insert and preserve the heap property when not max', function() {
          var maxHeap = new Heap(Heap.MAX_PROPERTY);
          maxHeap.elements = [3, 2, 1];
          maxHeap.push(0);
          assert.equal(maxHeap.elements[0], 3);
        });
      });
    });

    describe('#push([value, record])', function() {

      describe('MIN_PROPERTY', function() {

        it('should insert and preserve the heap property', function() {
          var minHeap = new Heap();
          minHeap.elements = [
            [2, 'Task 2'],
            [3, 'Task 3'],
            [4, 'Task 4']
          ];
          minHeap.push([1, 'Task 1']);
          assert.equal(minHeap.elements[0][0], 1);
          assert.equal(minHeap.elements[0][1], 'Task 1');
        });

        it('should insert and preserve the heap property when not min', function() {
          var minHeap = new Heap();
          minHeap.elements = [
            [2, 'Task 2'],
            [3, 'Task 3'],
            [4, 'Task 4']
          ];
          minHeap.push([5, 'Taks 5']);
          assert.equal(minHeap.elements[0][0], 2);
          assert.equal(minHeap.elements[0][1], 'Task 2');
        });
      });

      describe('MAX_PROPERTY', function() {

        it('should insert and preserve the heap property', function() {
          var maxHeap = new Heap(Heap.MAX_PROPERTY);
          maxHeap.elements = [
            [3, 'Task 3'],
            [2, 'Task 2'],
            [1, 'Task 1']
          ];
          maxHeap.push([4, 'Task 4']);
          assert.equal(maxHeap.elements[0][0], 4);
          assert.equal(maxHeap.elements[0][1], 'Task 4');
        });

        it('should insert and preserve the heap property when not max', function() {
          var maxHeap = new Heap(Heap.MAX_PROPERTY);
          maxHeap.elements = [
            [3, 'Task 3'],
            [2, 'Task 2'],
            [1, 'Task 1']
          ];
          maxHeap.push([0, 'Task 0']);
          assert.equal(maxHeap.elements[0][0], 3);
          assert.equal(maxHeap.elements[0][1], 'Task 3');
        });
      });
    });

    describe('#pop()', function() {

      describe('MIN_PROPERTY', function() {

        it('should remove and return the min element and preserve the heap property', function() {
          var minHeap = new Heap();
          minHeap.elements = [1, 3, 2, 4];
          assert.equal(minHeap.pop(), 1);
          assert.equal(minHeap.elements[0], 2);
        });
      });

      describe('MAX_PROPERTY', function() {

        it('should remove and return the max element and preserve the heap property', function() {
          var maxHeap = new Heap(Heap.MAX_PROPERTY);
          maxHeap.elements = [4, 2, 3, 1];
          assert.equal(maxHeap.pop(), 4);
          assert.equal(maxHeap.elements[0], 3);
        });
      });
    });

    describe('#pop() [value, record]', function() {

      describe('MIN_PROPERTY', function() {

        it('should remove and return the min element and preserve the heap property', function() {
          var minHeap = new Heap();
          minHeap.elements = [
            [1, 'Task 1'],
            [3, 'Task 3'],
            [2, 'Task 2'],
            [4, 'Task 4']
          ];
          var elem = minHeap.pop();
          assert.equal(elem[0], 1);
          assert.equal(elem[1], 'Task 1');
          assert.equal(minHeap.elements[0][0], 2);
          assert.equal(minHeap.elements[0][1], 'Task 2');
        });
      });

      describe('MAX_PROPERTY', function() {

        it('should remove and return the max element and preserve the heap property', function() {
          var maxHeap = new Heap(Heap.MAX_PROPERTY);
          maxHeap.elements = [
            [4, 'Task 4'],
            [2, 'Task 2'],
            [3, 'Task 3'],
            [1, 'Task 1']
          ];
          var elem = maxHeap.pop();
          assert.equal(elem[0], 4);
          assert.equal(elem[1], 'Task 4');
          assert.equal(maxHeap.elements[0][0], 3);
          assert.equal(maxHeap.elements[0][1], 'Task 3');
        });
      });
    });
  });
});
