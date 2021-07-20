'use strict' 
{
  const works = document.querySelectorAll('#works > li p');
  const close = document.querySelectorAll('.close');
  const content = document.querySelectorAll('.content');
  const mask = document.getElementById('mask');

    works.forEach( work=> {
      work.addEventListener('click', ()=> {
        document.getElementById(work.dataset.id).classList.add('active');
        document.getElementById(work.dataset.id).classList.remove('hidden');
        mask.classList.remove('hidden');
      });
    });

    close.forEach( close=> {
      close.addEventListener('click', ()=> {
        content.forEach( content=> {
          if (content.classList.contains('active')) {
            content.classList.remove('active');
            content.classList.add('hidden');
          }
          mask.classList.add('hidden');
        });
      });
    });

    mask.addEventListener('click', ()=> {
      close.forEach( close=> {
        close.click();
      });
    });
} 