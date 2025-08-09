const

flex=_=>$(_).css({display:"flex"}),
hide=_=>$(_).css({display:"none"}),

optof=_=>$(_).closest('section'),
/** @returns {string} this `<section>` */
nthof=(_this,getclass=true)=>
  (`${getclass?'.':''}` + optof(_this).attr('class')).slice(getclass?0:1)


___=0

class Brand{
  constructor(brandName,modelsArray){
    this.name=brandName
    this.models=modelsArray
  }
}
