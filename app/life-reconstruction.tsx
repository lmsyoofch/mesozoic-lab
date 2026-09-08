'use client';
import {useState,useEffect} from 'react';
import {ArrowUpRight,ImageIcon} from 'lucide-react';
import {reconstructions} from './reconstructions';
export default function LifeReconstruction({id}:{id:string}){
 const art=reconstructions.find(r=>r.id===id)!;
 const [failed,setFailed]=useState(false);const [loaded,setLoaded]=useState(false);
 useEffect(()=>{setFailed(false);setLoaded(false)},[id]);
 return <figure className="life-reconstruction"><div className="life-image-stage"><span className="life-image-label"><ImageIcon size={14}/> LIFE RECONSTRUCTION</span>{!failed&&<img key={id} src={art.image} alt={`Artist’s life reconstruction of ${art.taxon} by ${art.artist}, showing a fleshed-out animal rather than a skeleton.`} onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)} referrerPolicy="no-referrer"/>}{!loaded&&!failed&&<p className="life-image-status" role="status">Loading reconstruction…</p>}{failed&&<div className="life-image-status" role="status"><p>The illustration could not load.</p><a href={art.source} target="_blank" rel="noreferrer">View the source illustration <ArrowUpRight size={14}/></a></div>}</div><figcaption><div className="life-caption-title"><h3>{art.taxon}</h3><a href={art.image} target="_blank" rel="noreferrer">Open full image <ArrowUpRight size={14}/></a></div><p className="life-disclaimer">An artist’s reconstruction, not a photograph of a living dinosaur. Fossils guide the anatomy; colours and many soft-tissue details remain uncertain.</p><p>{art.note}</p><div className="life-attribution"><span>Illustration: <strong>{art.artist}</strong></span><a href={art.source} target="_blank" rel="noreferrer">Wikimedia Commons source ↗</a><a href={art.licenceUrl} target="_blank" rel="noreferrer">{art.licence} ↗</a></div><p className="life-image-delivery">Image from Wikimedia Commons, included with this website without additional edits.</p></figcaption></figure>
}
