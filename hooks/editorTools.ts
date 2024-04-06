import Header from "@editorjs/header";
// @ts-ignore:
import Image from '@editorjs/image'
// @ts-ignore:
import Quote from '@editorjs/quote'
import { uploadImage } from "./uploadImage";
// @ts-ignore:
import Embed from '@editorjs/embed'
// @ts-ignore:
import FontSize from 'editorjs-inline-font-size-tool';
// @ts-ignore:
import List from '@editorjs/list'

const uploadImageByURL = (e: any) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e)
    } catch (error) {
      reject(error)
    }
  })

  return link.then(url => {
    return{
      success: true,
      file: {url}
    }
  })
}

const uploadImageByFile = async(e:File) => {
  const data = await uploadImage(e);
  if (data?.secure_url) {
    return {
      success: 1,
      file: { url: data.secure_url }
    }
  }
}
 
export var tools = {
  fontSize: FontSize,
  embed: { class: Embed, inlineToolbar: true },
  image: {class: Image, inlineToolbar: true, config: {
    uploader: {
      uploadByUrl: uploadImageByURL,
      uploadByFile: uploadImageByFile,
    }
  }},
  header: { class: Header, config: {
    placeholder: 'Type and header here...',
    levels: [2, 3],
    defaultLevel: 3
  }, inlineToolbar: true},
  quote: { class: Quote, inlineToolbar: true },
  list: { class: List, inlineToolbar: true }
}

