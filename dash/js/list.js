var q, chips, cards, empty, filter, apply;
q = document.querySelector('#q');
chips = Array.from(document.querySelectorAll('.chip'));
cards = Array.from(document.querySelectorAll('#grid .card'));
empty = document.querySelector('#empty');
filter = '';
apply = function(){
  var kw, n;
  kw = q.value.trim().toLowerCase();
  n = 0;
  cards.forEach(function(c){
    var ok;
    ok = (!filter || c.dataset.badge === filter) && (!kw || c.dataset.text.indexOf(kw) >= 0);
    c.hidden = !ok;
    if (ok) {
      return n++;
    }
  });
  return empty.hidden = n > 0;
};
chips.forEach(function(b){
  return b.addEventListener('click', function(){
    chips.forEach(function(it){
      return it.classList.remove('on');
    });
    b.classList.add('on');
    filter = b.dataset.f;
    return apply();
  });
});
q.addEventListener('input', apply);