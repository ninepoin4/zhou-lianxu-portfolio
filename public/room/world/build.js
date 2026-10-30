// The five-exhibit gallery. Everything here is built from the same voxel and
// box primitives as the rest of the world, so the room reads as a Minecraft
// place rather than a webpage with a 3D background.

import * as THREE from 'three';
import { BoxBatch } from '@engine/world/blocks.js';
import { buildIsland } from '@engine/world/terrain.js';
import { buildForest } from '@engine/world/landscape.js';
import * as L from '@world/layout.js';

const NORTH = -8;
const SOUTH = 9;
const WEST = -11;
const EAST = 10;
const WALL_TOP = 7;

const POSTERS = [
  { id: 'yinguo', index: '01', title: '影游工坊', en: 'YINGUO STUDIO', file: 'yinguo.jpg' },
  { id: 'studio', index: '02', title: 'Dara Studio', en: 'DARA STUDIO', file: 'studio.jpg' },
  { id: 'matrix', index: '03', title: '量产矩阵', en: 'MATRIX', file: 'matrix.jpg' },
  { id: 'social', index: '04', title: '自媒体矩阵', en: 'OWNED MEDIA', file: 'social.jpg' },
  { id: 'factory', index: '05', title: '内容工厂', en: 'CONTENT ENGINE', file: 'factory.jpg' },
];

const inside = (x, z) => x >= L.HOUSE.x0 - 1 && x < L.HOUSE.x1 + 1 && z >= L.HOUSE.z0 - 1 && z < L.HOUSE.z1 + 1;
const onPath = (x, z) => Math.abs(x + 0.5) < 2.4 && z > SOUTH;

function surfaceAt(x, z) {
  if (inside(x, z)) return 'planks';
  if (onPath(x, z)) return 'travertine';
  return 'grass';
}

function canvas(size, draw) {
  const c = document.createElement('canvas');
  c.width = size[0];
  c.height = size[1];
  draw(c.getContext('2d'), c.width, c.height);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function labelTexture(poster) {
  return canvas([1024, 176], (ctx, w, h) => {
    ctx.fillStyle = '#171611';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#c8763c';
    ctx.fillRect(0, h - 4, w, 4);
    ctx.fillStyle = '#c8763c';
    ctx.font = '400 22px "DM Mono", monospace';
    ctx.textBaseline = 'middle';
    ctx.fillText(poster.index, 32, h / 2 + 2);
    ctx.fillStyle = '#eae4d5';
    ctx.font = '300 66px "Songti SC", "Noto Serif SC", serif';
    ctx.fillText(poster.title, 92, h / 2 + 2);
    ctx.fillStyle = 'rgba(234,228,213,.48)';
    ctx.font = '400 16px "DM Mono", monospace';
    const en = poster.en;
    ctx.fillText(en, w - ctx.measureText(en).width - 30, h / 2 + 2);
  });
}

function textPlane(text, width, height, options = {}) {
  const { dark = true, size = 54, mono = false } = options;
  const texture = canvas([1024, Math.round(1024 * height / width)], (ctx, w, h) => {
    if (dark) {
      ctx.fillStyle = '#171611';
      ctx.fillRect(0, 0, w, h);
    }
    ctx.fillStyle = dark ? '#eae4d5' : '#171611';
    ctx.font = `${mono ? '400' : '300'} ${size}px ${mono ? '"DM Mono", monospace' : '"Songti SC", "Noto Serif SC", serif'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2);
  });
  return new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, toneMapped: false }),
  );
}

function floorTexture() {
  return canvas([512, 2048], (ctx, w, h) => {
    ctx.fillStyle = '#171611';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(234,228,213,.22)';
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 18, w - 36, h - 36);
    ctx.strokeStyle = '#c8763c';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(46, h * .5);
    ctx.lineTo(w - 46, h * .5);
    ctx.stroke();
    ctx.save();
    ctx.translate(w / 2, h * .5);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = 'rgba(234,228,213,.55)';
    ctx.font = '400 22px "DM Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('05 STATIONS  /  ZHOU LIANXU  /  2026', 0, 0);
    ctx.restore();
    ctx.fillStyle = '#c8763c';
    ctx.font = '300 110px "Songti SC", serif';
    ctx.textAlign = 'center';
    ctx.fillText('05', w / 2, 120);
  });
}

export function build({ grid, layer, materials }) {
  buildIsland(grid, L.ISLAND, { surfaceAt, seed: 23, corner: 5, wobble: .55 });
  const forest = buildForest(grid, layer, L.TREES);

  // ---------- shell ----------
  // A low charcoal wainscot, limewashed walls, glass on the sides, and a log
  // post at every corner. Every wall is its own hideable group.
  const wall = (x0, y0, z0, x1, y1, z1, name = 'travertine', group = 'wall') =>
    grid.fill(x0, y0, z0, x1, y1, z1, name, group);

  // North: the five-poster wall.
  wall(WEST, 1, NORTH, EAST + 1, WALL_TOP, NORTH + 1, 'travertine', 'wallN');
  wall(WEST, 0, NORTH, EAST + 1, 1, NORTH + 1, 'deepslate', 'wallN');

  // South: a door in the middle and a tall window on either side.
  wall(WEST, 0, SOUTH, EAST + 1, WALL_TOP, SOUTH + 1, 'travertine', 'wallS');
  wall(WEST, 0, SOUTH, EAST + 1, 1, SOUTH + 1, 'deepslate', 'wallS');
  for (const [a, b] of [[-8, -4], [4, 8]]) {
    grid.fill(a, 1, SOUTH, b, 5, SOUTH + 1, 'glass', 'wallS');
  }
  // Doorway two blocks wide, three high.
  grid.fill(-1, 0, SOUTH, 2, 3, SOUTH + 1, null, 'wallS');
  // Door posts and lintel.
  for (const x of [-2, 2]) grid.fill(x, 0, SOUTH, x + 1, 3, SOUTH + 1, 'log', 'wallS');
  grid.fill(-2, 3, SOUTH, 3, 4, SOUTH + 1, 'log', 'wallS');

  // East and west: long glass windows, framed by posts.
  for (const [x, group] of [[WEST, 'wallW'], [EAST, 'wallE']]) {
    wall(x, 0, NORTH, x + 1, WALL_TOP, SOUTH + 1, 'travertine', group);
    wall(x, 0, NORTH, x + 1, 1, SOUTH + 1, 'deepslate', group);
    for (const [a, b] of [[-5, -2], [2, 5]]) grid.fill(x, 1, a, x + 1, 5, b, 'glass', group);
    for (const z of [-6, -1, 4, 8]) grid.fill(x, 0, z, x + 1, 5, z + 1, 'log', group);
  }
  for (const [x, z] of [[WEST, NORTH], [WEST, SOUTH], [EAST, NORTH], [EAST, SOUTH]]) {
    grid.fill(x, 0, z, x + 1, WALL_TOP + 1, z + 1, 'log', z === NORTH ? 'wallN' : 'wallS');
  }

  // Roof: glass panels with a few heavy beams. The camera cuts it away when
  // the visitor is inside, which is the room's best light source.
  grid.fill(WEST, WALL_TOP, NORTH, EAST + 1, WALL_TOP + 1, SOUTH + 1, 'glass', 'roof');
  for (const x of [-10, -5, 0, 5, 9]) grid.fill(x, WALL_TOP, NORTH, x + 1, WALL_TOP + 1, SOUTH + 1, 'log', 'roof');
  for (const z of [-7, -2, 3, 8]) grid.fill(WEST, WALL_TOP, z, EAST + 1, WALL_TOP + 1, z + 1, 'log', 'roof');

  // A stone plinth around the room, leaving the door clear.
  for (let x = WEST - 1; x <= EAST + 1; x++) {
    for (const z of [NORTH - 1, SOUTH + 1]) {
      if (!(z === SOUTH + 1 && x >= -1 && x <= 2)) grid.set(x, 0, z, 'stone', 'static');
    }
  }
  for (let z = NORTH - 1; z <= SOUTH + 1; z++) {
    for (const x of [WEST - 1, EAST + 1]) grid.set(x, 0, z, 'stone', 'static');
  }

  const batch = new BoxBatch(layer);
  const planes = [];
  const obstacles = [];
  const hotspots = [];
  const bakes = [];
  const lights = [];

  const foot = (x, z, w, d, level = 0) =>
    obstacles.push({ x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, level });

  // ---------- five framed posters ----------
  const posterZ = -6.93;
  const posterY = 3.08;
  const posterW = 3.24;
  const posterH = 1.8;
  const xs = [-8, -4, 0, 4, 8];

  for (let i = 0; i < POSTERS.length; i++) {
    const poster = POSTERS[i];
    const x = xs[i];

    // Dark backing board, then four thin rails around the print.
    batch.box(x, posterY - posterH / 2 - .13, posterZ - .08, posterW + .34, posterH + .3, .12, { tex: 'deepslate' });
    const rail = { tex: 'log', tint: 0x8b7355 };
    batch.box(x, posterY + posterH / 2 + .02, posterZ, posterW + .34, .11, .12, rail);
    batch.box(x, posterY - posterH / 2 - .13, posterZ, posterW + .34, .11, .12, rail);
    batch.box(x - posterW / 2 - .17, posterY - posterH / 2 - .02, posterZ, .11, posterH + .18, .12, rail);
    batch.box(x + posterW / 2 + .17, posterY - posterH / 2 - .02, posterZ, .11, posterH + .18, .12, rail);

    const texture = new THREE.TextureLoader().load(`./assets/posters/${poster.file}`);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const image = new THREE.Mesh(
      new THREE.PlaneGeometry(posterW, posterH),
      new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
    );
    image.position.set(x, posterY, posterZ + .03);
    image.userData.group = 'static';
    planes.push(image);

    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(3.1, .53),
      new THREE.MeshBasicMaterial({ map: labelTexture(poster), toneMapped: false }),
    );
    label.position.set(x, 1.86, posterZ + .02);
    label.userData.group = 'static';
    planes.push(label);

    // A low plinth, with a small physical token of each project on top.
    batch.box(x, 0, -6.08, 2.35, .74, .88, { tex: 'deepslate' });
    batch.box(x, .74, -6.08, 2.45, .08, .98, { tex: 'travertine' });
    foot(x, -6.08, 2.55, 1.08);
    hotspots.push({
      id: poster.id,
      box: new THREE.Box3(new THREE.Vector3(x - 1.9, .5, -7.3), new THREE.Vector3(x + 1.9, 4.3, -5.45)),
    });

    const top = .82;
    if (poster.id === 'yinguo') {
      // A five-node graph: four small blocks, linked like the structure editor.
      const nodes = [[-.55, .02], [-.2, .2], [.2, .2], [.55, .02]];
      for (let k = 0; k < nodes.length; k++) {
        batch.box(x + nodes[k][0], top + nodes[k][1], -6.08, .2, .2, .2, {
          tex: k === 1 ? 'travertine' : 'deepslate',
          tint: k === 1 ? 0xc8763c : 0xffffff,
        });
      }
      batch.box(x - .36, top + .1, -6.08, .32, .04, .04, { tex: 'travertine', tint: 0xc8763c });
      batch.box(x + .02, top + .1, -6.08, .32, .04, .04, { tex: 'travertine', tint: 0xc8763c });
    } else if (poster.id === 'studio') {
      batch.box(x, top, -6.08, .92, .09, .52, { tex: 'travertine' });
      batch.box(x, top + .09, -6.08, .78, .09, .46, { tex: 'deepslate', tint: 0xb26f45 });
      batch.box(x, top + .18, -6.08, .64, .09, .4, { tex: 'travertine' });
      batch.box(x + .04, top + .27, -6.1, .55, .42, .06, { tex: 'deepslate' });
    } else if (poster.id === 'matrix') {
      for (let k = 0; k < 4; k++) {
        batch.box(x - .52 + k * .34, top, -6.08, .24, .24 + (k % 2) * .1, .24, {
          tex: k % 2 ? 'travertine' : 'deepslate',
          tint: k % 2 ? 0xc8763c : 0xffffff,
        });
      }
    } else if (poster.id === 'social') {
      batch.box(x - .24, top, -6.08, .3, .78, .07, { tex: 'deepslate', tint: 0x6aa7d9 });
      batch.box(x + .24, top, -6.08, .3, .78, .07, { tex: 'deepslate', tint: 0xe15a86 });
      batch.box(x, top, -6.04, .78, .05, .22, { tex: 'travertine' });
    } else if (poster.id === 'factory') {
      for (let k = 0; k < 3; k++) {
        batch.box(x - .45 + k * .45, top, -6.08, .34, .58, .05, {
          tex: k === 1 ? 'travertine' : 'deepslate',
          tint: k === 1 ? 0xc8763c : 0xffffff,
        });
      }
    }

    // A little brass picture light over the frame.
    batch.box(x, 4.22, -6.82, .92, .08, .26, { tex: 'travertine', tint: 0xc8955f, emissive: .35 });

    // Warm pendant over each exhibit, plus the baked fill it leaves in the room.
    batch.box(x, 5.65, -2.2, .48, .42, .48, { tex: 'travertine', tint: 0xffcf9b, emissive: .9 });
    batch.box(x, 6.07, -2.2, .06, 1.0, .06, { tex: 'deepslate' });
    bakes.push({ position: [x, 5.1, -2.0], power: 1.7, radius: 10.5 });
  }

  // ---------- room furniture ----------
  // A long, low bench on the central runner.
  const benchX = 0, benchZ = 2.7;
  batch.box(benchX, .38, benchZ, 6.2, .18, 1.3, { tex: 'wood_floor' });
  for (const x of [-2.5, 2.5]) for (const z of [benchZ - .45, benchZ + .45]) {
    batch.box(x, 0, z, .2, .38, .2, { tex: 'deepslate' });
  }
  foot(benchX, benchZ, 6.4, 1.5);

  // Planters by the door.
  for (const x of [-9.1, 9.1]) {
    batch.box(x, 0, 7.5, 1.45, .72, 1.45, { tex: 'travertine' });
    batch.box(x, .72, 7.5, 1.25, .05, 1.25, { tex: 'deepslate' });
    for (let k = 0; k < 4; k++) {
      batch.box(x + (k % 2 ? .3 : -.3), .77 + (k % 2) * .22, 7.5 + (k > 1 ? .28 : -.28), .38, .55, .38, {
        tex: 'hedge', tint: k % 2 ? 0x8daa91 : 0xa8bd98,
      });
    }
    foot(x, 7.5, 1.65, 1.65);
  }

  // A low console under the west window, and a reading chair by the east one.
  batch.box(-9.2, 0, 1.0, .85, 1.05, 2.6, { tex: 'deepslate' });
  batch.box(-9.2, 1.05, 1.0, .95, .08, 2.7, { tex: 'travertine' });
  foot(-9.2, 1.0, 1.1, 2.8);
  batch.box(8.7, 0, 1.0, 1.05, .45, 1.05, { tex: 'wood_floor' });
  batch.box(8.7, .45, 1.0, 1.3, .75, 1.3, { tex: 'deepslate' });
  foot(8.7, 1.0, 1.4, 1.5);

  // Floor runner and the controls decal at the entrance.
  const runner = new THREE.Mesh(
    new THREE.PlaneGeometry(2.15, 10.8),
    new THREE.MeshBasicMaterial({ map: floorTexture(), toneMapped: false }),
  );
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(0, .012, 1.0);
  runner.userData.group = 'static';
  planes.push(runner);

  // A low gallery title over the five frames, where the wall was blank.
  const title = textPlane('FIVE STATIONS  /  ZHOU LIANXU', 7.4, .52, {
    dark: true, size: 32, mono: true,
  });
  title.position.set(0, 4.58, -6.91);
  planes.push(title);

  // The facade sign. A room needs a door number.
  const sign = textPlane('周连旭  /  ZHOU LIANXU', 6.6, .62, { dark: true, size: 46 });
  sign.position.set(0, 6.0, SOUTH + .08);
  planes.push(sign);

  // Make the exterior lamp fittings real enough to catch an eye at night.
  for (const x of [-5, 5]) {
    batch.box(x, 4.7, SOUTH + .08, .35, .35, .12, {
      tex: 'travertine', tint: 0xffcf9b, emissive: .7,
    });
  }

  // ---------- ground and atmosphere ----------
  return {
    batches: { gallery: batch },
    planes,
    obstacles,
    lights,
    bakes,
    hotspots,
    forest,
    named: {},
  };
}
