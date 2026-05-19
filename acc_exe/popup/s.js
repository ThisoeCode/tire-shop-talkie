const $=_=>document.getElementById(_)

let lastrow = null

window.popupAPI.onUpdate(({unread,data})=>{
  lastrow = data.id
  $("badge").textContent = String(unread)
  $("dt").textContent = data.dt.slice(0,-3)
  $("carid").textContent = data.carid
  $("msg").textContent = data.msg?data.msg+'...':'(내역 없음)'
})

$("close").addEventListener("click",e=>{
  e.stopPropagation()
  window.popupAPI.close()
})

$("main").addEventListener("click",e=>{
  if (e.target === $("close")) return
  window.popupAPI.bodyClick(lastrow)
})