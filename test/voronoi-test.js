import tape from "@observablehq/tape";
import Delaunay from "../src/delaunay.js";
import Context from "./context";

tape("voronoi.renderCell(i, context) is a noop for coincident points", test => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
  test.equal(voronoi.renderCell(3, {}), undefined);
});

tape("voronoi.renderCell(i, context) handles midpoint coincident with circumcenter", test => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1]]).voronoi([-1, -1, 2, 2]);
  let context = new Context;
  test.equal((voronoi.renderCell(0, context), context.toString()), `M-1,-1L0.5,-1L0.5,0.5L-1,0.5Z`);
  test.equal((voronoi.renderCell(1, context), context.toString()), `M2,-1L2,2L0.5,0.5L0.5,-1Z`);
  test.equal((voronoi.renderCell(2, context), context.toString()), `M-1,2L-1,0.5L0.5,0.5L2,2Z`);
});

tape("voronoi.contains(i, x, y) is false for coincident points", test => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
  test.equal(voronoi.contains(3, 1, 0), false);
  test.equal(voronoi.contains(1, 1, 0), true);
});
