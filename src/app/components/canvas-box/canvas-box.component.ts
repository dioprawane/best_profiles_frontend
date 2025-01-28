import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-canvas-box',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.scss']
})
export class CanvasBoxComponent {

  constructor() { }

  ngOnInit(): void {
    this.createThreeJsBox();
  }



  async createThreeJsBox(): Promise<void> {
    // Récupérer l'élément canvas
    const canvas = document.getElementById('canvas-box') as unknown as HTMLCanvasElement;

    // Créer une scène Three.js
    const scene = new THREE.Scene();

    // Créer un matériau de type Toon (effet dessiné)
    const material = new THREE.MeshToonMaterial();

    // Ajouter une lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Ajouter une lumière ponctuelle
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Créer des objets à ajouter à la scène
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);




    scene.add(box);


    // Limiter la taille du canvas à 500x500
    const canvasSizes = {
      width: 500,  // Largeur fixe
      height: 500, // Hauteur fixe
    };

    // Créer une caméra perspective
    const camera = new THREE.PerspectiveCamera(
      75, // Champ de vision
      canvasSizes.width / canvasSizes.height, // Ratio de l'aspect
      0.001,  // Plan de découpe proche
      1000    // Plan de découpe éloigné
    );
    camera.position.z = 20;
    scene.add(camera);



    if (!canvas) {
      return;
    }

    // Créer le renderer et l'attacher au canvas
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setClearColor(0xe232222, 1); // Couleur de fond
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      // Vous pouvez ici ajuster la taille de votre canvas ou laisser fixe
      renderer.setSize(canvasSizes.width, canvasSizes.height);

      // Adapter l'aspect de la caméra
      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      // Rendu
      renderer.render(scene, camera);
    });

    // Horloge pour l'animation
    const clock = new THREE.Clock();

    // Fonction d'animation
    const animateGeometry = () => {
      const elapsedTime = clock.getElapsedTime();

      // Mettre à jour l'animation des objets
      box.rotation.x = elapsedTime;
      box.rotation.y = elapsedTime;
      box.rotation.z = elapsedTime;



      // Rendu de la scène
      renderer.render(scene, camera);

      // Re-appeler la fonction animateGeometry à chaque frame
      window.requestAnimationFrame(animateGeometry);
    };

    // Démarrer l'animation
    animateGeometry();
  }
}
