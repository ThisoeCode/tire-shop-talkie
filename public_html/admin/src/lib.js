const

flex=_=>$(_).css({display:"flex"}),
hide=_=>$(_).css({display:"none"}),
rm=_=>$(_).remove(),

optof=_=>$(_).closest('section'),
/** @returns {string} this `<section>` */
nthof=(_this,getclass=true)=>{
  const _ = `${getclass?'.':''}` + optof(_this).attr('class')
  if(_===undefined)throw new Error("[THISOE ERROR] lib: `nthof()` returns undefined! \nThe class might be not exist or had been removed.")
  return _
}


___=0

class Brand{
  constructor(brandName,modelsArray){
    this.name=brandName
    this.models=modelsArray
  }
}
