import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setClearColor(0x4A4A4A);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(55);

const yarn_geo = new THREE.SphereGeometry(2.5, 28, 30);
const yarn_mat = new THREE.MeshBasicMaterial({ color: 0xF8EAF2 });
const yarnBall = new THREE.Mesh(yarn_geo, yarn_mat);
scene.add(yarnBall);

const ringColors = [ 0xEDE7F6,
 0xD8A7B1,0xF8EAF2
  ,0x9E9E9E];
const rings = [];

ringColors.forEach((color, i) => {
  const ring_geo = new THREE.TorusGeometry(12 + i * 0.9, 1.1, 15, 100);
  const ring_mat = new THREE.MeshBasicMaterial({ color: color });
  const ring = new THREE.Mesh(ring_geo, ring_mat);
  scene.add(ring);
  rings.push(ring);
});
const loader = new THREE.TextureLoader();

const texture1 = loader.load('/flower.jpg');
const texture2 = loader.load('/bow.jpg');

const frameGeo = new THREE.PlaneGeometry(7, 7);

const frame1 = new THREE.Mesh(
  frameGeo,
  new THREE.MeshBasicMaterial({
    map: texture1,
    side: THREE.DoubleSide
  })
);

frame1.position.set(-20, 6, 0);
scene.add(frame1);

const frame2 = new THREE.Mesh(
  frameGeo,
  new THREE.MeshBasicMaterial({
    map: texture2,
    side: THREE.DoubleSide
  })
);

frame2.position.set(20, -6, 0);
scene.add(frame2);

function add_stitch() {
  const geo = new THREE.SphereGeometry(0.3, 15, 15);
  const mat = new THREE.MeshBasicMaterial({ color: 0xE6D7F0 });
  const stitch = new THREE.Mesh(geo, mat);
  const [x, y, z] = Array(4).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  stitch.position.set(x, y, z);
  scene.add(stitch);
}
Array(138).fill().forEach(add_stitch);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  yarnBall.rotation.y += 0.01;
  camera.position.z = t * -0.01;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  rings.forEach(ring => {
    ring.rotation.x += 0.02;
    ring.rotation.y += 0.02;
  });
  renderer.render(scene, camera);
  frame1.rotation.y += 0.008;
frame2.rotation.y -= 0.008;
}

animate();