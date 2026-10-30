q = document.querySelector '#q'
chips = Array.from document.querySelectorAll '.chip'
cards = Array.from document.querySelectorAll '#grid .card'
empty = document.querySelector '#empty'
filter = ''

apply = ->
  kw = q.value.trim!toLowerCase!
  n = 0
  cards.for-each (c) ->
    ok = (!filter or c.dataset.badge == filter) and (!kw or c.dataset.text.indexOf(kw) >= 0)
    c.hidden = !ok
    if ok => n++
  empty.hidden = n > 0

chips.for-each (b) ->
  b.addEventListener \click, ->
    chips.for-each -> it.classList.remove \on
    b.classList.add \on
    filter := b.dataset.f
    apply!

q.addEventListener \input, apply
