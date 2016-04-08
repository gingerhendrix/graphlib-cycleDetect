import {cycleDetect} from '../lib/index'
import {Graph} from 'graphlib'
import expect from 'expect.js'

describe("Cycle Detect", function(){

  describe("with an empty graph", function(){
    let graph = new Graph()

    it("Should return an empty array", function(){
      let cycles = cycleDetect(graph);

      expect(cycles).to.be.an(Array)
      expect(cycles.length).to.be(0)
    });
  });

  describe("with the graph 1 -> 1", function(){
    let graph = new Graph()

    beforeEach(function(){
      graph = new Graph()
      graph.setNode("1")
      graph.setEdge("1", "1")
    })

    it("Should have 1 cycle ['1']", function(){
      let cycles = cycleDetect(graph);

      expect(cycles).to.be.an(Array)
      expect(cycles.length).to.be(1)

      expect(cycles[0]).to.be.an(Array)
      expect(cycles[0].length).to.be(1)
      expect(cycles[0][0]).to.be('1')
    });

  });

  describe("with the graph 1 -> 2 -> 3 -> 1", function(){
    let graph = new Graph()

    beforeEach(function(){
      graph = new Graph()
      graph.setNode("1")
      graph.setNode("2")
      graph.setNode("3")
      graph.setEdge("1", "2")
      graph.setEdge("2", "3")
      graph.setEdge("3", "1")
    })

    it("Should have 1 cycle ['1', '2', '3']", function(){
      let cycles = cycleDetect(graph);

      expect(cycles).to.be.an(Array)
      expect(cycles.length).to.be(1)

      expect(cycles[0]).to.be.an(Array)
      expect(cycles[0].length).to.be(3)
      expect(cycles[0]).to.contain('1')
      expect(cycles[0]).to.contain('2')
      expect(cycles[0]).to.contain('3')
    });

  });

  describe("with the graph 1 -> 2 -> 3 -> 2", function(){
    let graph = new Graph()

    beforeEach(function(){
      graph = new Graph()
      graph.setNode("1")
      graph.setNode("2")
      graph.setNode("3")
      graph.setEdge("1", "2")
      graph.setEdge("2", "3")
      graph.setEdge("3", "2")
    })

    it("Should have 1 cycle ['2', '3']", function(){
      let cycles = cycleDetect(graph);

      expect(cycles).to.be.an(Array)
      console.log("Cycles", cycles)
      expect(cycles.length).to.be(1)

      expect(cycles[0]).to.be.an(Array)
      expect(cycles[0].length).to.be(2)
      expect(cycles[0]).to.contain('2')
      expect(cycles[0]).to.contain('3')
    });

  });

 describe("with the graph 1 -> 2 -> 3, 2 -> 1, 3 -> 1", function(){
    let graph = new Graph()

    beforeEach(function(){
      graph = new Graph()
      graph.setNode("1")
      graph.setNode("2")
      graph.setNode("3")
      graph.setEdge("1", "2")
      graph.setEdge("2", "3")
      graph.setEdge("2", "1")
      graph.setEdge("3", "1")
    })

    it("Should have 2 cycles ['1', '2'], ['1', '2', '3']", function(){
      let cycles = cycleDetect(graph);

      expect(cycles).to.be.an(Array)
      console.log("Cycles", cycles)
      expect(cycles.length).to.be(2)

    });

  });

});
