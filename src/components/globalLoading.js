// globalLoading.js
import '../assets/css/globalLoading.css';

(function () {
  const overlay = document.createElement('div');
  overlay.id = 'global-loading-overlay';
  overlay.innerHTML = `
    <div id="global-loading-spinner"></div>
  `;
  document.body.appendChild(overlay);

  window.showLoading = function () {
    overlay.classList.add('active');
  };

  window.hideLoading = function () {
    overlay.classList.remove('active');
  };
})();
