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

// Use the same files already shown on the page so the lightbox always resolves.
const skillGalleries = {
  faith: [
    'images/features/skill-faith.png',
    'images/features/skill-faith-show.png'
  ],
  defence: [
    'images/features/skill-defence.png',
    'images/features/skill-defence-show.png'
  ],
  survival: [
    'images/features/skill-survival.png',
    'images/features/skill-survival-show.png'
  ]
};

let currentIndex = 0;
let activeImages = images;
let ignoreBackdropUntil = 0;

function getLightbox() {
  return document.getElementById('lightbox');
}

function getLightboxImage() {
  return document.getElementById('lightbox-image');
}

function getPrivacyModal() {
  return document.getElementById('privacy-modal');
}

function openLightbox(index, list) {
  const lightbox = getLightbox();
  const lightboxImage = getLightboxImage();
  if (!lightbox || !lightboxImage) return;

  activeImages = list && list.length ? list : images;
  currentIndex = Number(index) || 0;
  if (currentIndex < 0 || currentIndex >= activeImages.length) currentIndex = 0;

  lightboxImage.alt = 'Screenshot';
  lightboxImage.src = activeImages[currentIndex];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Opening click must not immediately hit the backdrop and close/break the modal.
  ignoreBackdropUntil = Date.now() + 350;
}

function openSkillLightbox(path, index, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const gallery = skillGalleries[path];
  if (!gallery) return;
  openLightbox(index, gallery);
}

function closeLightbox() {
  const lightbox = getLightbox();
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeImage(step) {
  const lightboxImage = getLightboxImage();
  if (!lightboxImage || !activeImages.length) return;
  currentIndex = (currentIndex + step + activeImages.length) % activeImages.length;
  lightboxImage.src = activeImages[currentIndex];
}

function onBackdropClick(e) {
  const lightbox = getLightbox();
  if (!lightbox) return;
  if (Date.now() < ignoreBackdropUntil) return;
  if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrapper')) {
    closeLightbox();
  }
}

function openPrivacyModal() {
  const privacyModal = getPrivacyModal();
  if (!privacyModal) return;
  privacyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
  const privacyModal = getPrivacyModal();
  if (!privacyModal) return;
  privacyModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function onPrivacyBackdropClick(e) {
  const privacyModal = getPrivacyModal();
  if (!privacyModal) return;
  if (e.target === privacyModal) {
    closePrivacyModal();
  }
}

document.addEventListener('keydown', function (e) {
  const lightbox = getLightbox();
  if (e.key === 'Escape') {
    closeLightbox();
    closePrivacyModal();
  }
  if (lightbox && lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  }
});
