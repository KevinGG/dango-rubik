import React, {Component} from 'react';
import * as THREE from 'three'; 

import './App.css';

class App extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let cubes = this.build_cubes(scene);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      for (let i=0; i<cubes.length; i++) {
        cubes[i].rotation.x += 0.01;
        cubes[i].rotation.y += 0.01;
        renderer.render( scene, camera );
      }
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  build_cubes(scene) {
    let cubes = [];
    for(let i=0; i < 27; ++i) {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      geometry.translate(i%9,i%9,i%9);
      var material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add(cube);
      cubes.push(cube);
    }
    return cubes;
  }

  render() {
    return (
      <div />
    );
  }
}

export default App;
