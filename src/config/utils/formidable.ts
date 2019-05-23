import * as formidable from 'formidable'

let form = new formidable.IncomingForm()
form.encoding = 'utf-8' //encoding 
form.multiples = true
form.keepExtensions = false // 확장자 제거

export default form