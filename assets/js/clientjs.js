document.addEventListener('DOMContentLoaded', () => {

  function fadeError() {

    var errbox = document.getElementById('errbox');

    setTimeout(() => {
      errbox.style.display = 'none';
    }, 3000);
  }

  if (window.error) {
    fadeError();
  }

});
