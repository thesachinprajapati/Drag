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