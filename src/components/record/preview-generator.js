import React, { Component } from 'react';

import File from 'material-ui/svg-icons/editor/insert-drive-file';

export default function PreviewGenerator(props)
{
  let {element, style} = props
  let elem = element


  if ( elem && elem.src ) {
    if ( elem.type.includes("image/") ) {
       return <img style={{...style}} src={elem.src} />
    } else if (elem.type.includes("audio/")){
       return <audio style={{...style}} controls src={elem.src}  />
    } else if (elem.type.includes("video/")){
       return <video style={{...style,width:"95%"}} controls src={elem.src}  />
    } else {
      return <span style={{...style, display:"block" , width:"100%", minHeight:35, textAlign:"left", textAlign:"center"}} >
          <File style={{height:35,width:35, position: "relative", bottom: -3, left: -10}}/>
          <span style={{height:35,paddingBottom:10,position: "relative", bottom: 5, left: 10}}><a href={elem.src} target={"_blank"} >Preview/Download</a></span>
        </span>
    }
  }

  return <span></span>
}

// URL_MULTIMEDIA +
