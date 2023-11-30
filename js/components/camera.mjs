import { addVector, crossProductVector, multVector, subtractVector } from "../renderer/mesh-handler.mjs";
import { mat4 } from "../util/glMatrix_util.js";
import Plane from "../util/plane.mjs";

class Camera {
    constructor(nearZ, farZ, fovY, aspect) {
        this.transformation = mat4.create();
        this.projection = mat4.perspective(fovY, aspect, nearZ, farZ);

        this.nearZ = nearZ;
        this.farZ = farZ;
        this.fovY = fovY;
        this.aspect = aspect;

        this.setPosition([0.0, 0.0, 0.0]);
        this.setRotation([0.0, 0.0, 0.0]);
        this.clean();
    }

    clean() {
        if (this.isDirty) {
            this.genTransformation();
            this.genFrustrumPlanes();
            this.isDirty = false;
        }
    }

    setPosition(pos) {
        this.position = pos;
        this.isDirty = true;
    }

    setRotation(rot) {
        this.rotation = rot;
        var rotMat = mat4.create();
        rotMat = mat4.identity(rotMat);
        mat4.rotate(rotMat, this.rotation[0] / 180.0 * 3.1415, [1, 0, 0]);
        mat4.rotate(rotMat, this.rotation[1] / 180.0 * 3.1415, [0, 1, 0]);
        mat4.rotate(rotMat, this.rotation[2] / 180.0 * 3.1415, [0, 0, 1]);
        this.forward = mat4.multiplyVec3(rotMat, [0.0, 0.0, 1.0]);
        this.right = mat4.multiplyVec3(rotMat, [-1.0, 0.0, 0.0]);
        this.up = mat4.multiplyVec3(rotMat, [0.0, 1.0, 0.0]);
        this.isDirty = true;
    }

    genTransformation() {
        mat4.identity(this.transformation);
        mat4.rotate(this.transformation, this.rotation[0] / 180.0 * 3.1415, [1, 0, 0]);
        mat4.rotate(this.transformation, this.rotation[1] / 180.0 * 3.1415, [0, 1, 0]);
        mat4.rotate(this.transformation, this.rotation[2] / 180.0 * 3.1415, [0, 0, 1]);
        mat4.translate(this.transformation, this.position);
    }

    getTransformation() {
        this.clean();
        return this.transformation;
    }

    getProjection() {
        return this.projection;
    }

    genFrustrumPlanes() {
        const halfVSide = this.farZ * Math.tan((this.fovY / 180.0 * 3.1415) / 2.0);
        const halfHSide = halfVSide * this.aspect;
        const frontMultFar = multVector(this.forward, this.farZ);

        this.frustrumPlanes = [
            new Plane( // Near
                addVector(this.position, multVector(this.forward, this.nearZ)),
                this.forward
            ),
            new Plane( // Far
                addVector(this.position, frontMultFar),
                multVector(this.forward, -1.0)
            ),
            new Plane( // Left
                this.position,
                crossProductVector(
                    this.up,
                    addVector(frontMultFar, multVector(this.right, halfHSide))
                )
            ),
            new Plane( // Right
                this.position,
                crossProductVector(
                    addVector(frontMultFar, multVector(this.right, -halfHSide)),
                    this.up
                )
            ),
            new Plane( // Top
                this.position,
                crossProductVector(
                    addVector(frontMultFar, multVector(this.up, halfVSide)),
                    this.right
                )
            ),
            new Plane( // Bottom
                this.position,
                crossProductVector(
                    this.right,
                    addVector(frontMultFar, multVector(this.up, -halfVSide)),
                )
            )
        ]
    }

    /**
     * @returns {Array<Plane>} Planes of the frustrum:
     * [ near, far, left, right, top, bottom ]
     */
    getFrustrumPlanes() {
        this.clean();
        return this.frustrumPlanes;
    }
}

export function testCamera() {
    var cam = new Camera(1, 10, 45, 16.0 / 9.0);
    cam.setRotation([-30.0, 0.0, 0.0]);
    var frustrum = cam.getFrustrumPlanes();
    for (var plane of frustrum) {
        plane.print();
    }
}

export default Camera;