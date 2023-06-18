// Declare the shadow and heading variables outside of createHeading function
let shadow;
let heading;

function createHeading() {
  // Create an SVG element and append it to the container
  const svgContainer = document.getElementById('svg-container');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svgContainer.appendChild(svg);

  // Create the shadow
  shadow = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  shadow.textContent = 'Aktuelle Filmreihe';
  shadow.setAttribute('class', 'shadow');
  shadow.setAttribute('x', 80);
  shadow.setAttribute('y', 80);
  shadow.setAttribute('fill', 'white');
  shadow.setAttribute('font-size', '36px');
  shadow.setAttribute('font-family', 'Arial');
  shadow.setAttribute('stroke', 'rgb(0, 86, 209)'); // Set outline color
  shadow.setAttribute('stroke-width', '1px'); // Set outline width
  shadow.setAttribute('paint-order', 'stroke'); // Ensure outline is drawn before fill
  svg.appendChild(shadow);

  // Create the heading
  heading = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  heading.textContent = 'Aktuelle Filmreihe';
  heading.setAttribute('class', 'heading');
  heading.setAttribute('x', 78);
  heading.setAttribute('fill', 'rgb(255, 48, 0)');
  heading.setAttribute('font-size', '36px');
  heading.setAttribute('font-family', 'Arial');
  svg.appendChild(heading);

  // Position the heading and shadow vertically centered
  const containerHeight = svgContainer.getBoundingClientRect().height;
  const headingHeight = parseFloat(getComputedStyle(heading).fontSize);
  const yPosition = (containerHeight + headingHeight) / 3;
  heading.setAttribute('y', yPosition);
  shadow.setAttribute('y', yPosition * 1.075);
}

// Function to update the y-scale of the shadow text
function updateShadowScale() {
  // Get the position of the shadow text element relative to the window
  const shadowRect = shadow.getBoundingClientRect();
  const shadowTop = shadowRect.top;
  const windowHeight = window.innerHeight;

  // Calculate the relative position within the window
  const relativePosition = (windowHeight - shadowTop) / windowHeight;

  // Calculate the new y-scale based on the relative position
  const yScale = (1.2 -0.5* relativePosition );
  const shear_angle = (windowHeight - shadowTop -640)/windowHeight * 150;

  // Apply the y-scale transformation to the shadow text
  const originalX = parseFloat(shadow.getAttribute('x'));
  const originalY = parseFloat(shadow.getAttribute('y'));
  shadow.setAttribute('transform-origin', `${originalX}px ${originalY}px`);
  shadow.setAttribute('transform', `skewX(${shear_angle}) scale(1-0.78)`);// scale(1, ${-yScale})`);
}

// Call the createHeading function on page load
window.addEventListener('DOMContentLoaded', function () {
  createHeading();
  updateShadowScale();
});
window.addEventListener('scroll', updateShadowScale);
