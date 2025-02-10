class Lightbox {
  constructor() {
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'lightbox';
    document.body.appendChild(this.container);

    this.lightboxImg = document.createElement('img');
    this.container.appendChild(this.lightboxImg);

    this.caption = document.createElement('div');
    this.caption.id = 'lightbox-caption';
    this.container.appendChild(this.caption);

    this.closeBtn = document.createElement('button');
    this.closeBtn.id = 'lightbox-close';
    this.closeBtn.innerHTML = '×';
    this.container.appendChild(this.closeBtn);

    this.prevBtn = document.createElement('button');
    this.prevBtn.id = 'lightbox-prev';
    this.prevBtn.innerHTML = '❮';
    this.container.appendChild(this.prevBtn);

    this.nextBtn = document.createElement('button');
    this.nextBtn.id = 'lightbox-next';
    this.nextBtn.innerHTML = '❯';
    this.container.appendChild(this.nextBtn);

    this.currentIndex = 0;
    this.images = [];
    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll('.gallery-image .img-box a').forEach((item, index) => {
      this.images.push({
        src: item.href,
        caption: item.querySelector('.caption')?.innerHTML || ''
      });

      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentIndex = index;
        this.showLightbox();
      });
    });

    this.closeBtn.addEventListener('click', () => this.hideLightbox());
    this.prevBtn.addEventListener('click', () => this.navigate(-1));
    this.nextBtn.addEventListener('click', () => this.navigate(1));

    document.addEventListener('keydown', (e) => {
      if (!this.container.classList.contains('active')) return;
      if (e.key === 'Escape') this.hideLightbox();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
  }

  showLightbox() {
    this.container.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.updateImage();
  }

  hideLightbox() {
    this.container.classList.remove('active');
    document.body.style.overflow = '';
  }

  updateImage() {
    const image = this.images[this.currentIndex];
    this.lightboxImg.src = image.src;
    this.caption.innerHTML = image.caption;
    
    // Update navigation buttons visibility
    this.prevBtn.style.display = this.currentIndex > 0 ? 'block' : 'none';
    this.nextBtn.style.display = this.currentIndex < this.images.length - 1 ? 'block' : 'none';
  }

  navigate(direction) {
    this.currentIndex += direction;
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= this.images.length) this.currentIndex = this.images.length - 1;
    this.updateImage();
  }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Lightbox();
});