import graphlib from 'graphlib'

export function cycleDetect(digraph){
  let components = graphlib.alg.tarjan(digraph)

  //console.log("Components", components);

  let cycles = components.map( function(component){ return findCyclesInComponent(digraph, component) });

  return cycles.reduce( function(a, b){ return a.concat(b) }, []);
}

function findCyclesInComponent(digraph, component){
  let node = component[0];
  let visited = [];
  let cycles = []

  depthFirstCycleSearch(digraph, node, component,  visited, cycles)

  return cycles;
}

function depthFirstCycleSearch(digraph, node, component, visited, cycles){
  //console.log("Visiting", node, visited, component);
  let loopIndex = visited.indexOf(node)
  if(loopIndex > -1){
    //console.log("Loop at ", node, loopIndex, visited);
    cycles.push(visited.slice(loopIndex))
  }else{
    visited.push(node)
    digraph.successors(node).forEach(function(next){
      if(component.indexOf(next) > -1){
        depthFirstCycleSearch(digraph, next, component, visited, cycles);
      }
    });
  }
}
