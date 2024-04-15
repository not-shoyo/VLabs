<script setup>
import { ref, onMounted, reactive } from "vue";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { GUI } from "dat.gui";

console.log("inside Simulation Component Script")

// Determine if it's a mobile layout
const isMobile = ref(false);
const simulationContainer1 = ref(null);
const simulationContainer2 = ref(null);

if (typeof window !== "undefined") {
  console.log("When we get window")

  // import("dat.gui").then(({ GUI }) => {

  console.log("When we get GUI")

  const gui = new GUI();

  const screenSize = reactive({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const updateLayout = () => {
    screenSize.width = window.innerWidth;
    screenSize.height = window.innerHeight;
  };


  const variableOptions = {
    edges: {
      r1: 80,
      r2: 60,
      r3: 80,
      r4: 60
    },
    angles: {
      theta2: 90
    },
    speed: {
      omega2: 0.3
    },
    simulationControls: {
      pauseSimulation: false
    }
  }

  var edgesGui = gui.addFolder("Edge Lengths");
  edgesGui.add(variableOptions.edges, "r1", 60, 100).name("R1 (AD)").step(1);
  edgesGui.add(variableOptions.edges, "r2", 20, 100).name("R2 (AB)").step(1);
  edgesGui.add(variableOptions.edges, "r3", 60, 100).name("R3 (BC)").step(1);
  edgesGui.add(variableOptions.edges, "r4", 60, 100).name("R4 (CD)").step(1);
  edgesGui.hide();

  // var anglesGui = gui.addFolder("Angles");
  // anglesGui.add(variableOptions.angles, "theta2", 0, 360).name("θ2");
  // anglesGui.open();

  var speedGui = gui.addFolder("Speed");
  speedGui.add(variableOptions.speed, "omega2", 0.2, 1.8).name("ω2").listen();
  speedGui.open();

  var r1 = variableOptions.edges.r1, r2 = variableOptions.edges.r2, r3 = variableOptions.edges.r3, r4 = variableOptions.edges.r4;
  var theta2 = variableOptions.angles.theta2;
  var omega2 = variableOptions.speed.omega2;

  var theta3 = 0, theta4 = 0; // All angles in Degrees. (mention the specification in the script like here)
  var rotstatus = 1; // direction of rotation (-1 for clockwise, 1 for counterclockwise)

  //function to check whether links satisfy grashof condition
  function checkGrashof() {
    var links = new Array(4);
    links[0] = variableOptions.edges.r1;
    links[1] = variableOptions.edges.r2;
    links[2] = variableOptions.edges.r3;
    links[3] = variableOptions.edges.r4;
    links.sort((p, q) => { return p - q });
    var s = links[0];
    var p = links[1];
    var q = links[2];
    var l = links[3];
    if (s + l > p + q) {
      // console.log("failed")
      return false;
    }
    else {
      // console.log("passed")
      return true;
    }
  }

  console.log("Not mounted yet")

  onMounted(() => {

    console.log("Got mounted")

    // Determine if it's a mobile layout
    const isMobile = ref(false);

    // Constants for container dimensions
    const simulationContainerWidth = simulationContainer1.value.offsetWidth;
    const simulationContainerHeight = simulationContainer1.value.offsetHeight;

    // Global scaling factor
    const scaleFactor = 200 / 60; // Example scaling factor

    // Function to scale distances
    function scaleDist(dist) {
      return dist * scaleFactor;
    }

    //function to convert radians to degrees
    function deg(vrad) {
      return vrad * 180 / Math.PI;
    }
    //function to convert degrees to radians
    function rad(vdeg) {
      return vdeg * Math.PI / 180;
    }

    // Scene setup function
    function setupScene() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x888888);
      return scene;
    }

    // Camera setup function
    function setupCamera() {
      const camera = new THREE.OrthographicCamera(-simulationContainerWidth, simulationContainerWidth, simulationContainerHeight, -simulationContainerHeight);
      camera.position.z = 10;
      camera.zoom = 0.75;
      camera.updateProjectionMatrix();
      return camera;
    }

    // Renderer setup function
    function setupRenderer() {
      const renderer1 = new THREE.WebGLRenderer();
      renderer1.setSize(simulationContainerWidth, simulationContainerHeight);
      simulationContainer1.value.appendChild(renderer1.domElement);
      const renderer2 = new THREE.WebGLRenderer();
      renderer2.setSize(simulationContainerWidth, simulationContainerHeight);
      simulationContainer2.value.appendChild(renderer2.domElement);
      return [renderer1, renderer2];
    }

    // Text label renderer setup function
    function setupTextLabelRenderer() {
      const textLabelRenderer1 = new CSS2DRenderer();
      textLabelRenderer1.setSize(simulationContainerWidth, simulationContainerHeight);
      textLabelRenderer1.domElement.style.position = 'absolute';
      textLabelRenderer1.domElement.style.top = '0px';
      textLabelRenderer1.domElement.style.pointerEvents = 'none';
      simulationContainer1.value.appendChild(textLabelRenderer1.domElement);
      const textLabelRenderer2 = new CSS2DRenderer();
      textLabelRenderer2.setSize(simulationContainerWidth, simulationContainerHeight);
      textLabelRenderer2.domElement.style.position = 'absolute';
      textLabelRenderer2.domElement.style.top = '0px';
      textLabelRenderer2.domElement.style.pointerEvents = 'none';
      simulationContainer2.value.appendChild(textLabelRenderer2.domElement);
      return [textLabelRenderer1, textLabelRenderer2];
    }

    // Controls setup function
    function setupControls(camera, renderer) {
      const controls = new OrbitControls(camera, renderer.domElement);
      return controls;
    }

    // Circle setup function
    function setupCircles(scene, basePositions) {
      const circleMatOptions = {
        color: 0x000000,
        side: THREE.DoubleSide
      };
      const circleGeo = new THREE.CircleGeometry(20, 25);
      const circleMat = new THREE.MeshBasicMaterial(circleMatOptions);

      const circles = [];

      // Define circle positions (in original mm)
      const positions = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ];

      positions.forEach(pos => {
        const circle = new THREE.Mesh(circleGeo, circleMat);
        circle.position.set(basePositions.x + pos.x, basePositions.y + pos.y, 1);
        scene.add(circle);
        circles.push(circle);
      });

      return circles;
    }

    // Text label setup function
    function setupTextLabels(scene, circles) {
      const labels = [];
      const labelTexts = ['A', 'B', 'C', 'D'];

      labelTexts.forEach((text, index) => {
        const textLabel = document.createElement('div');
        textLabel.className = 'label';
        textLabel.style.color = 'rgb(255, 255, 255)';
        textLabel.textContent = text;

        const label = new CSS2DObject(textLabel);
        label.position.copy(circles[index].position);
        scene.add(label);
        labels.push(label);
      });

      return labels;
    }

    // Edge setup function
    function setupEdges(scene, positions, color) {
      const edgeMatOptions = {
        color: color,
        side: THREE.DoubleSide
      };

      // Calculate the distance between the two positions (circles)
      const distance = Math.sqrt(Math.pow(positions[1].x - positions[0].x, 2) + Math.pow(positions[1].y - positions[0].y, 2));

      // Create a plane geometry with the calculated distance as width
      const edgeGeo = new THREE.PlaneGeometry((distance), 25);
      const edgeMat = new THREE.MeshBasicMaterial(edgeMatOptions);
      const edge = new THREE.Mesh(edgeGeo, edgeMat);

      // Set the position of the edge at the midpoint between the circles
      edge.position.x = (positions[0].x + positions[1].x) / 2;
      edge.position.y = (positions[0].y + positions[1].y) / 2;
      edge.position.z = 0;

      // Set the rotation of the edge to match the direction from the first circle to the second circle
      edge.rotation.z = Math.atan2(positions[1].y - positions[0].y, positions[1].x - positions[0].x);

      // Add the edge to the scene
      scene.add(edge);

      return edge;
    }

    // Compute Next State for Circles
    function computeNextState(circles, labels, isOpenConfiguration) {

      const { r1 } = variableOptions.edges, { r2 } = variableOptions.edges, { r3 } = variableOptions.edges, { r4 } = variableOptions.edges;
      const { theta2 } = variableOptions.angles;
      const { omega2 } = variableOptions.speed;

      const [a, b, c, d] = circles

      var k, ka, kb, kc, det;

      k = (r2 * r2 - r3 * r3 + r4 * r4 + r1 * r1) / 2;
      ka = k - r2 * (r1 - r4) * Math.cos(rad(theta2)) - r4 * r1;
      kb = -2 * r2 * r4 * Math.sin(rad(theta2));
      kc = k - r2 * (r1 + r4) * Math.cos(rad(theta2)) + r4 * r1;
      det = kb * kb - 4 * ka * kc;

      b.position.set(a.position.x + scaleDist(r2 * Math.cos(rad(theta2))), a.position.y + scaleDist(r2 * Math.sin(rad(theta2))), 1);
      d.position.set(a.position.x + scaleDist(r1), a.position.y, 1);

      if (r1 == r3 && r2 == r4) {
        if (isOpenConfiguration) {
          theta4 = theta2;
        }
        else {
          if (theta2 < 180)
            theta4 = deg(2 * Math.atan((-kb + Math.sqrt(det)) / (2 * ka)));
          else
            theta4 = deg(2 * Math.atan((-kb - Math.sqrt(det)) / (2 * ka)));
        }
      }
      else {
        if (isOpenConfiguration)
          theta4 = deg(2 * Math.atan((-kb - Math.sqrt(det)) / (2 * ka)));
        else
          theta4 = deg(2 * Math.atan((-kb + Math.sqrt(det)) / (2 * ka)));
      }

      theta3 = deg(Math.asin((r4 * Math.sin(rad(theta4)) - r2 * Math.sin(rad(theta2))) / r3));

      c.position.set(d.position.x + scaleDist(r4 * Math.cos(rad(theta4))), d.position.y + scaleDist(r4 * Math.sin(rad(theta4))), 1);

      if (isOpenConfiguration) {
        if (theta3 < 0)
          theta3 += 360;
        if (theta4 < 0)
          theta4 += 360;
      } else {
        if (theta3 < 0)
          theta3 += 360;
        if (theta4 < 0)
          theta4 += 360;
        if (theta3 == 360)
          theta3 = 0;
      }

      // Update text label positions to match circle positions
      labels.forEach((label, index) => {
        label.position.copy(circles[index].position);
      });

    }

    // Animation function
    function animate(scene, camera, controls, renderer, textLabelRenderer, circles, edges, labels, isOpenConfiguration) {
      requestAnimationFrame(() => {
        if ((!variableOptions.simulationControls.pauseSimulation) && checkGrashof()) animate(scene, camera, controls, renderer, textLabelRenderer, circles, edges, labels, isOpenConfiguration)
      });

      variableOptions.angles.theta2 = variableOptions.angles.theta2 + (rotstatus * 0.01 * deg(variableOptions.speed.omega2));
      variableOptions.angles.theta2 = variableOptions.angles.theta2 % 360;

      // Compute next state for circles
      computeNextState(circles, labels, isOpenConfiguration);

      // Update edge positions and rotations
      edges.forEach((edge, index) => {
        const nextIndex = (index + 1) % circles.length;

        // Calculate the distance between the two positions (circles)
        const distance = Math.sqrt(Math.pow(circles[nextIndex].position.x - circles[index].position.x, 2) + Math.pow(circles[nextIndex].position.y - circles[index].position.y, 2));

        edge.scale.x = distance / edge.geometry.parameters.width

        const midX = (circles[index].position.x + circles[nextIndex].position.x) / 2;
        const midY = (circles[index].position.y + circles[nextIndex].position.y) / 2;
        const angle = Math.atan2(circles[nextIndex].position.y - circles[index].position.y, circles[nextIndex].position.x - circles[index].position.x);

        edge.position.set(midX, midY, 0);
        edge.rotation.z = angle;
      });

      controls.update();
      renderer.render(scene, camera);
      textLabelRenderer.render(scene, camera);
    }

    function updateCameraZoom(camera, simulationContainer) {
      const container = simulationContainer.value;

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      // Calculate desired zoom level based on the new canvas size
      const aspectRatio = width / height;
      const verticalFov = 45; // Initial vertical FOV
      const horizontalFov = verticalFov * aspectRatio;
      const fov = Math.max(verticalFov, horizontalFov);

      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    // Resize function
    function resize(camera, renderer, textLabelRenderer, simulationContainer) {
      const newWidth = simulationContainer.value.offsetWidth;
      const newHeight = simulationContainer.value.offsetHeight;

      // Determine if it's a mobile layout
      isMobile.value = screenSize.width <= 425;

      updateLayout();
      updateCameraZoom(camera, simulationContainer);
      renderer.setSize(newWidth, newHeight);
      textLabelRenderer.setSize(newWidth, newHeight);
    }

    // Main function to initialize everything
    function init() {

      console.log("inside init")

      const scene1 = setupScene();
      const scene2 = setupScene();

      const camera1 = setupCamera();
      const camera2 = setupCamera();
      const [renderer1, renderer2] = setupRenderer();
      const [textLabelRenderer1, textLabelRenderer2] = setupTextLabelRenderer();
      const controls1 = setupControls(camera1, renderer1);
      const controls2 = setupControls(camera2, renderer2);

      // // Create axes
      // const axesHelper1 = new THREE.AxesHelper(100); // Length of the axes lines
      // scene1.add(axesHelper1);
      // const axesHelper2 = new THREE.AxesHelper(100); // Length of the axes lines
      // scene2.add(axesHelper2);

      if (checkGrashof()) {

        console.log("first is a grashof")

        // First group of circles
        const circles1 = setupCircles(scene1, { x: -scaleDist((-variableOptions.edges.r2 + variableOptions.edges.r1 + variableOptions.edges.r4) / 2), y: 0 }); // used to be just -120 instead of startingPointOfA
        const textLabels1 = setupTextLabels(scene1, circles1);

        // Second group of circles
        const circles2 = setupCircles(scene2, { x: -scaleDist((-variableOptions.edges.r2 + variableOptions.edges.r1 + variableOptions.edges.r4) / 2), y: 0 }); // used to be +120
        const textLabels2 = setupTextLabels(scene2, circles2);

        computeNextState(circles1, textLabels1, true);
        computeNextState(circles2, textLabels2, false);

        const edges1 = [
          setupEdges(scene1, [circles1[0].position, circles1[1].position], 0x0066ff),
          setupEdges(scene1, [circles1[1].position, circles1[2].position], 0xd00000),
          setupEdges(scene1, [circles1[2].position, circles1[3].position], 0x005500),
          setupEdges(scene1, [circles1[3].position, circles1[0].position], 0x993300),
        ];

        const edges2 = [
          setupEdges(scene2, [circles2[0].position, circles2[1].position], 0x0066ff),
          setupEdges(scene2, [circles2[1].position, circles2[2].position], 0xd00000),
          setupEdges(scene2, [circles2[2].position, circles2[3].position], 0x005500),
          setupEdges(scene2, [circles2[3].position, circles2[0].position], 0x993300),
        ];

        resize(camera1, renderer1, textLabelRenderer1, simulationContainer1)
        resize(camera2, renderer2, textLabelRenderer2, simulationContainer2)

        // Add event listener for container resize
        window.addEventListener('resize', () => resize(camera1, renderer1, textLabelRenderer1, simulationContainer1));
        window.addEventListener('resize', () => resize(camera2, renderer2, textLabelRenderer2, simulationContainer2));

        // Start animation for both groups of circles
        animate(scene1, camera1, controls1, renderer1, textLabelRenderer1, circles1, edges1, textLabels1, true);
        animate(scene2, camera2, controls2, renderer2, textLabelRenderer2, circles2, edges2, textLabels2, false);

        var simulationControlsGui = gui.addFolder("Simulation Controlls");
        simulationControlsGui.add(variableOptions.simulationControls, "pauseSimulation").name("Pause Simulation").onChange((paused) => {
          if (paused) {
            edgesGui.show();
            edgesGui.open();
            speedGui.hide();
          } else {
            // console.log(paused)
            // console.log(variableOptions.edges)
            edgesGui.hide();
            speedGui.show();
            speedGui.open();
            if (checkGrashof()) {
              animate(scene1, camera1, controls1, renderer1, textLabelRenderer1, circles1, edges1, textLabels1, true);
              animate(scene2, camera2, controls2, renderer2, textLabelRenderer2, circles2, edges2, textLabels2, false);
            } else {
              console.log("Not a valid Grashof Mechanism")
            }
          }
        })
        simulationControlsGui.open();

      } else {
        console.log("not valid grashof")
      }
    }

    console.log("going to init inside mount")

    // Initialize everything
    init();
  })

  // });
}

console.log("Outside window if")

</script>

<template>
  <div class="simulationsGroup" :class="{ columnLayout: isMobile }">

    <div class="simulationContainerTemplate" ref="simulationContainer1">
      <!-- <canvas ref="canvas1" width="300" height="200"></canvas> -->
    </div>

    <div class="simulationContainerTemplate" ref="simulationContainer2">
      <!-- <canvas ref="canvas2" width="300" height="200"></canvas> -->
    </div>
  </div>
</template>