var skiplist = require('./skiplist');

test('can create new list with parameters', () => {
   const head = skiplist.createHead(3);
   expect(head.maxLevel).toBe(3);
});

test('can add element with levels', () => {
   const head = skiplist.createHead(3);
   const newNode = skiplist.insert(head,10,10,3);

   expect(head.next[0]).toBe(newNode);
   expect(head.next[1]).toBe(newNode);
   expect(head.next[2]).toBe(newNode);
});

test('respect nuimber of levels passed', () => {
   const head = skiplist.createHead(3);
   const newNode = skiplist.insert(head,10,10,1);
   
   expect(head.next[0]).toBe(newNode);
   expect(head.next[1]).not.toBeDefined();
   expect(head.next[2]).not.toBeDefined();

   checkLevel(head,0,[10]);
});

function checkLevel(head, level, values){
    var node = head.next[level];
    var flatLevel = [];
    while(node){
        flatLevel.push(node.value);
        node = node.next[level];
    }

    console.log(flatLevel);
    expect(flatLevel).toEqual(values);
}

function checkPath(path, level, values){
    var node = head.next[level];
    var flatLevel = [];
    while(node){
        flatLevel.push(node.value);
        node = node.next[level];
    }
}

test('complex test 30->20->10 list with 2 levels', () => {
   const head = skiplist.createHead(3);
   skiplist.insert(head,30,30,2);
   skiplist.insert(head,20,20,1);
   skiplist.insert(head,10,10,2);

   checkLevel(head,0,[30,20,10]);
   checkLevel(head,1,[30,10]);
   checkLevel(head,2,[]);
   expect(head.next[2]).not.toBeDefined();

});

test('complex test 10->20->30 list with 2 levels', () => {
   const head = skiplist.createHead(3);
   skiplist.insert(head,10,10,2);
   skiplist.insert(head,20,20,1);
   skiplist.insert(head,30,30,2);

   checkLevel(head,0,[30,20,10]);
   checkLevel(head,1,[30,10]);
   checkLevel(head,2,[]);
   expect(head.next[2]).not.toBeDefined();
});


test('find with path', () => {
   const head = skiplist.createHead(3);
   skiplist.insert(head,30,30,2);
   var node20 = skiplist.insert(head,20,20,1);
   skiplist.insert(head,10,10,2);

   var result =  skiplist.find(head,20);
   expect(result.node).toBe(node20);
   expect(result.nodeToLink).not.toBe(node20);

   expect(result.path[1].order).toBe(30);   
   
});

test('find value with path', () => {
   const head = skiplist.createHead(3);
   skiplist.insert(head,30,30,2);
   var node20 = skiplist.insert(head,20,20,1);
   skiplist.insert(head,10,10,2);

   var result =  skiplist.find(head,20);
   expect(result.node).toBe(node20);
   expect(result.nodeToLink).not.toBe(node20);

   expect(result.path[1].order).toBe(30);   
   expect(result.path[0]).toBeFalsy();
   expect(result.path[2]).toBeFalsy();
   
});

test('find value that has to be inserted at the tail', () => {
   const head = skiplist.createHead(3);
   skiplist.insert(head,30,30,2);
   skiplist.insert(head,20,20,1);
   var node10 = skiplist.insert(head,10,10,2);

   var result =  skiplist.find(head,5);
   expect(result.node).toBe(null);
   expect(result.nodeToLink).toBe(node10);

   expect(result.path[1].order).toBe(10);   
   expect(result.path[0].order).toBe(10);   
   //expect(result.path[2]).not.toBeDefined();
   
});


test('find value that has to be inserted at the tail - levels', () => {
   const head = skiplist.createHead(3);
   skiplist.insert(head,30,30,2);
   skiplist.insert(head,20,20,1);
   var node10 = skiplist.insert(head,10,10,1);

   var result =  skiplist.find(head,5);
   expect(result.node).toBe(null);
   expect(result.nodeToLink).toBe(node10);

   expect(result.path[1].order).toBe(30);   
   expect(result.path[0].order).toBe(10);   
   //expect(result.path[2]).not.toBeDefined();
   
});