init(paper) {
  paper.addEventListener('touchstart', (e) => {
    if (this.holdingPaper) return; 
    this.holdingPaper = true;
    console.log("Touchstart detected:", paper);

    paper.style.zIndex = highestZ;
    highestZ += 1;

    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  });

  paper.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent default scrolling
    console.log("Touchmove detected at:", e.touches[0].clientX, e.touches[0].clientY);

    if (this.holdingPaper) {
      this.touchMoveX = e.touches[0].clientX;
      this.touchMoveY = e.touches[0].clientY;

      this.velX = this.touchMoveX - this.prevTouchX;
      this.velY = this.touchMoveY - this.prevTouchY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevTouchX = this.touchMoveX;
      this.prevTouchY = this.touchMoveY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }, { passive: false });

  paper.addEventListener('touchend', () => {
    this.holdingPaper = false;
    console.log("Touchend detected:", paper);
  });
}
