import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BraceletSceneProps {
  alertActive: boolean;
  onActivate: () => void;
  autoRotate: boolean;
  colorway: 'rose' | 'graphite' | 'silver';
  batteryLevel: number;
}

function makeCapsuleShape(width: number, height: number) {
  const radius = width / 2;
  const halfHeight = height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-radius, -halfHeight + radius);
  shape.absarc(0, -halfHeight + radius, radius, Math.PI, Math.PI * 2, false);
  shape.lineTo(radius, halfHeight - radius);
  shape.absarc(0, halfHeight - radius, radius, 0, Math.PI, false);
  shape.closePath();
  return shape;
}

function makeDisplayTexture(alertActive: boolean, batteryLevel: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('No se pudo crear la pantalla 3D de AIVRA.');

  context.fillStyle = '#050608';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const background = context.createLinearGradient(0, 30, 0, 480);
  background.addColorStop(0, 'rgba(240, 160, 160, 0.08)');
  background.addColorStop(0.5, 'rgba(220, 140, 160, 0.14)');
  background.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
  context.fillStyle = background;
  context.beginPath();
  context.roundRect(16, 18, 224, 476, 38);
  context.fill();
  context.textAlign = 'center';
  if (alertActive) {
    context.fillStyle = '#ff6f83';
    context.font = '700 45px "Plus Jakarta Sans", sans-serif';
    context.fillText('SOS', 128, 235);
    context.font = '600 16px "Plus Jakarta Sans", sans-serif';
    context.fillText('ACTIVADO', 128, 260);
    context.fillStyle = '#aaa4a5';
    context.font = '500 11px "Plus Jakarta Sans", sans-serif';
    context.fillText('SEÑAL DE PRUEBA', 128, 290);
    context.beginPath();
    context.arc(128, 208, 75, -Math.PI * 0.8, Math.PI * 0.8);
    context.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    context.lineWidth = 4;
    context.stroke();
    context.beginPath();
    context.arc(128, 208, 75, -Math.PI * 0.8, Math.PI * 0.45);
    context.strokeStyle = '#ff6f83';
    context.stroke();
  } else {
    const now = new Date();
    const time = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false });
    const date = now.toLocaleDateString('es-PE', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();
    context.fillStyle = '#a0a4ab';
    context.font = '700 11px "Plus Jakarta Sans", sans-serif';
    context.fillText(`${batteryLevel}%  ⚡`, 128, 52);
    context.fillStyle = '#ffffff';
    context.font = '700 46px "Plus Jakarta Sans", sans-serif';
    context.fillText(time, 128, 115);
    context.fillStyle = '#f5b5b5';
    context.font = '600 11px "Plus Jakarta Sans", sans-serif';
    context.fillText(date, 128, 139);

    context.beginPath();
    context.arc(128, 232, 45, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(255,255,255,0.15)';
    context.lineWidth = 4;
    context.stroke();
    context.beginPath();
    context.arc(128, 232, 45, -Math.PI / 2, Math.PI * 1.25);
    context.strokeStyle = '#ff7b90';
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle = '#ff5470';
    context.font = '19px sans-serif';
    context.fillText('♥', 128, 226);
    context.fillStyle = '#fff';
    context.font = '700 13px "Plus Jakarta Sans", sans-serif';
    context.fillText('72 bpm', 128, 247);

    context.fillStyle = '#a8e063';
    context.font = '600 12px "Plus Jakarta Sans", sans-serif';
    context.fillText('↗  6,420', 128, 330);
    context.fillStyle = 'rgba(255,255,255,0.18)';
    context.beginPath();
    context.roundRect(48, 353, 160, 5, 3);
    context.fill();
    context.fillStyle = '#dec0af';
    context.beginPath();
    context.roundRect(48, 353, 110, 5, 3);
    context.fill();
    context.fillStyle = '#a5a0a0';
    context.font = '600 10px "Plus Jakarta Sans", sans-serif';
    context.fillText('TOCA PARA PEDIR AYUDA', 128, 425);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeStrapGeometry(points: THREE.Vector3[]) {
  const curve = new THREE.CatmullRomCurve3(points);
  const segments = 96;
  const halfWidth = 0.49;
  const halfThickness = 0.065;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let step = 0; step <= segments; step += 1) {
    const point = curve.getPointAt(step / segments);
    positions.push(
      -halfWidth, point.y, point.z + halfThickness,
      halfWidth, point.y, point.z + halfThickness,
      -halfWidth, point.y, point.z - halfThickness,
      halfWidth, point.y, point.z - halfThickness,
    );
  }

  for (let step = 0; step < segments; step += 1) {
    const current = step * 4;
    const next = current + 4;
    indices.push(
      current, current + 1, next + 1,
      current, next + 1, next,
      current + 2, next + 2, next + 3,
      current + 2, next + 3, current + 3,
      current, next, next + 2,
      current, next + 2, current + 2,
      current + 1, current + 3, next + 3,
      current + 1, next + 3, next + 1,
    );
  }

  indices.push(
    0, 2, 3,
    0, 3, 1,
    segments * 4, segments * 4 + 1, segments * 4 + 3,
    segments * 4, segments * 4 + 3, segments * 4 + 2,
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export const BraceletScene: React.FC<BraceletSceneProps> = ({
  alertActive,
  onActivate,
  autoRotate,
  colorway,
  batteryLevel,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const activateRef = useRef(onActivate);
  activateRef.current = onActivate;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfff5f0, 0.85));
    const keyLight = new THREE.DirectionalLight(0xfff4ed, 4);
    keyLight.position.set(-3, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xfca98e, 2.8);
    rimLight.position.set(4, -2, -3);
    scene.add(rimLight);
    const frontLight = new THREE.PointLight(0xffd7c0, 16, 16);
    frontLight.position.set(0, 1, 4);
    scene.add(frontLight);

    const bracelet = new THREE.Group();
    scene.add(bracelet);
    bracelet.rotation.x = 0.1;
    bracelet.rotation.y = 0.25;
    bracelet.rotation.z = -0.12;
    let rotationOffset = bracelet.rotation.y;

    const colors = {
      rose: { metal: '#dec0af', strap: '#edd6cb', dark: '#111317' },
      graphite: { metal: '#6f7074', strap: '#25262a', dark: '#0b0c10' },
      silver: { metal: '#e2e7eb', strap: '#d8e2dc', dark: '#101419' },
    }[colorway];

    const strapMaterial = new THREE.MeshStandardMaterial({
      color: colors.strap,
      roughness: 0.76,
      metalness: 0.02,
    });
    const strap = new THREE.Mesh(makeStrapGeometry([
      new THREE.Vector3(0, 1.26, 0.18),
      new THREE.Vector3(0, 1.75, 0.04),
      new THREE.Vector3(0, 2.05, -0.52),
      new THREE.Vector3(0, 1.92, -1.3),
      new THREE.Vector3(0, 1.2, -2.05),
      new THREE.Vector3(0, 0, -2.32),
      new THREE.Vector3(0, -1.2, -2.05),
      new THREE.Vector3(0, -1.92, -1.3),
      new THREE.Vector3(0, -2.05, -0.52),
      new THREE.Vector3(0, -1.75, 0.04),
      new THREE.Vector3(0, -1.26, 0.18),
    ]), strapMaterial);
    strap.material.side = THREE.DoubleSide;
    bracelet.add(strap);

    const wrist = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-2.5, 0, -1.25),
          new THREE.Vector3(-1.2, 0, -1.45),
          new THREE.Vector3(1.2, 0, -1.45),
          new THREE.Vector3(2.5, 0, -1.25),
        ]),
        32,
        0.68,
        24,
        false,
      ),
      new THREE.MeshStandardMaterial({
        color: '#e2b49c',
        emissive: '#3a2119',
        emissiveIntensity: 0.42,
        roughness: 0.9,
        opacity: 0.4,
        transparent: true,
        depthWrite: false,
      }),
    );
    bracelet.add(wrist);

    const backing = new THREE.Mesh(
      new THREE.ExtrudeGeometry(makeCapsuleShape(1.16, 2.7), {
        depth: 0.3,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.085,
      }),
      new THREE.MeshStandardMaterial({
        color: colors.dark,
        roughness: 0.55,
        metalness: 0.18,
      }),
    );
    backing.geometry.translate(0, 0, -0.05);
    backing.position.z = -0.03;
    bracelet.add(backing);

    const caseGeometry = new THREE.ExtrudeGeometry(
      makeCapsuleShape(1.13, 2.62),
      {
        depth: 0.3,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.09,
        curveSegments: 24,
      },
    );
    const metalCase = new THREE.MeshStandardMaterial({
      color: colors.metal,
      metalness: 0.72,
      roughness: 0.19,
    });
    const caseMesh = new THREE.Mesh(caseGeometry, metalCase);
    caseMesh.position.set(0, 0, 0.02);
    caseMesh.castShadow = true;
    bracelet.add(caseMesh);

    const bezelGeometry = new THREE.ExtrudeGeometry(
      makeCapsuleShape(1.02, 2.48),
      {
        depth: 0.055,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 1,
        bevelSize: 0.045,
        bevelThickness: 0.035,
        curveSegments: 24,
      },
    );
    const bezel = new THREE.Mesh(
      bezelGeometry,
      new THREE.MeshStandardMaterial({
        color: colorway === 'rose' ? '#b9927d' : colors.metal,
        metalness: 0.72,
        roughness: 0.22,
      }),
    );
    bezel.position.set(0, 0, 0.39);
    bracelet.add(bezel);

    const screenShape = makeCapsuleShape(0.91, 2.32);
    const screenGeometry = new THREE.ShapeGeometry(screenShape, 24);
    screenGeometry.computeBoundingBox();
    const screenBounds = screenGeometry.boundingBox;
    const screenPositions = screenGeometry.getAttribute('position');
    const screenUvs = screenGeometry.getAttribute('uv');
    if (screenBounds) {
      for (let index = 0; index < screenPositions.count; index += 1) {
        const u = (screenPositions.getX(index) - screenBounds.min.x)
          / (screenBounds.max.x - screenBounds.min.x);
        const v = (screenPositions.getY(index) - screenBounds.min.y)
          / (screenBounds.max.y - screenBounds.min.y);
        screenUvs.setXY(index, u, v);
      }
      screenUvs.needsUpdate = true;
    }
    const screen = new THREE.Mesh(
      screenGeometry,
      new THREE.MeshBasicMaterial({
        map: makeDisplayTexture(alertActive, batteryLevel),
        side: THREE.DoubleSide,
      }),
    );
    screen.position.set(0, 0, 0.5);
    screen.userData.action = 'sos';
    bracelet.add(screen);

    const sideButton = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.36, 24),
      new THREE.MeshStandardMaterial({
        color: colors.metal,
        metalness: 0.72,
        roughness: 0.22,
      }),
    );
    sideButton.rotation.z = Math.PI / 2;
    sideButton.position.set(0.59, 0, 0.1);
    bracelet.add(sideButton);

    const sensor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 0.1, 32),
      new THREE.MeshStandardMaterial({ color: '#09090a', roughness: 0.28 }),
    );
    sensor.rotation.x = Math.PI / 2;
    sensor.position.set(0, 0, -0.24);
    bracelet.add(sensor);

    const sensorLight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.11, 20),
      new THREE.MeshBasicMaterial({ color: '#00ff88' }),
    );
    sensorLight.rotation.x = Math.PI / 2;
    sensorLight.position.set(0, 0, -0.24);
    bracelet.add(sensorLight);

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let pointerStart: THREE.Vector2 | null = null;
    let previousX = 0;
    let previousY = 0;
    let dragging = false;
    let frame = 0;
    let disposed = false;

    const resize = () => {
      if (!host) return;
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const onPointerDown = (event: PointerEvent) => {
      pointerStart = new THREE.Vector2(event.clientX, event.clientY);
      previousX = event.clientX;
      previousY = event.clientY;
      dragging = true;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || !pointerStart) return;
      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      if (Math.abs(event.clientX - pointerStart.x) + Math.abs(event.clientY - pointerStart.y) > 5) {
        bracelet.rotation.y += deltaX * 0.008;
        rotationOffset = bracelet.rotation.y;
        bracelet.rotation.x = THREE.MathUtils.clamp(
          bracelet.rotation.x - deltaY * 0.006,
          -0.55,
          0.55,
        );
      }
      previousX = event.clientX;
      previousY = event.clientY;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!dragging || !pointerStart) return;
      const moved = Math.abs(event.clientX - pointerStart.x)
        + Math.abs(event.clientY - pointerStart.y);
      if (moved < 6) {
        const bounds = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(bracelet.children, false)
          .find((intersection) => intersection.object.userData.action === 'sos');
        if (hit) activateRef.current();
      }
      dragging = false;
      pointerStart = null;
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);

    const animate = () => {
      if (disposed) return;
      frame = window.requestAnimationFrame(animate);
      if (!dragging && autoRotate) {
        bracelet.rotation.y = rotationOffset + Math.sin(performance.now() * 0.00045) * 0.2;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            const textureMaterial = material as THREE.MeshStandardMaterial;
            if (textureMaterial.map) textureMaterial.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [alertActive, autoRotate, batteryLevel, colorway]);

  return <div className="bracelet-scene" ref={hostRef} aria-label="Modelo 3D interactivo de la pulsera AIVRA" />;
};
