const float Pi = 3.1415926;

uniform vec3 uColor;
uniform vec3 uDividerColor;
uniform vec2 uDividerCount;
uniform float uDividerStart;

in vec2 vUv;

out vec4 outputColor;

void main(void) {
    vec2 divider = abs(sin(Pi * vUv * uDividerCount));
    outputColor = vec4(
        mix(
            uDividerColor,
            uColor,
            step(uDividerStart, min(divider.x, divider.y))), 
        1.);
}