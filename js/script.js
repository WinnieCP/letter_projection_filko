// Create an SVG element and append it to the container
const svgContainer = document.getElementById('svg-container');
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svgContainer.appendChild(svg);

// Define the grid size and letter size
const gridSize_x = 10;
const gridSize_y = 10;
const letterWidth = svgContainer.offsetWidth / (gridSize_x)
const letterHeight = svgContainer.offsetHeight / (gridSize_y)



// Create the bottom layer (distorted 'f' letters)
for (let row = 0; row < gridSize_x; row++) {
  for (let col = 0; col < gridSize_y; col++) {
    const kShadow = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    kShadow.textContent = 'k';
    kShadow.setAttribute('class', 'k-shadow');
    kShadow.setAttribute('x', (col + 0.5) * letterWidth);
    kShadow.setAttribute('y', (row + 0.5) * letterHeight);
    kShadow.setAttribute('fill', 'rgb(255, 48, 0)');
    kShadow.setAttribute('font-size', '36px'); // Change the font size here
    kShadow.setAttribute('font-family', 'Arial'); // Change the font type here
    const originalX = parseFloat(kShadow.getAttribute('x'));
    const originalY = parseFloat(kShadow.getAttribute('y'));
    kShadow.setAttribute('transform-origin', `${originalX + letterWidth / 2}px ${originalY}px`);
    kShadow.setAttribute('transform', `skewX(20)`);

    svg.appendChild(kShadow);
  }
}
// Create the top layer (grid of 'f' letters)
for (let row = 0; row < gridSize_x; row++) {
    for (let col = 0; col < gridSize_y; col++) {
      const f = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      f.textContent = 'f';
      f.setAttribute('x', (col + 0.5) * letterWidth);
      f.setAttribute('y', (row + 0.5) * letterHeight);
      f.setAttribute('fill', 'rgb(0, 86, 209)');
      f.setAttribute('font-size', '36px'); // Change the font size here
      f.setAttribute('font-family', 'Arial'); // Change the font type here

      svg.appendChild(f);
    }
  }

// Track mouse movement
svgContainer.addEventListener('mousemove', (event) => {
    const { offsetX, offsetY } = event;
  
    // Check if the mouse is within the grid area
    const gridRect = svg.getBoundingClientRect();
    if (
      offsetX >= gridRect.left &&
      offsetX <= gridRect.right &&
      offsetY >= gridRect.top &&
      offsetY <= gridRect.bottom
    ) {

      // Calculate the relative mouse position within the grid
      const relativeX = offsetX - gridRect.left;
      const relativeY = offsetY - gridRect.top;
  
      // Calculate the skew angle based on the relative mouse position
        const skewAngle_x = ((relativeX - gridRect.width/3.)/ gridRect.width)*60 ;
        const scalingFactor = ((relativeY * 1.1)/ gridRect.height) + 0.5 ;
        // Apply skew transformation to the bottom layer
        const kShadow = document.getElementsByClassName('k-shadow');
        for (let i = 0; i < kShadow.length; i++) {
        const single_k = kShadow[i];
        const originalX = parseFloat(single_k.getAttribute('x'));
        const originalY = parseFloat(single_k.getAttribute('y'));

        // Apply skew transformation using skewX() and adjust transform origin
        single_k.setAttribute('transform-origin', `${originalX + letterWidth / 2}px ${originalY}px`);

        // Apply skew transformation using skewX()
        single_k.setAttribute('transform', `skewX(${skewAngle_x}) scale(1, ${scalingFactor}) `);
        }
    } 
  });
// Track mouse movement
svgContainer.addEventListener('mouseleave', () => {
    const kShadow = document.getElementsByClassName('k-shadow');
    for (let i = 0; i < kShadow.length; i++) {
      const single_k = kShadow[i];
      single_k.setAttribute('transform', `skewX(20) scale(1, 1) `);

    }
  });

  