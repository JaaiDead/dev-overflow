document.addEventListener('DOMContentLoaded', function () {
    M.Parallax.init(document.querySelectorAll('.parallax'));
    AOS.init({
      duration: 1000,
      once: true
    });
  
    document.getElementById('contact-form').addEventListener('submit', function (e) {
      e.preventDefault();
      M.toast({ html: 'Message sent!', classes: 'green darken-1' });
    });
  });
  