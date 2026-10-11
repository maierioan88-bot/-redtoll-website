const images = [
  'images/1.png',
  'images/2.png',
  'images/3.png',
  'images/4.png',
  'images/5.png',
  'images/6.png',
  'images/7.png',
  'images/8.png',
  'images/9.png'
];

const skillImages = [
  'images/features/skill-faith-full.png',
  'images/features/skill-defence-full.png',
  'images/features/skill-survival-full.png'
];

let currentIndex = 0;
let activeImages = images;
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const privacyModal = document.getElementById('privacy-modal');

function openLightbox(index, list) {
  if (!lightbox || !lightboxImage) return;
  activeImages = list || images;
  currentIndex = index;
  lightboxImage.src = activeImages[currentIndex];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openSkillLightbox(index) {
  openLightbox(index, skillImages);
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeImage(step) {
  if (!lightboxImage || !activeImages.length) return;
  currentIndex = (currentIndex + step + activeImages.length) % activeImages.length;
  lightboxImage.src = activeImages[currentIndex];
}

function onBackdropClick(e) {
  if (!lightbox) return;
  if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrapper')) {
    closeLightbox();
  }
}

function openPrivacyModal() {
  if (!privacyModal) return;
  privacyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
  if (!privacyModal) return;
  privacyModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function onPrivacyBackdropClick(e) {
  if (!privacyModal) return;
  if (e.target === privacyModal) {
    closePrivacyModal();
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeLightbox();
    closePrivacyModal();
  }
  if (lightbox && lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  }
});
