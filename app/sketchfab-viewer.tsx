'use client';
import {useEffect,useRef} from 'react';
type ViewerAPI={start:()=>void;addEventListener:(name:string,callback:()=>void)=>void};
type ViewerConstructor=new(frame:HTMLIFrameElement)=>{init:(id:string,options:Record<string,unknown>)=>void};
declare global{interface Window{Sketchfab?:ViewerConstructor}}
let sdk:Promise<void>|undefined;
function loadSDK(){
 if(window.Sketchfab)return Promise.resolve();
 if(!sdk)sdk=new Promise<void>((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';script.async=true;
  script.onload=()=>window.Sketchfab?resolve():reject(new Error('Viewer unavailable'));
  script.onerror=()=>{script.remove();reject(new Error('Viewer unavailable'))};document.head.appendChild(script);
 }).catch(error=>{sdk=undefined;throw error});
 return sdk;
}
export default function SketchfabViewer({modelId,title,onReady,onFailure}:{modelId:string;title:string;onReady:()=>void;onFailure:()=>void}){
 const frame=useRef<HTMLIFrameElement>(null);const callbacks=useRef({onReady,onFailure});callbacks.current={onReady,onFailure};
 useEffect(()=>{let active=true;let timer:ReturnType<typeof setTimeout>|undefined;
  const fail=()=>{if(active){clearTimeout(timer);callbacks.current.onFailure()}};
  timer=setTimeout(fail,60000);
  loadSDK().then(()=>{if(!active||!frame.current||!window.Sketchfab)return;
   const client=new window.Sketchfab(frame.current);
   client.init(modelId,{autostart:1,preload:1,transparent:1,ui_theme:'light',ui_infos:0,ui_controls:1,ui_hint:1,dnt:1,success:(api:ViewerAPI)=>{if(!active)return;api.addEventListener('viewerready',()=>{if(active){clearTimeout(timer);callbacks.current.onReady()}});api.start()},error:fail});
  }).catch(fail);
  return()=>{active=false;clearTimeout(timer)};
 },[modelId]);
 return <iframe ref={frame} title={title} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen/>;
}
