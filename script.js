
const papers = document.querySelectorAll('.paper');

papers.forEach(paper => {
    paper.addEventListener('mousedown', startDrag);
    paper.addEventListener('touchstart', startDrag);
});

function startDrag(e) {
    const paper = e.currentTarget;
    let offsetX, offsetY;

    // Determine the offset based on mouse or touch
    if (e.type === 'touchstart') {
        offsetX = e.touches[0].clientX - paper.getBoundingClientRect().left;
        offsetY = e.touches[0].clientY - paper.getBoundingClientRect().top;
    } else {
        offsetX = e.clientX - paper.getBoundingClientRect().left;
        offsetY = e.clientY - paper.getBoundingClientRect().top;
    }

    function dragMove(e) {
        e.preventDefault();
        let posX, posY;

        if (e.type === 'touchmove') {
            posX = e.touches[0].clientX;
            posY = e.touches[0].clientY;
        } else {
            posX = e.clientX;
            posY = e.clientY;
        }

        paper.style.position = 'absolute';
        paper.style.left = posX - offsetX + 'px';
        paper.style.top = posY - offsetY + 'px';
    }

    function dragEnd() {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('touchend', dragEnd);
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchmove', dragMove);
    document.addEventListener('touchend', dragEnd);
}
// script.js

// Add your existing JavaScript code here, if any...



papers.forEach(paper => {
  let offsetX, offsetY;

  // Handle the start of the drag
  const startDrag = (event) => {
    event.preventDefault(); // Prevent default behavior
    const touch = event.touches ? event.touches[0] : event; // Get touch or mouse position
    offsetX = touch.clientX - paper.getBoundingClientRect().left;
    offsetY = touch.clientY - paper.getBoundingClientRect().top;
    
    paper.classList.add('dragging'); // Optional: Add a class to style dragging
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  };

  // Handle the drag movement
  const drag = (event) => {
    const touch = event.touches ? event.touches[0] : event; // Get touch or mouse position
    paper.style.left = `${touch.clientX - offsetX}px`;
    paper.style.top = `${touch.clientY - offsetY}px`;
  };

  // Handle the end of the drag
  const endDrag = () => {
    paper.classList.remove('dragging'); // Remove dragging class
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
  };

  // Attach event listeners for both mouse and touch
  paper.addEventListener('mousedown', startDrag);
  paper.addEventListener('touchstart', startDrag);
});