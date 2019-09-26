// RADIAL TREE


// d3.json("../hierarchy.json", function(error, data) {
//     if (error) console.log(erorr);
//     console.log(data);
//     root = data;
//     root.x0 = height / 2;
//     root.y0 = 0;
//     root.children.forEach(collapse); // start with all children collapsed
//     update(root);
// });

// var diameter = 800;

// // RADIAL
// // var margin = {top: 350, right: 220, bottom: 20, left: 220},
// //     width = diameter,
// //     height = diameter;

// // TIDY
// var margin = { top: 20, right: 90, bottom: 30, left: 90 },
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
    
// var i = 0,
//     duration = 350,
//     root;

// // RADIAL
// // var tree = d3.layout.tree()
// //     .size([360, diameter / 2 - 80])
// //     // determines the space between each node to prevent overlap
// //     .nodeSize([15,])
// //     .separation(function(a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });

// // TIDY
// var tree = d3.layout.tree()
//       .size([height, width])
//       // determines the space between each node to prevent overlap
//       .nodeSize([15,])
//       .separation(function (a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });

// var diagonal = d3.svg.diagonal.radial()
//     .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

// var svg = d3.select("body").append("svg")
//     .attr("width", width )
//     .attr("height", height )
//   .append("g")
//     .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

// // root = pubs;
// // root.x0 = height / 2;
// // root.y0 = 0;

// // root.children.forEach(collapse); // start with all children collapsed
// // update(root);

// d3.select(self.frameElement).style("height", "800px");

// function update(source) {

//   // Compute the new tree layout.
//   var nodes = tree.nodes(root),
//       links = tree.links(nodes);

//   // Normalize for fixed-depth (length of the links)
//   nodes.forEach(function(d) { d.y = d.depth * 130; });

//   // Update the nodes…
//   var node = svg.selectAll("g.node")
//       .data(nodes, function(d) { return d.id || (d.id = ++i); });

//   // Enter any new nodes at the parent's previous position.
//   var nodeEnter = node.enter().append("g")
//       .attr("class", "node")
//       // does cool kind of blink and attach versus offshoot effect
//       // .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
//       .on("click", click);

//   // watch very closely when exapnding nodes and you can see this circle appear
//   nodeEnter.append("circle")
//       .attr("r", 1e-6)
//       .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

//   nodeEnter.append("text")
//       .attr("x", function(d) { return (d.size * 8); })
//       .attr("dy", ".35em")
//       .attr("text-anchor", "start")
//     //   .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
//       .text(function(d) { return d.name; })
//       .style("fill-opacity", 1e-6);

//   // Transition nodes to their new position.
//   var nodeUpdate = node.transition()
//       .duration(duration)
//       .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

//   nodeUpdate.select("circle")
//       // determines the size of the nodes
//       .attr("r", function (d) { return (d.size * 6); })
//       // determines the color of the nodes
//       .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

//   nodeUpdate.select("text")
//       .style("fill-opacity", 1)
//       .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50)  + ")"; });

//   // TODO: appropriate transform
//   var nodeExit = node.exit().transition()
//       .duration(duration)
//       // causes the nodes to appear as if they are returning to the root rather thatn their parent
//       //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
//       .remove();

//   nodeExit.select("circle")
//       .attr("r", 1e-6);

//   nodeExit.select("text")
//       .style("fill-opacity", 1e-6);

//   // Update the links…
//   var link = svg.selectAll("path.link")
//       .data(links, function(d) { return d.target.id; });

//   // Enter any new links at the parent's previous position.
//   link.enter().insert("path", "g")
//       .attr("class", "link")
//       .attr("d", function(d) {
//         var o = {x: source.x0, y: source.y0};
//         return diagonal({source: o, target: o});
//       });

//   // Transition links to their new position.
//   link.transition()
//       .duration(duration)
//       .attr("d", diagonal);

//   // Transition exiting nodes to the parent's new position.
//   link.exit().transition()
//       .duration(duration)
//       .attr("d", function(d) {
//         var o = {x: source.x, y: source.y};
//         return diagonal({source: o, target: o});
//       })
//       .remove();

//   // Stash the old positions for transition.
//   nodes.forEach(function(d) {
//     d.x0 = d.x;
//     d.y0 = d.y;
//   });
// }

// // Toggle children on click.
// function click(d) {
//   if (d.children) {
//     d._children = d.children;
//     d.children = null;
//   } else {
//     d.children = d._children;
//     d._children = null;
//   }
  
//   update(d);
// }

// // Collapse nodes
// function collapse(d) {
//   if (d.children) {
//       d._children = d.children;
//       d._children.forEach(collapse);
//       d.children = null;
//     }
// }


// // /////// NOTE ON IMAGES //////
// // // On mouseover, nodes as well as their children and parent should populate an image on the canvas of their corresponding glycan 
// // // Make links take in data to determine thickness (and maybe color); these would look at a different csv

// COLLAPSING TIDY TREE

// d3.json("../hierarchy.json", function(error, treeData) {
//     if (error) console.log(erorr);
//     console.log(treeData);
//     root = d3.hierarchy(treeData, function (d) { return d.children; });
//     root.x0 = height / 2;
//     root.y0 = 0;
//     root.children.forEach(collapse); // start with all children collapsed
//     update(root);
// });

// // Set the dimensions and margins of the diagram
// var margin = {top: 20, right: 90, bottom: 30, left: 90},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.right + margin.left)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate("
//           + margin.left + "," + margin.top + ")");

// var i = 0,
//     duration = 750,
//     root;

// // declares a tree layout and assigns the size
// var treemap = d3.tree().size([height, width]);

// // Assigns parent, children, height, depth
// // root = d3.hierarchy(treeData, function(d) { return d.children; });
// // root.x0 = height / 2;
// // root.y0 = 0;

// // Collapse after the second level
// // root.children.forEach(collapse);

// // update(root);

// // Collapse the node and all it's children
// function collapse(d) {
//   if(d.children) {
//     d._children = d.children
//     d._children.forEach(collapse)
//     d.children = null
//   }
// }

// function update(source) {

//   // Assigns the x and y position for the nodes
//   var treeData = treemap(root);

//   // Compute the new tree layout.
//   var nodes = treeData.descendants(),
//       links = treeData.descendants().slice(1);

//   // Normalize for fixed-depth.
//   nodes.forEach(function(d){ d.y = d.depth * 180});

//   // ****************** Nodes section ***************************

//   // Update the nodes...
//   var node = svg.selectAll('g.node')
//       .data(nodes, function(d) {return d.id || (d.id = ++i); });

//   // Enter any new modes at the parent's previous position.
//   var nodeEnter = node.enter().append('g')
//       .attr('class', 'node')
//       .attr("transform", function(d) {
//         return "translate(" + source.y0 + "," + source.x0 + ")";
//     })
//     .on('click', click);

//   // Add Circle for the nodes
//   nodeEnter.append('circle')
//       .attr('class', 'node')
//       .attr('r', 1e-6)
//       .style("fill", function(d) {
//           return d._children ? "lightsteelblue" : "#fff";
//       });

//   // Add labels for the nodes
//   nodeEnter.append('text')
//       .attr("dy", ".35em")
//       .attr("x", function(d) {
//           return d.children || d._children ? -13 : 13;
//       })
//       .attr("text-anchor", function(d) {
//           return d.children || d._children ? "end" : "start";
//       })
//       .text(function(d) { return d.data.name; });

//   // UPDATE
//   var nodeUpdate = nodeEnter.merge(node);

//   // Transition to the proper position for the node
//   nodeUpdate.transition()
//     .duration(duration)
//     .attr("transform", function(d) { 
//         return "translate(" + d.y + "," + d.x + ")";
//      });

//   // Update the node attributes and style
//   nodeUpdate.select('circle.node')
//     .attr('r', 10)
//     .style("fill", function(d) {
//         return d._children ? "lightsteelblue" : "#fff";
//     })
//     .attr('cursor', 'pointer');


//   // Remove any exiting nodes
//   var nodeExit = node.exit().transition()
//       .duration(duration)
//       .attr("transform", function(d) {
//           return "translate(" + source.y + "," + source.x + ")";
//       })
//       .remove();

//   // On exit reduce the node circles size to 0
//   nodeExit.select('circle')
//     .attr('r', 1e-6);

//   // On exit reduce the opacity of text labels
//   nodeExit.select('text')
//     .style('fill-opacity', 1e-6);

//   // ****************** links section ***************************

//   // Update the links...
//   var link = svg.selectAll('path.link')
//       .data(links, function(d) { return d.id; });

//   // Enter any new links at the parent's previous position.
//   var linkEnter = link.enter().insert('path', "g")
//       .attr("class", "link")
//       .attr('d', function(d){
//         var o = {x: source.x0, y: source.y0}
//         return diagonal(o, o)
//       });

//   // UPDATE
//   var linkUpdate = linkEnter.merge(link);

//   // Transition back to the parent element position
//   linkUpdate.transition()
//       .duration(duration)
//       .attr('d', function(d){ return diagonal(d, d.parent) });

//   // Remove any exiting links
//   var linkExit = link.exit().transition()
//       .duration(duration)
//       .attr('d', function(d) {
//         var o = {x: source.x, y: source.y}
//         return diagonal(o, o)
//       })
//       .remove();

//   // Store the old positions for transition.
//   nodes.forEach(function(d){
//     d.x0 = d.x;
//     d.y0 = d.y;
//   });

//   // Creates a curved (diagonal) path from parent to the child nodes
//   function diagonal(s, d) {

//     path = `M ${s.y} ${s.x}
//             C ${(s.y + d.y) / 2} ${s.x},
//               ${(s.y + d.y) / 2} ${d.x},
//               ${d.y} ${d.x}`

//     return path
//   }

//   // Toggle children on click.
//   function click(d) {
//     if (d.children) {
//         d._children = d.children;
//         d.children = null;
//       } else {
//         d.children = d._children;
//         d._children = null;
//       }
//     update(d);
//   }
// }

// TIDY TREE STATIC

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  g = svg.append("g").attr("transform", "translate(40,0)");

var tree = d3.tree()
  .size([height - 400, width - 160]);

var cluster = d3.cluster()
  .size([height, width - 160]);

var stratify = d3.stratify()
  .parentId(function (d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

d3.json("../hierarchy.json", function (error, data) {
  if (error) throw error;

  var root = stratify(data)
    .sort(function (a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

  cluster(root);

  var link = g.selectAll(".link")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);

  var node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

  node.append("circle")
    .attr("r", 2.5);

  node.append("text")
    .attr("dy", 3)
    .attr("x", function (d) { return d.children ? -8 : 8; })
    .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
    .text(function (d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });

  d3.selectAll("input")
    .on("change", changed);

  var timeout = setTimeout(function () {
    d3.select("input[value=\"tree\"]")
      .property("checked", true)
      .dispatch("change");
  }, 1000);

  function changed() {
    timeout = clearTimeout(timeout);
    (this.value === "tree" ? tree : cluster)(root);
    var t = d3.transition().duration(750);
    node.transition(t).attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });
    link.transition(t).attr("d", diagonal);
  }
});

function diagonal(d) {
  return "M" + d.y + "," + d.x
    + "C" + (d.parent.y + 100) + "," + d.x
    + " " + (d.parent.y + 100) + "," + d.parent.x
    + " " + d.parent.y + "," + d.parent.x;
}
