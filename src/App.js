import React, {Component} from 'react';
import {
  Color,
  FaceColors,
  EdgesGeometry,
  Group,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  WireframeGeometry,
  LineSegments,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
} from 'three'; 

import './App.css';

class App extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new Scene();
    var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let cubes = this.build_cubes(scene);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cubes.rotation.x += 0.01;
      cubes.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  build_cubes(scene) {
    let group = new Group();
    for(let x=-1;x<=1;++x) {
      for(let y=-1;y<=1;++y) {
        for(let z=-1;z<=1;++z) {
          const geometry = new BoxGeometry( 1, 1, 1 );
          const material = new MeshBasicMaterial( { color: 0xff00ff } );
          const cube = new Mesh( geometry, material );
          
          const edges = new EdgesGeometry(geometry);
          const edgesMaterial = new LineBasicMaterial({ color: 0x00ff00 });
          const edgesMesh = new LineSegments(edges, edgesMaterial);
          cube.position.set(x,y,z);
          edgesMesh.position.set(x,y,z);

          cube.material.vertexColors = FaceColors;
          var faces = cube.geometry.faces;
          var o=Math.round, r=Math.random, s=255;
          var color = new Color('rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')');
          faces.forEach(face => {
            face.color = color;
          });
          group.add(cube);
          group.add(edgesMesh)
        }
      }
    }
    scene.add(group);
    return group;
  }

  render() {
    return (
      <div />
    );
  }
}


class Cube {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export default App;
