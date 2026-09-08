'use client';
import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import type {SystemId} from './trex-anatomy-data';
import {anatomySystems} from './trex-anatomy-data';
type V=[number,number,number];
type Props={system:SystemId;selected:string;onSelect:(id:string)=>void;opacity:number;isolated:boolean;reset:number;angle:'side'|'front'|'top'};
export default function AnatomyScene(props:Props){
 const host=useRef<HTMLDivElement>(null);const current=useRef(props);current.current=props;
 const update=useRef<()=>void>(()=>{});const view=useRef<()=>void>(()=>{});const [failed,setFailed]=useState(false);
 useEffect(()=>{update.current()},[props.system,props.selected,props.opacity,props.isolated]);
 useEffect(()=>{view.current()},[props.reset,props.angle]);
 useEffect(()=>{
 if(!host.current)return;
 const container=host.current;let renderer:THREE.WebGLRenderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false})}catch{setFailed(true);return}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.setClearColor('#ffffff');container.appendChild(renderer.domElement);
 renderer.domElement.setAttribute('aria-label','Rotatable schematic Tyrannosaurus anatomy. Select structures using the adjacent buttons.');
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(38,1,.1,100);const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=5;controls.maxDistance=24;controls.target.set(0,2,0);controls.enablePan=true;
 scene.add(new THREE.HemisphereLight(0xffffff,0x66736a,2.4));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(-4,9,7);scene.add(light);
 const meshes:THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>[]=[];
 const colours=Object.fromEntries(anatomySystems.map(s=>[s.id,s.colour]));
 function add(id:string,system:SystemId,g:THREE.BufferGeometry,pos:V=[0,0,0]){const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:colours[system],roughness:.72,transparent:true}));m.position.set(...pos);m.userData={id,system};scene.add(m);meshes.push(m);return m}
 function ell(id:string,sys:SystemId,pos:V,scale:V){const m=add(id,sys,new THREE.SphereGeometry(1,28,18),pos);m.scale.set(...scale);return m}
 function tube(id:string,sys:SystemId,points:V[],radius:number){return add(id,sys,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v))),Math.max(12,points.length*6),radius,10,false))}
 function bone(id:string,a:V,b:V,r=.075){tube(id,'skeleton',[a,b],r);ell(id,'skeleton',a,[r*1.4,r*1.4,r*1.4]);ell(id,'skeleton',b,[r*1.4,r*1.4,r*1.4])}
 // Original schematic teaching geometry. Coordinates are illustrative, not specimen measurements.
 const spine:V[]=[[-2.25,3.55,0],[-1.7,3.25,0],[-1.15,2.85,0],[0,2.9,0],[.9,2.9,0],[1.9,2.6,0],[3.2,2.25,0],[4.5,2.05,0]];
 tube('spine','skeleton',spine,.11);
 for(let i=0;i<28;i++){const t=i/27;const v=new THREE.CatmullRomCurve3(spine.map(p=>new THREE.Vector3(...p))).getPoint(t);ell('spine','skeleton',[v.x,v.y,v.z],[.10,.16*(1-t)+.045,.14*(1-t)+.04])}
 ell('skull','skeleton',[-2.55,3.55,0],[.72,.37,.34]);tube('skull','skeleton',[[-3.1,3.18,0],[-2.65,3.12,0],[-2.02,3.34,0]],.11);
 for(const z of [-.24,.24])for(let i=0;i<8;i++){const m=add('teeth','digestion',new THREE.ConeGeometry(.035,.14,8),[-3.1+i*.115,3.21,z]);m.rotation.z=Math.PI}
 for(let i=0;i<8;i++){const x=-1.15+i*.23;for(const sign of [-1,1])tube('ribs','skeleton',[[x,2.9,0],[x-.08,2.6,sign*.55],[x+.04,1.9,sign*.48],[x+.18,1.67,sign*.12]],.036)}
 ell('pelvis','skeleton',[.8,2.75,0],[.48,.19,.55]);for(const z of [-.42,.42]){bone('pelvis',[.75,2.75,z],[.25,1.8,z],.075);bone('pelvis',[.75,2.75,z],[1.3,1.95,z],.065)}
 for(const sign of [-1,1]){const z=sign*.55;bone('hindlimbs',[.8,2.7,z],[.2,1.65,z],.115);bone('hindlimbs',[.2,1.65,z],[.85,.65,z],.09);bone('hindlimbs',[.85,.65,z],[.6,.2,z],.07);for(let i=-1;i<=1;i++)bone('hindlimbs',[.6,.2,z],[.0,.12,z+i*.19],.05);bone('forelimbs',[-1.1,2.65,sign*.47],[-1.25,2.18,sign*.7],.045);bone('forelimbs',[-1.25,2.18,sign*.7],[-1.55,2.2,sign*.72],.035);for(let i=0;i<2;i++)bone('forelimbs',[-1.55,2.2,sign*.72],[-1.7,2.05,sign*(.65+i*.14)],.022);
 ell('jaw-muscles','muscles',[-2.12,3.43,sign*.29],[.22,.38,.18]);ell('hip-muscles','muscles',[.63,2.18,z],[.42,.7,.33]).rotation.z=-.4;
 ell('tail-muscle','muscles',[1.65,2.54,sign*.20],[1.0,.25,.22]).rotation.z=-.2;
 ell('lungs','respiration',[-.35,2.63,sign*.23],[.58,.22,.20]);ell('air-sacs','respiration',[.4,2.2,sign*.27],[.45,.38,.27]);ell('air-sacs','respiration',[-1,2.35,sign*.21],[.25,.30,.2]);
 ell('eyes','senses',[-2.2,3.7,sign*.34],[.12,.12,.09]);}
 tube('trachea','respiration',[[-2.3,3.18,0],[-1.6,2.9,0],[-1.2,2.4,0],[-.55,2.58,0]],.065);
 tube('oesophagus','digestion',[[-2.6,3.12,-.1],[-1.55,2.72,-.1],[-1.05,2.05,-.1],[-.65,1.94,-.1]],.08);
 ell('stomach','digestion',[-.5,2.03,0],[.38,.30,.30]);tube('stomach','digestion',[[-.2,2,0],[.15,1.88,.22],[.4,1.88,0],[.15,1.88,-.22],[.5,1.92,-.23],[.7,2.1,0]],.09);
 ell('brain','senses',[-2.04,3.57,0],[.20,.13,.13]);
 ell('covering','surface',[-.1,2.4,0],[1.4,.76,.69]);tube('covering','surface',[[-1.1,2.55,0],[-1.5,2.98,0],[-2.05,3.4,0]],.44);ell('covering','surface',[-2.55,3.48,0],[.82,.49,.42]);
 tube('covering','surface',[[.8,2.6,0],[1.6,2.53,0],[2.6,2.25,0]],.28);tube('covering','surface',[[2.5,2.26,0],[3.4,2.12,0],[4.5,2.05,0]],.11);
 for(const z of [-.55,.55]){ell('covering','surface',[.58,2.15,z],[.5,.8,.39]).rotation.z=-.4;tube('covering','surface',[[.2,1.6,z],[.85,.65,z],[.6,.2,z]],.17)}
 const grid=new THREE.GridHelper(12,24,0xd9e3dc,0xedf1ee);grid.position.y=.03;scene.add(grid);
 update.current=()=>{const p=current.current;for(const m of meshes){const active=m.userData.system===p.system;const skin=m.userData.system==='surface';m.visible=active||(!p.isolated&&(skin?p.opacity>0:m.userData.system==='skeleton'));m.material.opacity=active?(skin?.50:1):(skin?p.opacity/100:.18);m.material.depthWrite=active&&!skin;m.material.emissive.set(m.userData.id===p.selected?0x76632a:0x000000);m.material.emissiveIntensity=.45;}};
 view.current=()=>{const angle=current.current.angle;camera.position.set(...(angle==='front'?[-12,3,0]:angle==='top'?[0,15,.01]:[0,4.1,12]) as V);controls.target.set(0,2,0);controls.update()};view.current();update.current();
 const resize=new ResizeObserver(()=>{const w=container.clientWidth,h=container.clientHeight;if(w&&h){renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}});resize.observe(container);
 const ray=new THREE.Raycaster();let down=[0,0];const pointerDown=(e:PointerEvent)=>{down=[e.clientX,e.clientY]};const pointerUp=(e:PointerEvent)=>{if(Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const r=renderer.domElement.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=ray.intersectObjects(meshes.filter(m=>m.visible&&m.userData.system===current.current.system))[0];if(hit)current.current.onSelect(hit.object.userData.id)};
 renderer.domElement.addEventListener('pointerdown',pointerDown);renderer.domElement.addEventListener('pointerup',pointerUp);
 const lost=(e:Event)=>{e.preventDefault();setFailed(true)};renderer.domElement.addEventListener('webglcontextlost',lost);
 let raf=0;function render(){raf=requestAnimationFrame(render);controls.update();renderer.render(scene,camera)}render();
 return()=>{cancelAnimationFrame(raf);resize.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',pointerDown);renderer.domElement.removeEventListener('pointerup',pointerUp);renderer.domElement.removeEventListener('webglcontextlost',lost);meshes.forEach(m=>{m.geometry.dispose();m.material.dispose()});grid.geometry.dispose();(grid.material as THREE.Material).dispose();renderer.dispose();renderer.domElement.remove();update.current=()=>{};view.current=()=>{}};
 },[]);
 return <div className="anatomy-canvas" ref={host}>{failed&&<div className="anatomy-webgl-error" role="status">3D is unavailable in this browser. All structures and evidence remain available using the lists beside this panel.</div>}</div>
}
