const MAX_LEVEL = 5;


var linkedListHead = {
    value: "ROOT",
    order: 1000000,
    next: []
};

var currentHighestLevel = 1;

console.log("hello");

insert(linkedListHead, 10, 10);
insert(linkedListHead, 30, 30);
insert(linkedListHead, 20, 20);
insert(linkedListHead, 60, 60);
insert(linkedListHead, 40, 40);
insert(linkedListHead, 50, 50);
// insertIntoLinked(linkedListHead,  { order:2, value:2, next:[]}, 0);
// insertIntoLinked(linkedListHead,  { order:1, value:1, next:[]}, 0);
// insertIntoLinked(linkedListHead,  { order:10, value:10, next:[]}, 0);

for (var i = 0; i < currentHighestLevel; i++) {
    printLinkedList(linkedListHead, i);
}

var result = find(linkedListHead,10);
console.log(JSON.stringify(result));
//findInLinkedList(linkedListHead,0,60);
//find(linkedListHead,10);
// find(linkedListHead,20);
// find(linkedListHead,11);
// find(linkedListHead,51);

function coinFlip() {
    return Math.random() >= 0.5;
}

//  Node

function getLevels() {

    var level = 1;
    while (level <= currentHighestLevel && coinFlip() && level <= MAX_LEVEL) {
        level++;
    }

    if (level > currentHighestLevel) {
        currentHighestLevel = level;
        console.log("current highest ", currentHighestLevel);
    }

    return level;
}

function printLinkedList(head, level) {
    console.info("---level ", level);
    var current = head;
    while (current) {
        console.log("Node:", current.order, current.value);
        current = current.next[level];
    }

    console.info("--end of level ", level);
}

function find(head, order) {
  console.info("--searching ",  order);
    var currentNode = head;
    var path = [];
    for (var level = currentHighestLevel-1; level >=0 ; level--) {
        var result = findInLinkedList(currentNode, level, order)
        if(result.match == "exact"){
            console.log("found!",result);
            return {
                path:path,
                node:result.node
            }
        }

        if(result.match == "next"){
            console.log("found next ",result.node.order," moving one level down. current level:",level);
            path[level] = result.node;
            currentNode = result.node;
        }
    }

    console.log("not found but nodeToLink will be", JSON.stringify(currentNode));

    return {
       path:path,
       node:null
    }
}

function findInLinkedList(head, level, order) {

    var current = head;
    while (current.next[level]) {
        var nextNode = current.next[level];
        console.warn("visiting node:", current.order);
        if (nextNode && nextNode.order == order) {
            return {
                match: "exact",
                node: nextNode        //hooray found it!
            };
        }


        if (nextNode && nextNode.order < order) {
            return {
                match: "next",
                node: current        //hooray found it!
            };
        }

        current = current.next[level];
    }

    return {
        match: "next",
        node: current 
    };// all elelments are smaller

}

function insertIntoLinked(head, newNode, level) {

    console.info("inserting", JSON.stringify(newNode), "into level:", level);

    var current = head;
    while (current.next[level]) {
        var nextNode = current.next[level];

        if (nextNode && nextNode.order < newNode.order) {
            break; // this is the place next.order > new Node but current.order was < 
        }

        current = current.next[level];
    }

    // found the place to insert - between current and next
    newNode.next[level] = current.next[level];
    current.next[level] = newNode;
}


function insert(head, order, value) {

    var newNodeLevels = getLevels();
    console.log("inserting..", order, " it will have levels:", newNodeLevels);
    var newNode = {
        order: order,
        value: value,
        next: []         // levels
    };

    for (var level = 0; level < newNodeLevels; level++) {
        insertIntoLinked(head, newNode, level);
    }
}



