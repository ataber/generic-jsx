"use strict";

class BinaryTree {
  constructor({value, children, operation}) {
    this.value = value;
    this.operation = operation;
    if (children.length == 0 || !operation) {
      this.computed = true;
    } else {
      this.computed = false;
    }

    this.children = children;
  }
  render() {
    if (!this.computed) {
      this.children.map((n) => {
        if (!n.computed) {
          return n.render();
        } else {
          return n.value;
        }
      })
      this.value = this.operation(...this.children.map((n) => { return n.value; }));
      this.computed = true;
    }

    return this.value;
  }
}

module.exports = BinaryTree;
