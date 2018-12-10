## CS486 Computer Graphics Final Project

Nicole Schneider

### THREE.js Robot Model

I hierarchically modeled a robot and added lighting effects, shadows, and a shiny surface on the Robot itself.

I used THREE.Group() to combine meshes and create joints that mimicked how a human-like robot would move. The biggest challenge with the model was getting the shoulder joints to move the entire arm, including the elbow joint.

I implemented 2 effects in addition to the hierarchical model, a shadow that moves as the camera moves, and a shiny metallic surface on the robot itself. I also used 4 different types of lighting: spotlight, directional light, point light, and hemisphere light.

## Link to GitHub Website:
***
[Click Here](https://nicoleschneider.github.io/Graphics/)
***

## Image of Final Model
![Image](/screenshot.jpg)

***

## Sources:

***

[Using Standard Material](https://medium.com/@soffritti.pierfrancesco/glossy-spheres-in-three-js-bfd2785d4857)

[Directional Lighting](https://stackoverflow.com/questions/15478093/realistic-lighting-sunlight-with-three-js)

[Adding the Ground](https://stackoverflow.com/questions/29916886/three-js-add-plane-to-the-scene)

[Creating a shadow](https://threejs.org/docs/#api/en/lights/shadows/LightShadow)

[Working with Spotlights](https://css-tricks.com/creating-photorealistic-3d-graphics-web/)

[Using Point Light](http://jsfiddle.net/gero3/2tcPH/7/)

***
