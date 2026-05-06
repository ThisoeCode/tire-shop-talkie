$(_=>{



/////// INIT

let
  TEST=false,
  carIdInput = 1,
  nthOpt = 0

const
  config={
    renderOnExpand:{
      show:'#plain,#newopt,#finale,#yard>hr,#optswrap>h2',
      plain:true,
      opt:false,
    },
  },

  CHECK_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 1600 1280"><path fill="#fff" d="M1575 310q0 40-28 68l-724 724l-136 136q-28 28-68 28t-68-28l-136-136L53 740q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295l656-657q28-28 68-28t68 28l136 136q28 28 28 68"/></svg>',
  cTTL='.selected-item span',

  /** `optList.append( section.k2 )` */
  newOpt=_=>{
    const
      key = ++nthOpt,
      $aopt = $($('template#opt').html()),
      newStepItem =_=>{
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
    $aopt.find('input')
      .attr('autocomplete', 'off')
      .each(function(){
        $(this).attr('id', $(this).attr('id') + key)
      })

    $aopt.append(newStepItem())

    $('#optswrap').append($aopt.addClass(`k${key}`))
    $('html,body').scrollTop($(`.k${key}`).offset().top-9)
  },

  /** `#ttl.val( sum(.iprice) )` */
  calcTTL=_=>{
    let ttlPrice = 0
    $('.iprice').each(function(){
      const val = parseFloat($(this).val())
      if(!isNaN(val)) ttlPrice += val
    })
    $('#ttl').val(ttlPrice)
  },

  listChecks=_=>{
    const $checksWrap = $('<i id="checks-wrap"></i>')
    Object.entries(checks).forEach(([key,label])=>{
      const $btn = $(
        `<button class="acheck">
          <i class="cb">${CHECK_SVG}</i>
          <span>${label}</span>
          <input type="checkbox" value="${key}">
        </button>`
      )
      $checksWrap.append($btn)
    })
    $('#finale').prepend($checksWrap)
  },

  newPlain=_=>$('#plain>.t-wrap').append(
    $(`<i><textarea name='plain'></textarea><button class='del'><i class='delete svg'></i></button></i>`)
  )



/////// RENDER

$('input').attr('autocomplete', 'off')
$('#icarid').focus()
listChecks()
config.renderOnExpand.plain&&newPlain()



/////// LISTENERS

// on root
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
        config.renderOnExpand.opt&&newOpt()
        flex(config.renderOnExpand.show)
        carIdInput=0
      }
      window.onbeforeunload=function(){return true}
    }
    l<4 && hide('#submit')
  })



// on opts
$('#newopt').click(newOpt)

$('#optswrap')

  // stage selected option to `p.selected-item`
  .on('click',`.step.item>button`,function(){
    const
      k=nthof(this),
      key=$(this).attr('class'),
      btns=`${k} .step.item`
    // show detail
    hide(btns)
    setTimeout(_=>rm(btns),999)
    $(`${k} .selected-item>.svg`).addClass(`_${key}`)
    flex(`${k} ${cTTL}`).text(options[key])
    // put item description
    if(key!=='others')
      $(`${k} .idesc`).val(options[key])
  })

  // NEWTIRE
  .on('click','.newtire',function(){
    const k=nthof(this)
    $(`${k} .new`).addClass('tire')
    TIRESIZES.forEach(x=>
      $(`${k} .sizelist`).append(
        $(`<button>${x}</button>`)
      )
    )
    flex(`${k} .step.new.tire, ${k} .step.detail, ${k} .per, ${k} .count, ${k} .price`)
    $('.imodel').focus()
  })
  // choose size
  .on('click','.sizelist>button',function(){
    $(`${nthof(this)} .isize`).val($(this).text())
  })

  // NEWWHEEL
  .on('click','.newwheel',function(){
    const
      k=nthof(this),
      cbKeys=Object.keys(WHEELcbs)
    $(`${k} .new`).addClass('wheel')
    // list `WHEELSIZES`
    WHEELSIZES.forEach(x=>
      $(`${k} .sizelist`).append($(`<button>${x}</button>`))
    )
    // list `WHEELcbs` and their checkboxes
    cbKeys.forEach(v=>{
      const
        $acbwrap=$(`<i class="newcbs"></i>`),
        $cb=_=>$(
          `<button class="acheck${
            // _==='선택 안함' ? ' noncheck" style="font-weight:normal">' :
            `"><i class="cb">${CHECK_SVG}</i>`
          }<span>${_}</span></button>`
        )
      // $acbwrap.append($cb('선택 안함'))
      WHEELcbs[v].forEach(y=>
        $acbwrap.append($cb(y))
      )
      $acbwrap.append($(`<input class="ncbval"name="${v}"type="text">`))
      $(`${k} .cb-wrap`).append($acbwrap)
    })
    cbKeys.length>0 && flex('.cb-wrap')
    // RENDER
    flex(`${k} .step.new.wheel, ${k} .step.detail, ${k} .per, ${k} .count, ${k} .price`)
    $('.imodel').focus()
  })
  // `.new` checkboxes
  .on('click','.newcbs>.acheck',function(){
    const
      $ncb=$(this).parent('.newcbs'),
      hc=_=>$(this).hasClass(_),
      isChecked=hc('checked'),
      val=_=>$ncb.find('input').val(_)
    $ncb.find('.checked').removeClass('checked')
    if(/*hc('noncheck') && */isChecked){
      val('')
      return
    }
    // normal: single check
    $(this).addClass('checked')
    val($(this).find('span').text())
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
    $(`${k} input`).addClass('calcoff')
    flex(`${k} .step.detail, ${k} .count`)
    $('.icount').focus()
  })

  // COUNT + PRICE options
  .on('click',CP,function(){
    const k=nthof(this)
    $(`${k} input`).addClass('calcoff')
    flex(`${k} .step.detail, ${k} .count, ${k} .price`)
    $('.iprice').focus()
  })

  // PRICE+UNITPRICE+COUNT options
  .on('click',PUC,function(){
    const k=nthof(this)
    flex(`${k} .step.detail, ${k} .per, ${k} .count, ${k} .price`)
    $('.iper').focus()
  })

  // BUYIN/DISCOUNT option
  .on('click','.buyin',function(){
    const k=nthof(this)
    flex(`${k} .step.detail, ${k} .minus, ${k} .count, ${k} .price`)
    $('.iminus').focus()
  })

  // BUYIN/DISCOUNT option
  .on('click','.discount',function(){
    const k=nthof(this)
    $(`${k} .minus label`).text('빼는금액 (만원)')
    flex(`${k} .step.detail, ${k} .minus`)
    $('.iminus').focus()
  })

  // MOUNTING `탈/부착` & `위치교환` toggle checkbox
  .on('click','.mounting',function(){
    $(`${nthof(this)} .step.detail`).prepend($(`
      <i class='cb-wrap'><i class='ttlcbs'>
        <button class='acheck'>
          <i class="cb">${CHECK_SVG}</i>
          <span>위치교환</span>
        </button>
      </i></i>
    `))
  })
  // `.ttlcbs` title toggling functionality
  .on('click','.ttlcbs .acheck',function(){
    // Thisoe NOTE: This ONLY works for `위치교환`!
    // When multiple / automation needed, PLZ REFACTOR
    const
      k=nthof(this),
      // $tcb=$(this).parent('.ttlcbs'),
      isCheck=$(this).hasClass('checked')
      txt=isCheck?'탈/부착':'위치교환'
    $(`${k} .idesc`).val(txt)
    $(`${k} ${cTTL}`).text(txt)
    isCheck?$(this).removeClass('checked'):$(this).addClass('checked')
  })

  // OTHER option
  .on('click','.others',function(){
    const k=nthof(this)
    flex(`${k} .step.detail, ${k} .desc, ${k} .per, ${k} .price, ${k} .count`)
    /** @todo add `${k}` to all focus??? and test */
    $(/*`${k} .idesc`*/'.idesc').focus()
  })

  // others title update with input
  .on('input','.idesc',function(){
    const
      k=nthof(this),
      val=this.value.trim()
    $(`${k} ${cTTL}`).text(
      val ? `기타 (${val})` : '기타'
    )
  })

  // calc .iprice (iper * icount)
  .on('input','.iper,.iminus,.icount',function(){
    if($(this).hasClass('calcoff'))return
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

  // labelize the smol "마이\n너스" for `.iminus`
  .on('click','.iminus-wrap span',function(){
    $(`${nthof(this)} .iminus`).focus()
  })

  // calc ttl (Σ .iprice)
  .on('input','.iprice',calcTTL)

  // delete btn
  .on('click','.del',function(){
    $(nthof(this)).slideUp(233,function(){
      rm(this)
      calcTTL()
    })
  })



// on finale
$('#finale')

  // checks
  .on('click','#checks-wrap>.acheck',function(){
    const isChecked=$(this).hasClass('checked')
    isChecked
      ? $(this).removeClass('checked')
      : $(this).addClass('checked')
    $(this).children('input').prop('checked',!isChecked)
  })

  // focus #ttl
  .on('click','#ttl-wrap',_=>
    $('#ttl').focus()
  )
  // focus #fnn
  .on('click','#finalnote',_=>
    $('#fnn').focus()
  )



// on plain
$('#plain')

  .on('click','#newplain',_=>{
    newPlain()
    $('textarea:last-of-type').focus()
  })
  .on('click','.del',function(){
    $(this).parent('i').slideUp(100,function(){rm(this)})
  })



/////// AJAX

$('#submit').click(_=>{
  TEST||flex('#backdrop')
  const
    /** Collect all option fields */
    opts = $('section').map(function(){
      const
        $opt = $(this),
        idesc = $opt.find('.idesc').val(),
        iminus = $opt.find('.iminus').val()
      if(idesc === '') return

      let
        desc=idesc,
        minus=iminus ? '-'+iminus : '',
        per=$opt.find('.iper').val() || minus,
        count=$opt.find('.icount').val() || '',
        price=$opt.find('.iprice').val() || ''

      // write `desc`
      if(idesc===options['newtire']){
        console.log('newTIRE included')
        const
          model = $opt.find('.imodel').val().trim(),
          size = $opt.find('.isize').val().trim()
        desc = size ? `${model}【${size}】` : model
      }
      if(idesc===options['newwheel']){
        console.log('newWHEEL included')
        const
          model = '[휠] '+$opt.find('.imodel').val().trim(),
          $ncb = $opt.find('.newcbs')
        let
          size = $opt.find('.isize').val().trim(),
          newcbs = ''
        if(is225.includes(size.trim())) size+=' 225'
        if(is195.includes(size.trim())) size+=' 195'
        $ncb.length && $ncb.each(function(){
          const v=$(this).find('.ncbval').val()
          newcbs += v ? (newcbs?' '+v:v) : ''
        })
        desc = size ? `${model}【${size}】${newcbs}` : model+newcbs
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

    /** Collect checkboxes and finalnote */
    cbs =(_=>{
      const
        fnn = $('#fnn').val().trim(),
        cks = $('#checks-wrap input[type="checkbox"]:checked').map(function(){
          return checks[$(this).val()]
        }).get()
      fnn&&cks.push(fnn)
      return cks
    })(),
    plain=(_=>{
      let re = []
      $('textarea[name="plain"]').each(function(){
        const v=$(this).val().trim()
        v&&re.push(v)
      })
      return re
    })(),

    /** Gather all data, prep for posting */
    coll = {
      dt: Math.floor(Date.now() / 1000),
      carid: $('#icarid').val(),
      /** @type {Array<{desc: string, count: number|"", price: number|"", note: string}>} */
      opts: opts.length ? opts : [{desc:'',per:'',count:'',price:'',note:''}],
      cbs,plain,
      ttl: $('#ttl').val() || '0',
    }

  TEST ? console.dir(coll) :
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