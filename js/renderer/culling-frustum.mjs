/**
 * All code based off of https://learnopengl.com/Guest-Articles/2021/Scene/Frustum-Culling
 */

import Camera from "../components/camera.mjs";
import { generateMaze } from "../util/maze-gen.mjs";

export class CullingFrustum {

    /**
     * 
     * @param {Camera} camera 
     */
    constructor(camera) {
        this.camera = camera;
    }

    /**
     * Test if a bounding sphere in contained within the camera's frustum.
     * 
     * @param {Array<Number>} center Vec3 defining center of bounding sphere.
     * @param {Number} radius Radius of the bounding sphere.
     * @returns {Boolean} Whether or not the sphere in contained in the camera's frustum.
     */
    testBoundingSphere(center, radius) {
        var planes = this.camera.getFrustumPlanes();
        var res = true;
        for (var i = 0; i < planes.length && res; i++) {
            res = planes[i].dotProduct(center) > -radius;
            // res = planes[i].normal[0] * center[0] + planes[i].normal[1] * center[1] + planes[i].normal[2] * center[2] > planes[i].d - radius;
        }

        return res;
    }
}

export function testCullingFrustum() {
    var cam = new Camera(0.1, 5, 45, 16.0 / 9.0);
    console.log(cam.forward.map(x => x.toFixed(2)));
    var maze = generateMaze(20, 20, 0.1);
    // maze.print();
    // cam.setRotation([0.0, 60.0, 0.0]);
    cam.setPosition([0.0, 0.0, 0.0]);
    // cam.setPosition(maze.startPosition);
    var cullFrus = new CullingFrustum(cam);

    cam.getFrustumPlanes().forEach(x => x.printEquation());
    console.log(cam.getFrustumPlanes()[0].point);

    var layout = maze.getArrayLayout();
    
    function layoutToCoord(x, z) {
        return [
            (x - 1.0) / 2.0,
            0.5,
            (z - 1.0) / 2.0
        ];
    }

    for (var z = 0; z < layout.length; z++) {
        for (var x = 0; x < layout[z].length; x++) {
            if (!cullFrus.testBoundingSphere(layoutToCoord(x, z), 0.5)) {
                layout[z][x] = '-';
            }
        }
    }

    console.log(layout.map(x => x.join('')).join('\n'));
}

export default CullingFrustum;