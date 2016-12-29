import React, { Component } from 'react';

export default function previewGenerator(elem,style)
{
      if ( elem.src )
        if( elem.type.includes("image/")){
           return <img style={style} src={URL_MULTIMEDIA + elem.src} />
        } else if (elem.type.includes("audio/")){
           return <audio style={{width:"95%"}} controls src={URL_MULTIMEDIA + elem.src}  />
        } else if (elem.type.includes("video/")){
           return <video style={{width:"95%"}} controls src={URL_MULTIMEDIA + elem.src}  />
        } else {
          return <a style={{width:"95%"}} href={URL_MULTIMEDIA + elem.src} target={"_blank"} >{elem.title}</a>
        }
        return <span></span>
}
