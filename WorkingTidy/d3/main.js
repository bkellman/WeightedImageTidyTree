// https://observablehq.com/d/3db20e78745501fb@347
export default function define(runtime, observer) {
  const main = runtime.module();
// This block of code is responsible for appending a section of markup at the top of the page
//   main.variable(observer()).define(["md"], function(md){return(
// md`# Collapsible Tree

// Click a black node to expand or collapse [the tree](/@d3/tidy-tree).`
// )});
  main.variable(observer("chart")).define("chart", ["d3","data","dy","margin","width","dx","tree","diagonal"], function(d3,data,dy,margin,width,dx,tree,diagonal)
{
  const root = d3.hierarchy(data);

  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  const svg = d3.create("svg")
      .attr("viewBox", [-margin.left, -margin.top, width, dx])
      .style("font", "10px sans-serif")
      .style("user-select", "none");

  const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

  const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

  function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();

    // Compute the new tree layout.
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;

    const transition = svg.transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    // Update the nodes…
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", d => {
          d.children = d.children ? null : d._children;
          update(d);
        });

    nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);

        // this will size the nodes by value
        /* 
        .attr("r", function (d) { return d.data.size * 2.5; })
        */

        // this will color the border of the nodes by value
        /*
        .style("stroke", "red")
        */

    nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -6 : 6)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
      .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

    // nodeEnter.append("image")
    //     .attr("xlink:href", function (d) { return d.data.img; })
    //     .attr("x", function (d) { return -6; })
    //     .attr("y", function (d) { return -6; })
    //     .attr("height", 12)
    //     .attr("width", 12);

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    // Update the links…
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        });

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  update(root);

  return svg.node();
}
);
  main.variable(observer("diagonal")).define("diagonal", ["d3"], function(d3){return(
d3.linkHorizontal().x(d => d.y).y(d => d.x)
)});
  main.variable(observer("tree")).define("tree", ["d3","dx","dy"], function(d3,dx,dy){return(
d3.tree().nodeSize([dx, dy])
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
// d3.json("https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json")
d3.json("https://raw.githubusercontent.com/bkellman/WeightedImageTidyTree/master/BenTree%20Converter/hierarchy.json")
)});
  main.variable(observer("dx")).define("dx", function(){return(
10
)});
  main.variable(observer("dy")).define("dy", ["width"], function(width){return(
width / 6
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 10, right: 120, bottom: 10, left: 40}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}


/* THINGS THAT WERE REQUESTED
1. a legend that toggles different attributes
2. zoomable nodes
  the current formatting script is assuming all nodes are a "root" rather than 
  just parents so X1 -> X2 -> X3 is showing X1 and X2 as separate roots
3. color the border of the nodes by a value
4. size the nodes by a value
5. color the edges by a value
6. size the edges by a value
7. toggled image reveal rather than static (show the immediate children
  and parents) (a want)
8. I am just adding this comment to test out git staging
*/