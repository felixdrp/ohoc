import React, { Component } from 'react';

export default function PreviewGenerator(props)
{
  let {element, style} = props
  let elem = element


  if ( elem && elem.src ) {
    if ( elem.type.includes("image/") ) {
       return <img style={style} src={elem.src} />
    } else if (elem.type.includes("audio/")){
       return <audio style={{...style, width:"95%"}} controls src={elem.src}  />
    } else if (elem.type.includes("video/")){
       return <video style={{...style,width:"95%"}} controls src={elem.src}  />
    } else {
      return <a style={{...style,width:"95%"}} href={elem.src} target={"_blank"} >{elem.title}</a>
    }
  }

  return <span></span>
}

// URL_MULTIMEDIA +
