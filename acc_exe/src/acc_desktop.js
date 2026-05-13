/**
 * @typedef {Object} Opt
 * @property {string} desc
 * @property {string} per
 * @property {number|string|""} count
 * @property {number|string|""} price
 * @property {string} note
 */
/**
 * @typedef {Object} Adata
 * @property {number} dt
 * @property {string} carid
 * @property {Array<Opt>} opts
 * @property {string[]} cbs
 * @property {string[]} plain
 * @property {string} ttl
 */



$(_=>{

/////// INIT & CONFIG
let
  TEST=false

const
  /** Date obj `...string` => Unix timestamp (sec) */
  UNIXFY = (...args)=>{ // GPT-5 helped fixing
    let d
    if(args.length === 1){
      d = new Date(args[0])
    }else if(args.length >= 3 && args.every(v => typeof v === 'number')){
      const [y, m, day, ...rest] = args
      d = new Date(y, m - 1, day, ...rest)
    }else{
      d = new Date(...args)
    }
    return Math.floor(d.getTime() / 1000)
  }

let
  // TODAY
  now = new Date(),
  TODAY = UNIXFY(now.getFullYear(),now.getMonth()+1,now.getDate()) + '',
  TODAY_calendar = (new Date(Number(TODAY) * 1000)).toLocaleDateString('en-CA'),
  lastRow=TODAY,
  pollItv=null,
  isOddrow=true,
  bell=true

const

  dt=unix=>{
    const
      d = new Date(unix*1000),
      pad=_=>_.toString().padStart(2, '0')
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`
  },
  x0000=_=>_ ? (parseFloat(_)*10000).toLocaleString() : '',

  flipOdd=_=>isOddrow=!isOddrow,
  checkFlipOdd=_=>_>0&&_%2===0&&flipOdd(),

// POLL
  POLL=callback=>$.get(DOMAIN+"api/poll",{unix:lastRow},
  /** @param {Adata[]} data */
  function(data){
    callback(data)
  },"json"),

// Add a row of data
  arow=adata=>{
    const
      /** @type {Adata} */
      {row, dt:unix, carid, opts=[], cbs, plain, ttl} = adata,
      isOptEmpty = opts.length===1 && opts[0].desc==='',
      rowspan = `rowspan="${
        ((isOptEmpty?0:opts.length)
          +(!!cbs&&1)
          +(!!plain&&1)
        )||1
      }"`,
      R=`class="r${row}"`,
      trs = [],
      $tr0 = $(`<tr ${R}>`),
      firstOpt = opts[0] || {},
      mic='<i class="micon"><i class="mic svg"></i></i>'

    // Calculations
    let priceSum = 0
    opts.forEach(aopt=>{
      const p = parseFloat(aopt.price)
      if(!isNaN(p)) priceSum+=p
    })
    const diff = parseFloat(ttl) - priceSum

    // First row
    $tr0 // meta
      .append(`<td ${rowspan}><input type="checkbox" class="sel" id="sel${row}"></td>`)
      .append(`<td ${rowspan} class="tdate">${dt(unix)}</td>`)
      .append(`<td ${rowspan} class="tcarid">${carid}</td>`)
      .append(`<td ${rowspan} class="tttl">${x0000(ttl)}${
        diff!==0 ? ` <span>(${
          diff>0 ? `+${diff}` : diff
        }만)</span>`:''
      }</td>`)
    // following cells
    plain
    ? $tr0.append(`<td class="plain" colspan="5"><i><span class="info">${mic}음성</span><p>${
          plain.join('<br>').replaceAll('\n','<br>')
        }</p></i></td>`)
    : isOptEmpty
      ? cbs
        ? $tr0.append(`<td class="cbs" colspan="5"><span class="info">기타사항</span>${cbs.join(' · ')}</td>`)
        : $tr0.append(`<td colspan="5"><span class="info" style="color:#a33">- 기록 없음 -</span></td>`)
      : $tr0
        .append(`<td>${firstOpt.desc||''}</td>`)
        .append(`<td>${x0000(firstOpt.per)||''}</td>`)
        .append(`<td>${firstOpt.count||''}</td>`)
        .append(`<td>${x0000(firstOpt.price)||''}</td>`)
        .append(`<td>${firstOpt.note||''}</td>`)

    isOddrow && $tr0.addClass('odd')
    $tr0.addClass('firstrow')

    trs.push($tr0)

    // Remaining opts
    if(!isOptEmpty) for(let i=plain?0:1;i<opts.length;i++){
      const
        opt = opts[i],
        $tr1 = $(`<tr ${R}>`)
      $tr1
        .append(`<td>${opt.desc||''}</td>`)
        .append(`<td>${x0000(opt.per)}</td>`)
        .append(`<td>${opt.count||''}</td>`)
        .append(`<td>${x0000(opt.price)}</td>`)
        .append(`<td>${opt.note||''}</td>`)
      isOddrow && $tr1.addClass('odd')

      trs.push($tr1)
    }

    // Checks
    cbs&&(plain||!isOptEmpty)&&(_=>{
      const trCb =
        $(`<tr ${R}>`).append(
          `<td class="cbs" colspan="5"><span class="info">기타사항</span>${cbs.join(' · ')}</td>`
        )
      isOddrow && trCb.addClass('odd')
      trs.push(trCb)
    })()

    flipOdd()
    return trs
  },

  // prepend whole data array
  /** @param _ - If truthy show Notification */
  renderPoll=_=>{
    POLL(data=>{
      const len = data.length
      TEST&&console.dir({TEST:data})
      if(len>0) lastRow=data[0].dt
      TEST&&console.log(`[Thisoe] Polled ${len} data.`/* +` (${dt(lastRow).slice(17)})` */)
      let $after = $('#th')
      data.forEach(row=>{
        _||NOTIFICATE(row)
        arow(row).forEach($tr=>{
          $after.after($tr)
          $after = $tr
        })
      })
      checkFlipOdd(len)
    })
    // calendar choose new day when date change
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
      // isOddrow=true

      renderPoll(1)

      // reset itv
      clearPollItv()
      pollItv = setInterval(renderPoll,5000)
    },9)
  ,

  calendar=_=>{
    const
      ifrom = $('#calendar').val(), // YYYY-MM-DD
      from = UNIXFY(ifrom + "T00:00:00")

    $('table').find('tr').not('#th').remove()
    $('#emptyrow').hide()

    if(ifrom===TODAY_calendar){
      $('#limittoday').fadeOut(100)
      return restartPoll()
    }

    $('#limittoday').fadeIn(100)

    $.get(DOMAIN+"api/history",{from},function(data){
      const len = data.length
      console.log(`[Thisoe] Got ${len} history data from ${ifrom}`)
      if(len){
        let $after = $('#th')
        data.forEach(row=>{
          arow(row).forEach($tr=>{
            $after.after($tr)
            $after = $tr
          })
        })
        checkFlipOdd(len)
      }else{
        $('#emptyrow span').text(`${ifrom.slice(5,7)}/${ifrom.slice(8,10)}`)
        $('#emptyrow').show()
      }
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
        console.log('알람 ',bell?'ON':'OFF')
    }
    $('#notification>.bell')
      .removeClass(bell?'off':'on')
      .addClass(bell?'on':'off')
  },

  NOTIFICATE=row=>
    bell && sw.notify(row),

  delsel=_=>{
    const
      getrow=_=>$(_).attr('id').slice(3),
      rows=[]
    $('.sel').each(function(){
      $(this).prop('checked')
        &&rows.push(getrow(this))
    })
    const len = rows.length
    if(len>0 && confirm(`삭제는 복원할수 없습니다.\n이 ${len}개행를 삭제하시겠습니까?`)){
      rows.forEach( row => $(`.r${row}`).remove() )
      $('#selall').prop('checked',false)
      $('#delsel').prop('disabled',true)
      $.post(DOMAIN+'api/del',{rows},_=>checkFlipOdd(len+1))
        .fail((xhr,status,error)=>{
          console.error('[삭제 전송 실패] jqXHR:')
          console.dir({xhr,status,error})
          alert('⚠️삭제를 서버로 전송실패⚠️')
        })
    }
  }



//endof INIT (const)
/////// RENDER

// list table headers <th>
Object.entries(columns).forEach(([key,label])=>{
  const $thr = $(`<th class="${key}">${label}</th>`)
  $('#th').append($thr)
})

bellToggle(true)

// FIRST LOAD: list TODAY's data
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

// DEL
$('table').on('change','.sel',function(){
  const
    $all=$('#selall'),
    ischecked = $(this).prop('checked'),
    isAllChecked=$('.sel').length===$('.sel:checked').length,
    isAllUnchecked=$('.sel:checked').length===0
  if(ischecked){
    // check SELALL if all checked
    isAllChecked&&$all.prop('checked',true)
    // enable del btn
    $('#delsel').prop('disabled',false)
  }else{
    // uncheck SELALL
    $all.prop('checked',false)
    // disable del btn if none checked
    isAllUnchecked&&$('#delsel').prop('disabled',true)
  }
})
$('table').on('change','#selall',function(){
  const
    isselall = $(this).prop('checked')
  $('.sel').prop('checked',isselall?true:false)
  $('#delsel').prop('disabled',!isselall)
})
$('#delsel').click(delsel)
$(document).on('keydown',function(e){
  // delete key
  if(e.which===46) delsel()
})



/////// DESKTOP EXCLUSIVE
$('#logo').on('click',_=>location.reload())



})