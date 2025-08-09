navigator.serviceWorker.register('sw.js?v=sw3',{scope:'/admin/accountance'})
  .then(reg=>{
    if(!navigator.serviceWorker.controller)
      location.reload()
  })
  .catch(e=>console.error('SW err: ',e))



$(_=>{

/////// INIT

const
  /** Date obj `...string` => Unix timestamp (sec) */
  UNIXFY =(..._)=> Math.floor(new Date(_).getTime() / 1000)

let
  // TODAY
  now = new Date(),
  TODAY = UNIXFY(now.getFullYear(),now.getMonth()+1,now.getDate()) + '',
  TODAY_calendar = (new Date(Number(TODAY) * 1000)).toLocaleDateString('en-CA'),
  lastRow=TODAY,
  pollItv=null,
  isOddrow=true,
  bell=false

const

  dt=unix=>{
    const
      d = new Date(unix*1000),
      pad=_=>_.toString().padStart(2, '0')
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`
  },
  x0000=_=>_ ? (parseFloat(_)*10000).toLocaleString() : '',

// POLL
  POLL=callback=>$.get("api/poll",{unix:lastRow},function(
    /** @type { Array<{
      dt: number
      carid: string
      opts: Array<{
        desc: string
        per: string
        count: number | string | ""
        price: number | string | ""
        note: string
      }>
      ttl: string
    }> } */
    data
  ){
    callback(data)
  },"json"),

// Add a row of data
  arow=adata=>{
    const
      {dt:unix, carid, opts=[], ttl} = adata,
      nOpts = opts.length,
      trs = [],
      $tr0 = $('<tr>'),
      firstOpt = opts[0] || {}

    // Calculations
    let priceSum = 0
    opts.forEach(aopt=>{
      const p = parseFloat(aopt.price)
      if(!isNaN(p)) priceSum+=p
    })
    const diff = parseFloat(ttl) - priceSum

    // First row
    $tr0
      .append(`<td rowspan="${nOpts}" class="tdate">${dt(unix)}</td>`)
      .append(`<td rowspan="${nOpts}" class="tcarid">${carid}</td>`)
      .append(`<td rowspan="${nOpts}" class="tttl">${x0000(ttl)}${
        diff!==0 ? ` <span>(${
          diff>0 ? `+${diff}` : diff
        })</span>`:''
      }</td>`)
      .append(`<td>${firstOpt.desc||''}</td>`)
      .append(`<td>${x0000(firstOpt.per)||''}</td>`)
      .append(`<td>${firstOpt.count||''}</td>`)
      .append(`<td>${x0000(firstOpt.price)||''}</td>`)
      .append(`<td>${firstOpt.note||''}</td>`)
    isOddrow && $tr0.addClass('odd')
    $tr0.addClass('firstrow')

    trs.push($tr0)

    // Remaining opts
    for(let i=1;i<opts.length;i++){
      const
        opt = opts[i],
        $tr1 = $('<tr>')
      $tr1
        .append(`<td>${opt.desc||''}</td>`)
        .append(`<td>${x0000(opt.per)}</td>`)
        .append(`<td>${opt.count||''}</td>`)
        .append(`<td>${x0000(opt.price)}</td>`)
        .append(`<td>${opt.note||''}</td>`)
      isOddrow && $tr1.addClass('odd')

      trs.push($tr1)
    }
    isOddrow=!isOddrow
    return trs
  },

  // prepend whole data array
  /** @param _ - If truthy show Notification */
  renderPoll=_=>{
    POLL(data=>{
      if(data.length>0) lastRow=data[0].dt
      console.log(`[Thisoe] Polled ${data.length} data. (${dt(lastRow).slice(17)})`)
      let $after = $('#th')
      data.forEach(row=>{
        _||NOTIFICATE(row)
        arow(row).forEach($tr=>{
          $after.after($tr)
          $after = $tr
        })
      })
    })
    // calendar choose new day when date change
    // TODO: test at 11:59
    if(now/1000-Number(TODAY) > 86400){
      now = new Date()
      TODAY = UNIXFY(now.getFullYear(),now.getMonth()+1,now.getDate()) + ''
      TODAY_calendar = (new Date(Number(TODAY) * 1000)).toLocaleDateString('en-CA')
      lastRow=TODAY
      restartPoll()
    }
  },

  clearPollItv=_=>{
    if(pollItv){
      clearInterval(pollItv)
      pollItv=null
    }
  },

  restartPoll=_=>
    setTimeout(_=>{
      // reset vars
      lastRow=TODAY
      isOddrow=true

      renderPoll(1)

      // reset itv
      clearPollItv()
      pollItv = setInterval(renderPoll,9999)
    },9)
  ,

  calendar=_=>{
    const
      ifrom = $('#calendar').val(), // YYYY-MM-DD
      from = UNIXFY(ifrom + "T00:00:00")

    $('table').find('tr').not('#th').remove()

    if(ifrom===TODAY_calendar){
      $('#limittoday').fadeOut(100)
      return restartPoll()
    }

    $('#limittoday').fadeIn(100)

    $.get("api/history",{from},function(data){
      console.log(`[Thisoe] Got ${data.length} history data from ${ifrom}`)
      let $after = $('#th')
      data.forEach(row=>{
        arow(row).forEach($tr=>{
          $after.after($tr)
          $after = $tr
        })
      })
    },"json")
  },

// toggle notification
  bellToggle=_=>{
    switch(_){
      case true: bell=true
        break
      case false: bell=false
        break
      default:
        bell=!bell
    }
    $('#notification>.bell')
      .removeClass(bell?'off':'on')
      .addClass(bell?'on':'off')
    // $('#notification>p').text(bell?'알람 끄기':'알람 켜기')
  },

  NOTIFICATE=row=>{if(bell){
    if(!navigator.serviceWorker.controller){return}
    navigator.serviceWorker.controller.postMessage({
      type: 'show-notification',
      carid: row.carid,
      ttl: x0000(row.ttl)||0,
    })
  }}



/////// RENDER

// list table headers <th>
Object.entries(columns).forEach(([key,label])=>{
  const $thr = $(`<th class="${key}">${label}</th>`)
  $('#th').append($thr)
})

// list TODAY's data
restartPoll()

// Calendar default value
$('#calendar').val(TODAY_calendar)




/////// LISTENERS

// See History
$('#calendar').on('change',calendar)

$('#limittoday').click(function(){
  $('#calendar').val(TODAY_calendar)
  calendar()
})

// Check notification permission
if("Notification" in window){
  if(Notification.permission==="granted") bellToggle(true)
}

// Toggle notification on click
$('#notification').click(function(){
  if(!("Notification" in window) || !('serviceWorker' in navigator)){
    $(this).prop('disabled', true)
    return alert('귀하의 브라우저에서는 알림을 보낼 수 없습니다.')
  }

  if(Notification.permission === "granted")
    bellToggle()
  else if (Notification.permission !== "denied"){
    // ask for permission
    Notification.requestPermission().then(permission=>{
      if(permission==="granted"){
        bellToggle(true)
      }
    })
  }
})


})