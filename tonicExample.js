/* @jsx (curry(_=>eval(_))) */
var { curry, from } = require("./generic-jsx");
var BinaryTree = require("./binary-tree");

var Division = <BinaryTree operation={(a,b) => {return a/b}}/>;
var Addition = <BinaryTree operation={(a,b) => {return a+b}}/>;
var Number = <BinaryTree value = { from(0) }/>;


console.log(
<Division>
  { Number(5) }
  <Addition>
      { Number(4) }
      { Number(6) }
  </Addition>
</Division>().render())
