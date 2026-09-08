'use client';
import {useState,useEffect} from 'react';
import {ArrowUpRight,ImageIcon} from 'lucide-react';
import SketchfabViewer from './sketchfab-viewer';
import lifeModels from './life-models.json';
import {reconstructions} from './reconstructions';
function Illustration({id}:{id:string}){
 const art=reconstructions.find(r=>r.id===id)!;
 const [failed,setFailed]=useState(false);const [loaded,setLoaded]=useState(false);
 useEffect(()=>{setFailed(false);setLoaded(false)},[id]);
 return <figure className="life-reconstruction"><div className="life-image-stage"><span className="life-image-label"><ImageIcon size={14}/> LIFE RECONSTRUCTION</span>{!failed&&<img key={id} src={art.image} alt={`Artist’s life reconstruction of ${art.taxon} by ${art.artist}, showing a fleshed-out animal rather than a skeleton.`} onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)} referrerPolicy="no-referrer"/>}{!loaded&&!failed&&<p className="life-image-status" role="status">Loading reconstruction…</p>}{failed&&<div className="life-image-status" role="status"><p>The illustration could not load.</p><a href={art.source} target="_blank" rel="noreferrer">View the source illustration <ArrowUpRight size={14}/></a></div>}</div><figcaption><div className="life-caption-title"><h3>{art.taxon}</h3><a href={art.image} target="_blank" rel="noreferrer">Open full image <ArrowUpRight size={14}/></a></div><p className="life-disclaimer">An artist’s reconstruction, not a photograph of a living dinosaur. Fossils guide the anatomy; colours and many soft-tissue details remain uncertain.</p><p>{art.note}</p><div className="life-attribution"><span>Illustration: <strong>{art.artist}</strong></span><a href={art.source} target="_blank" rel="noreferrer">Wikimedia Commons source ↗</a><a href={art.licenceUrl} target="_blank" rel="noreferrer">{art.licence} ↗</a></div><p className="life-image-delivery">Image from Wikimedia Commons, included with this website without additional edits.</p></figcaption></figure>
}

export default function LifeReconstruction({id}:{id:string}){
 const model=lifeModels.find(m=>m.id===id);
 const [mode,setMode]=useState<'model'|'illustration'>('model');
 const [status,setStatus]=useState<'loading'|'ready'|'failed'>('loading');
 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{setMode('model');setStatus('loading');setAttempt(0)},[id]);
 function chooseModel(){setStatus('loading');setAttempt(n=>n+1);setMode('model')}
 if(!model)return <Illustration id={id}/>;
 return <section className="life-experience" aria-label="Living appearance">
 <div className="life-mode-bar"><div className="life-mode-buttons" role="group" aria-label="Reconstruction format"><button type="button" aria-pressed={mode==='model'} onClick={chooseModel}>3D reconstruction</button><button type="button" aria-pressed={mode==='illustration'} onClick={()=>setMode('illustration')}>Illustration</button></div><span>Drag to rotate · Scroll or pinch to zoom</span></div>
 {mode==='illustration'?<Illustration id={id}/>:<figure className="life-reconstruction">
 <div className="life-model-stage" aria-label={`${model.title} interactive 3D model`}>
 {status!=='failed'&&<SketchfabViewer key={`${id}-${attempt}`} modelId={model.modelId} title={`3D life reconstruction: ${model.title}`} onReady={()=>setStatus('ready')} onFailure={()=>setStatus('failed')}/>}
 {status!=='ready'&&<div className="life-model-status" role="status"><strong>{status==='failed'?'The 3D model could not load.':'Loading the 3D reconstruction…'}</strong><p>{status==='failed'?'Try again or explore the included illustration.':'Detailed models may take a moment. You can view the illustration while waiting.'}</p><div>{status==='failed'&&<button type="button" onClick={chooseModel}>Retry 3D</button>}<button type="button" onClick={()=>setMode('illustration')}>View illustration</button><a href={model.url} target="_blank" rel="noreferrer">Open original 3D ↗</a></div></div>}
 </div><figcaption><div className="life-caption-title"><h3>{reconstructions.find(r=>r.id===id)?.taxon}</h3><a href={model.url} target="_blank" rel="noreferrer">Original 3D model <ArrowUpRight size={14}/></a></div><p className="life-disclaimer">A reconstructed living appearance. Fossils inform the anatomy; colours and many soft-tissue details are uncertain. This surface model does not contain organ layers.</p><p>{model.note}</p><div className="life-attribution"><span>3D model: <strong>{model.creator}</strong></span><a href={model.url} target="_blank" rel="noreferrer">Source and creator credits ↗</a></div>{model.additionalCredit&&<p>{model.additionalCredit}</p>}<p className="life-image-delivery">Displayed through the creator’s Sketchfab viewer. Internet access and WebGL required. Model files are not included in this download.</p></figcaption>
 </figure>}
 </section>
}
