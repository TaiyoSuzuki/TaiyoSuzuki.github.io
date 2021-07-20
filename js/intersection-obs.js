'use strict';
{
  const targets = document.querySelectorAll('.grid-container li');

  function callback(items, obs) {
    items.forEach((item, i)=> {
      if (!item.isIntersecting) {
        return;
      }
      setTimeout(() => {
        item.target.classList.add('appear');
      }, 100 * i);
      obs.unobserve(item.target);
    });
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  }

  const observer = new IntersectionObserver(callback, options);

  targets.forEach(target=> {
    observer.observe(target);
  });

}