uniform vec3 uColor;
uniform vec3 uDividerColor;
uniform float uDividerStart;

in vec2 vUv;

out vec4 outputColor;

void main(void) {
    vec2 divider = abs(vUv * 2.f - 1.f);
    outputColor = vec4(
        mix(
            uDividerColor,
            uColor,
            step(uDividerStart, min(divider.x, divider.y))), 
        1.);
}