out vec2 vUv;

void main(void) {
    gl_Position = vec4(position, 1.);
    vUv = uv;
}