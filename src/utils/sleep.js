export function sleep (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(()=>{
      resolve()
    }, time)
  })
}

