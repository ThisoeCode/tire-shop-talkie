$(_=>{

/////// INIT

let
  carIdInput = 1,
  nthOpt = 0

const
  /** `optList.append( section.k2 )` */
  newOpt=_=>{
    const
      key = ++nthOpt,
      $aopt = $($('template#opt').html()),
      newStepItem =nth=>{
        const $stepItem = $('<i class="step item"></i>')
        Object.entries(options).forEach(([key,label])=>{
          const $btn = $(
            `<button class="${key}">
              <i class="_${key} svg"></i>
              <span>${label}</span>
            </button><hr>`
          )
          $stepItem.append($btn)
        })
        return $stepItem
      }

    $aopt.find('label').each(function(){
      $(this).attr('for', $(this).attr('for') + key)
    })
    $aopt.find('input').each(function(){
      $(this).attr('id', $(this).attr('id') + key)
    })
    $aopt.append(newStepItem(key))

    $('#optswrap').append($aopt.addClass(`k${key}`))
    $('html,body').scrollTop($(`.k${key}`).offset().top)
  },

  /** `#ttl.val( sum(.iprice) )` */
  calcTTL=_=>{
    let ttlPrice = 0
    $('.iprice').each(function(){
      const val = parseFloat($(this).val())
      if(!isNaN(val)) ttlPrice += val
    })
    $('#ttl').val(ttlPrice)
  }



$('#icarid').focus()



/////// LISTENERS

$('#newopt').click(newOpt)


$('#yard')

// Unfocus on Enter
.on('keydown','input',function(e){
  if(e.key==='Enter'){
    e.preventDefault()
    this.blur()
  }
})

.on('input','#icarid',function(){
  const
    val=this.value
    l = val.length
  // // 차번호 strech input field if longer than 4 char
  // const norm = this.value.length<5
  // $(this).css('width',norm?'99pt' : 'calc(99vw - 117px)')
  //        .css('font-size',norm?'39pt' : '30pt')

  l>0 ?
    $('title').text(val) :
    $('title').text("ACME TIRE")

  // Unfocus
  if(l===4){
    this.blur()
    flex('#submit')
    if(carIdInput){
      newOpt()
      flex('#newopt,#ttl-wrap')
      carIdInput=0
    }
    window.onbeforeunload=function(){return true}
  }
  l<4 && hide('#submit')
})


$('#optswrap')

// stage selected option to `p.selected-item`
.on('click',`.step.item>button`,function(){
  const
    k=nthof(this),
    key=$(this).attr('class')
  // show detail
  hide(`${k} .step.item`)
  $(`${k} .selected-item>.svg`).addClass(`_${key}`)
  flex(`${k} .selected-item span`).text(options[key])
  // put item description
  if(key!=='others')
    $(`${k} .idesc`).val(options[key])
})

// NEWTIRE
.on('click','.newtire',function(){
  const k=nthof(this)
  SIZE.forEach(x=>
    $(`${k} .sizelist`).append(
      $(`<button>${x}</button>`)
    )
  )
  flex(`${k} .step.newtires, ${k} .step.detail, ${k} .per, ${k} .count, ${k} .price`)
  $('.imodel').focus()
})
// choose size
.on('click','.sizelist>button',function(){
  $(`${nthof(this)} .isize`).val($(this).text())
})

// PRICE options
.on('click',PN,function(){
  const k=nthof(this)
  flex(`${k} .step.detail, ${k} .price`)
  $('.iprice').focus()
})

// COUNT options
.on('click',CN,function(){
  const k=nthof(this)
  flex(`${k} .step.detail, ${k} .count`)
  $('.icount').focus()
})

// PRICE+UNITPRICE+COUNT
.on('click',PC,function(){
  const k=nthof(this)
  flex(`${k} .step.detail, ${k} .per, ${k} .count, ${k} .price`)
  $('.iper').focus()
})

// BUYIN option
.on('click','.buyin',function(){
  const k=nthof(this)
  flex(`${k} .step.detail, ${k} .minus, ${k} .count, ${k} .price`)
  $('.iper').focus()
})

// OTHER option
.on('click','.others',function(){
  const k=nthof(this)
  flex(`${k} .step.detail, ${k} .desc, ${k} .per, ${k} .price, ${k} .count`)
  $('.idesc').focus()
})

// others title update with input
.on('input','.idesc',function(){
  const
    k=nthof(this),
    val=this.value.trim()
  $(`${k} .selected-item span`).text(
    val ? `기타 (${val})` : '기타'
  )
})

// calc .iprice (iper * icount)
.on('input','.iper,.iminus,.icount',function(){
  const
    k=nthof(this),
    per=`${k} .iper`,
    minus=`${k} .iminus`,
    cnt=`${k} .icount`,
    ttl=`${k} .iprice`,
    p=Number($(per).val())||0,
    m=-(Number($(minus).val())||0),
    n=Number($(cnt).val())
  $(ttl).val(
    (n ? (p+m)*n : p+m) || ''
  )
  calcTTL()
})

// calc ttl (Σ .iprice)
.on('input','.iprice',calcTTL)

// delete btn
.on('click','.del',function(){
  const k=nthof(this)
  $(k).slideUp(100,function(){
    $(this).remove()
    calcTTL()
  })
})



/////// AJAX

$('#submit').click(_=>{
  flex('#backdrop')
  const
    opts = $('section').map(function(){
      const
        $opt = $(this),
        idesc = $opt.find('.idesc').val(),
        iminus = $opt.find('.iminus').val()

      let
        desc=idesc,
        minus=iminus ? '-'+iminus : '',
        per=$opt.find('.iper').val() || minus,
        count=$opt.find('.icount').val() || '',
        price=$opt.find('.iprice').val() || ''

      // write `desc`
      if(idesc === '') return
      if(idesc===options['newtire']){
        const
          model = $opt.find('.imodel').val().trim(),
          size = $opt.find('.isize').val().trim()
        desc = size ? `${model} 【${size}】` : model
      }

      // prepare `count`: if empty, fill 1
      if(
        (['newtire','oldtire','oldwheel'].map(k=>options[k]))
          .includes(idesc)
      ){
        if(count==='' && !([0,'0',''].includes(per))){
          count='1'
        }
      }

      return{
        desc, per, count, price,
        note: $opt.find('.inote').val().trim() || '',
      }
    }).get(),

    coll = {
      dt: Math.floor(Date.now() / 1000),
      carid: $('#icarid').val(),
      /** @type {Array<{desc: string, count: number|"", price: number|"", note: string}>} */
      opts: opts.length ? opts : [{desc:'',per:'',count:'',price:'',note:''}],
      ttl: $('#ttl').val() || '0',
    }

  // TEST
  // console.dir(coll)

  $.post('api/post',coll)
    .done(_=>{
      window.onbeforeunload=function(){return null}
      $('#backdrop>p').text('✅')
      setTimeout(_=>window.location.reload(),799)
    })
    .fail((xhr,status,error)=>{
      // hide('#backdrop')
      console.error('[전송 실패] jqXHR obj:')
      console.dir(xhr)
      alert(`[전송 실패] ${xhr.status}\n  ${status}: ${error}`)
      $('#backdrop>p').text('전송 실패')
      setTimeout(_=>{
        hide('#backdrop')
        $('#backdrop>p').text('보내는중...')
      },3000)
    })
})



})