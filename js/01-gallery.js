import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryImages = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryImages(galleryItems);

galleryImages.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryImages.addEventListener('click', onGalleryImagesClick);

let srcLargeImage;
let largeImage;

function createGalleryImages(galleryItems) {
	return galleryItems.reduce((acc, { preview, original, description }) => acc + `
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`, '');
}

function onGalleryImagesClick(e) {
	e.preventDefault();
	if (!e.target.classList.contains('gallery__image')) {
		return;
	};

	getSrcLargeImage(e);
	getLargeImage();

	window.addEventListener('keydown', onEscCloseImage);
	largeImage.show();
}

function getSrcLargeImage(e) {
	srcLargeImage = e.target.dataset.source;
}

function getLargeImage() {
	largeImage = basicLightbox.create(`
	<img src="${srcLargeImage}">`);
}

function onEscCloseImage(e) {
	if (e.code === 'Escape') {
		window.removeEventListener('keydown', onEscCloseImage);
		largeImage.close();
	}
}