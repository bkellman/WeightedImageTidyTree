// https://observablehq.com/d/2944ddfd576b076f@132
export default function define(runtime, observer) {
  const main = runtime.module();

  main.variable(observer("chart")).define("chart", ["tree","data","d3","width"], function(tree,data,d3,width)
{
  const root = tree(data);

  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);
  
  const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);
    
  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));
  
  const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
    .clone(true).lower()
      .attr("stroke", "white");
  
  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
    d3.json("https://gist.githubusercontent.com/TylerReaganUCSD/6f072c82cf29ce3d874b2e36a2486848/raw/cf8b0bda4e6418635bd4f8816d460a55042bd334/benTree.json")
)});
  main.variable(observer("tree")).define("tree", ["d3","width"], function(d3,width){return(
data => {
  const root = d3.hierarchy(data);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
}
)});
  main.variable(observer("width")).define("width", function(){return(
932
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
