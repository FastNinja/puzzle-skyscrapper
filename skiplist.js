
var linkedListHead = {
    value: "ROOT",
    order: 1000000,
    next: []
};



function coinFlip() {
    return Math.random() >= 0.5;
}

function getLevels(currentHighestLevel, maxLevel) {

    var level = 1;
    while (level <= currentHighestLevel && coinFlip() && level <= maxLevel) {
        level++;
    }

    return level;
}


function find(head, order) {
  console.info("--searching ",  order);
    var currentNode = head;
    var path = [];
    for (var level = head.currentHighestLevel-1; level >=0 ; level--) {
        var result = findInLinkedList(currentNode, level, order)
        if(result.match == "exact"){
            console.log("found on level !",level,result.node.order);
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
       node:null,
       nodeToLink:currentNode
    }
}

function findInLinkedList(head, level, order) {

    var current = head;
    while (current.next[level]) {
        var nextNode = current.next[level];
        console.warn("visiting node:", current.order, " on level:",level);
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


function printLinkedList(head, level) {
    console.info("---level ", level);
    var current = head;
    while (current) {
        console.log("Node:", current.order, current.value);
        current = current.next[level];
    }

    console.info("--end of level ", level);
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


function insert(head, order, value, newNodeLevels) {

    if(!newNodeLevels){
        newNodeLevels = getLevels(head.currentHighestLevel,head.maxLevel);


    }else if(newNodeLevels > head.maxLevel){
        throw new Error("too many levels. maximum possible level:",head.maxLevel);
    }

    if (newNodeLevels > head.currentHighestLevel) {
        head.currentHighestLevel = newNodeLevels;
        console.warn("current highest level:",head.currentHighestLevel);
    }


    console.log("inserting..", order, " it will have levels:", newNodeLevels);
    var newNode = {
        order: order,
        value: value,
        next: []         // levels
    };

    for (var level = 0; level < newNodeLevels; level++) {
        insertIntoLinked(head, newNode, level);
    }
    return newNode;
}

const MAX_LEVEL = 5;

function createHead(maxLevel) {
    return linkedListHead = {
        value: "ROOT",
        order: 1000000,
        next: [],
        maxLevel : maxLevel || MAX_LEVEL,
        currentHighestLevel : 1
    };

}

module.exports = {
    createHead,
    printLinkedList,
    insert,
    find
};