attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uVMatrix;
uniform mat4 uPMatrix;
uniform vec3 uDirLight;
uniform float uDebugMode;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vTangent;
varying float vNormTheta;
varying vec3 vFragPos;
varying vec3 vFragPosWorld;

uniform sampler2D uSampler;
uniform sampler2D uNormal;
uniform sampler2D uAmbientMap;

uniform vec3 uPointLightPosition;

vec4 rotateAroundX(vec4 vec, float phi) {
    mat4 rotMat = mat4(
        1.0,      0.0, 0.0, 0.0,
        0.0, cos(phi), sin(phi), 0.0,
        0.0, sin(phi), cos(phi), 0.0,
        0.0,      0.0, 0.0, 1.0
    );

    return rotMat * vec;
}

vec4 rotateAroundY(vec4 vec, float theta) {
    mat4 rotMat = mat4(
        cos(theta), 0.0, sin(theta), 0.0,
               0.0, 1.0,        0.0, 0.0,
        sin(theta), 0.0, cos(theta), 0.0,
               0.0, 0.0,        0.0, 1.0
    );

    return rotMat * vec;
}

void main(void) {
    vec3 pos = aVertexPosition;
    // CREDIT: https://stackoverflow.com/questions/42747784/how-to-convert-world-space-transform-to-object-space-transform
    vFragPos = (uVMatrix * uMVMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = uPMatrix * uVMatrix * uMVMatrix * vec4(pos, 1.0);
    // gl_Position = uPMatrix * uMVMatrix * uVMatrix * vec4(pos, 1.0);

    vFragPosWorld = (uMVMatrix * vec4(pos, 1.0)).xyz;

    vTextureCoord = aTextureCoord;

    mat4 rotMat = uMVMatrix;
    rotMat[3][0] = 0.0;
    rotMat[3][1] = 0.0;
    rotMat[3][2] = 0.0;
    rotMat[0][3] = 0.0;
    rotMat[1][3] = 0.0;
    rotMat[2][3] = 0.0;

    float normalTheta = 0.0;
    if (abs(aVertexNormal.x) > 0.001) {
        normalTheta = atan(aVertexNormal.z, aVertexNormal.x);
    }
    // vNormTheta = normalTheta;
    float normalPhi = asin(aVertexNormal.y);
    vNormTheta = normalPhi;
    vec4 biTangent = rotateAroundY(rotateAroundX(vec4(0.0, 1.0, 0.0, 1.0), normalPhi), normalTheta);
    vec3 tangent = cross(biTangent.xyz, aVertexNormal);

    vNormal = normalize((rotMat * vec4(aVertexNormal, 1.0)).xyz);
    vTangent = normalize((rotMat * vec4(tangent, 1.0)).xyz);
    // vNormal = aVertexNormal;
    // vTangent = tangent;
}