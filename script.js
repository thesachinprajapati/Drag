paper.addEventListener('touchstart', (e) => {
  console.log("Touch Start Detected", e.touches[0].clientX, e.touches[0].clientY);
  if (this.holdingPaper) return;
  this.holdingPaper = true;
  // rest of the code...
});

paper.addEventListener('touchmove', (e) => {
  console.log("Touch Move Detected", e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
  if (this.holdingPaper) {
    this.touchMoveX = e.touches[0].clientX;
    this.touchMoveY = e.touches[0].clientY;

    this.velX = this.touchMoveX - this.prevTouchX;
    this.velY = this.touchMoveY - this.prevTouchY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

    this.prevTouchX = this.touchMoveX;
    this.prevTouchY = this.touchMoveY;
  }
});
