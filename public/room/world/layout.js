// One block = one metre. x east, z south, y up.

// The island the gallery sits on.
export const ISLAND = { x0: -28, x1: 29, z0: -25, z1: 27 };

// Walkable interior of the gallery. The shell is built at its edge.
export const HOUSE = { x0: -10, x1: 10, z0: -7, z1: 9, height: 7 };

// The visitor starts inside, facing the five posters on the north wall.
export const SPAWN = { x: 0.5, z: 6.0, heading: Math.PI };

// Opening shot: high over the lawn, looking through the open roof into the room.
export const INTRO = {
  pos: [17, 12, 19],
  portrait: [20, 17, 27],
  look: [0, 2.2, -3],
};

// Five exhibits, left to right, in the same order as the site.
export const STATIONS = [
  { id: 'yinguo', name: '影游工坊', en: 'YINGUO STUDIO', at: [-8, -2.7], look: [-8, -7] },
  { id: 'studio', name: 'Dara Studio', en: 'DARA STUDIO', at: [-4, -2.7], look: [-4, -7] },
  { id: 'matrix', name: '量产矩阵', en: 'MATRIX', at: [0, -2.7], look: [0, -7] },
  { id: 'social', name: '自媒体矩阵', en: 'OWNED MEDIA', at: [4, -2.7], look: [4, -7] },
  { id: 'factory', name: '内容工厂', en: 'CONTENT ENGINE', at: [8, -2.7], look: [8, -7] },
];

// A small, warm light volume around the room keeps the bake cheap.
export const LIGHT_VOLUME = {
  min: [-11, -1, -9],
  extent: [22, 10, 20],
  size: [22, 10, 20],
};

// Trees live outside the glass walls.
export const TREES = [
  [-18, -13],
  [18, -10],
  [-19, 12],
  [20, 13],
];
