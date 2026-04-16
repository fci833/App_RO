import { useState, useEffect, useRef } from "react";

// ── TEMA ──────────────────────────────────────────────────────────────────────
const LIGHT={cream:"#FDF8F2",sand:"#F0E8DA",blush:"#F2C4B2",deep:"#2C3E35",warm:"#5C4A3A",white:"#FFFFFF",muted:"#8C7B6E",green:"#A8C5A0",clay:"#C4876A",dg:"#0D1F18",mg:"#1A3D28",bg:"#FDF8F2",card:"#FFFFFF",border:"#EDE5D8",nav:"#FFFFFF",input:"#F0E8DA"};
const DARK={cream:"#1A1A1A",sand:"#242424",blush:"#5C3A2A",deep:"#F0E8DA",warm:"#C8B8A8",white:"#F0E8DA",muted:"#8C8C8C",green:"#A8C5A0",clay:"#C4876A",dg:"#0D1F18",mg:"#1A3D28",bg:"#121212",card:"#1E1E1E",border:"#2A2A2A",nav:"#1A1A1A",input:"#2A2A2A"};
const TAGS={Læge:{bg:"#F2C4B2",tx:"#8B3A2A"},Økonomi:{bg:"#C8D8C8",tx:"#2C5C2C"},Sjov:{bg:"#F5E4C0",tx:"#7A5C1A"},Helbred:{bg:"#D4C8E8",tx:"#3A2A6A"},Udvikling:{bg:"#C8D8F0",tx:"#1A3A6A"},Sikkerhed:{bg:"#F0D8C8",tx:"#6A2A1A"}};
const EMOJIS=["🤰","👶","👧","👦","🧒","🌟","🌈","🦋","🌸","🐣","🐥","🦁","🐻","🐼","🐨","💫","🌻","🦊","🐸","🎈"];
const KCOLS=[{c:"#C4876A",l:"#FDF0E8",d:"#2C3E35"},{c:"#7A9E9F",l:"#EEF5F5",d:"#1C3A3B"},{c:"#9B7EC8",l:"#F3EFFE",d:"#2A1A4A"},{c:"#6B9E6B",l:"#EEF6EE",d:"#1A3A1A"},{c:"#E8865A",l:"#FFF0E8",d:"#3A1A0A"},{c:"#5A86C8",l:"#EEF3FF",d:"#0A1A3A"}];
const NAV=[{id:"home",label:"Hjem",icon:"🏡"},{id:"ai",label:"Ro AI",icon:"✨"},{id:"okonomi",label:"Økonomi",icon:"💰"},{id:"profil",label:"Profil",icon:"👤"}];

const KIDS0=[
  {id:1,name:"Baby #3",emoji:"🤰",phase:"gravid",phaseLabel:"Uge 16 · Gravid",color:"#C4876A",colorLight:"#FDF0E8",colorDark:"#2C3E35",heroTagline:"Køn kan måske ses ved næste scanning",babyDesc:"🥑 Ca. 11 cm · avocado · Fingrene kan nu bøje sig",urgentMsg:"18-ugers scanning er ikke booket endnu",
    tasks:[{id:1,text:"Book 18-ugers scanning",done:false,tag:"Læge"},{id:2,text:"Snak om barselsorlov",done:true,tag:"Økonomi"},{id:3,text:"Start navnelisten",done:false,tag:"Sjov"},{id:4,text:"Tjek forsikringer",done:false,tag:"Økonomi"}],
    vaccines:[{name:"Kighoste (Tdap)",due:"Uge 28–32",done:false},{name:"Influenza",due:"Okt 2024",done:true}],
    appts:[{title:"18-ugers scanning",loc:"Rigshospitalet",urgent:true,date:"Ikke booket"},{title:"Jordemoderbesøg",loc:"Din jordemoder",urgent:false,date:"15. maj"}],
    insights:["Baby kan nu høre din stemme og genkender den.","Uge 16–20 er typisk den bedste periode i graviditeten."]},
  {id:2,name:"Ella",emoji:"👧",phase:"spaedbarn",phaseLabel:"8 måneder",color:"#7A9E9F",colorLight:"#EEF5F5",colorDark:"#1C3A3B",heroTagline:"Ella er klar til at opdage verden",babyDesc:"🧸 Ca. 70 cm · 8,5 kg · Begynder at kravle!",urgentMsg:"9-månederskontrol mangler booking",
    tasks:[{id:1,text:"Book 9-månederskontrol",done:false,tag:"Læge"},{id:2,text:"Introducér finger-mad",done:true,tag:"Helbred"},{id:3,text:"Øv 'vinke hej'",done:false,tag:"Udvikling"},{id:4,text:"Tjek sovemiljø",done:false,tag:"Sikkerhed"}],
    vaccines:[{name:"5-i-1 vaccine",due:"5 mdr",done:true},{name:"MFR",due:"15 måneder",done:false}],
    appts:[{title:"9-månederskontrol",loc:"Din læge",urgent:true,date:"Ikke booket"},{title:"Sundhedsplejerske",loc:"Hjemmebesøg",urgent:false,date:"22. apr"}],
    insights:["Ella er i den optimale alder til at lære separation-angst at kende.","Kravling styrker muskler og koordination markant."]},
  {id:3,name:"Noah",emoji:"👦",phase:"smaabarn",phaseLabel:"3 år",color:"#9B7EC8",colorLight:"#F3EFFE",colorDark:"#2A1A4A",heroTagline:"Noah er i den nysgerrige alder",babyDesc:"🚴 Ca. 96 cm · 14 kg · Elsker rollelege",urgentMsg:null,
    tasks:[{id:1,text:"Øv at klæde sig på selv",done:true,tag:"Udvikling"},{id:2,text:"Lav legeaftale",done:false,tag:"Sjov"},{id:3,text:"Læs bog hver aften",done:false,tag:"Udvikling"},{id:4,text:"Tandlæge – 6+ mdr siden",done:false,tag:"Læge"}],
    vaccines:[{name:"MFR 1. dosis",due:"Jun 2023",done:true},{name:"MFR 2. dosis",due:"4 år",done:false}],
    appts:[{title:"Tandlæge",loc:"Tandklinikken",urgent:true,date:"Ikke booket"},{title:"4-årsundersøgelse",loc:"Din læge",urgent:false,date:"Mar 2026"}],
    insights:["3-årige søskende kan opleve jalousi — anerkend følelsen, sæt ikke ord på.","Rolleleg er Noahs vigtigste læringsværktøj lige nu."]},
];

// Fælles familie samtaleemner (dækker alle børn — ikke per barn)
const PAR_EMNER=[
  {cat:"Hverdagen",items:["Hvem er mest udkørt lige nu — og hvad har vi brug for?","Savner vi tid for os selv som par?","Hvad er det sødeste et af børnene har gjort for nylig?","Oplever vi søskendejalousi — og håndterer vi det ens?"]},
  {cat:"Fordeling",items:["Føler vi begge at opgaverne er fordelt retfærdigt?","Hvem tager sig af hvad — og er vi tilfredse?","Hvad ville hjælpe os mest den næste uge?"]},
  {cat:"Parforholdet",items:["Hvornår havde vi sidst en rigtig samtale — uden børn?","Hvad sætter vi mest pris på hos hinanden som forældre?","Hvad vil vi gøre anderledes end vores egne forældre?"]},
  {cat:"Fremtiden",items:["Har vi snakket om opdragelsesværdier?","Planlægger vi en fælles familieoplevelse snart?","Hvad glæder vi os mest til de næste 6 måneder?"]},
];

// Styles hjælpefunktioner
const s=(base,extra={})=>({...base,...extra});
const row=(extra={})=>s({display:"flex",flexDirection:"row",alignItems:"center"},extra);
const col=(extra={})=>s({display:"flex",flexDirection:"column"},extra);
const center=(extra={})=>s({display:"flex",alignItems:"center",justifyContent:"center"},extra);

// ── SPLASH ────────────────────────────────────────────────────────────────────
function Splash({onStart}) {
  return(
    <div style={col({minHeight:"100vh",background:"#0D1F18",alignItems:"center",justifyContent:"center",padding:"40px 28px",position:"relative",overflow:"hidden"})}>
      <div style={{position:"absolute",top:-80,right:-80,width:280,height:280,borderRadius:"50%",background:"rgba(168,197,160,0.05)"}}/>
      <div style={{position:"absolute",bottom:-60,left:-60,width:200,height:200,borderRadius:"50%",background:"rgba(168,197,160,0.04)"}}/>
      <div style={row({gap:12,marginBottom:32})}>
        <div style={center({width:56,height:56,borderRadius:"50%",background:"rgba(168,197,160,0.12)",border:"2px solid #A8C5A0"})}>
          <div style={{width:22,height:22,borderRadius:"50%",background:"#A8C5A0"}}/>
        </div>
        <span style={{color:"#A8C5A0",fontSize:38,fontFamily:"'Playfair Display',serif",fontWeight:700}}>Ro</span>
      </div>
      <h1 style={{color:"#fff",fontSize:38,fontFamily:"'Playfair Display',serif",fontWeight:700,textAlign:"center",margin:"0 0 8px",lineHeight:1.15}}>Ro til at</h1>
      <h1 style={{color:"#A8C5A0",fontSize:38,fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontWeight:700,textAlign:"center",margin:"0 0 22px",lineHeight:1.15}}>være forældre.</h1>
      <p style={{color:"rgba(255,255,255,0.45)",fontSize:15,fontFamily:"'DM Sans',sans-serif",textAlign:"center",margin:"0 0 52px",lineHeight:1.65,maxWidth:300}}>Den personlige forældreskabsassistent der kender dit barn — ikke bare din baby.</p>
      <button onClick={onStart} style={{width:"100%",maxWidth:360,background:"#A8C5A0",color:"#0D1F18",border:"none",borderRadius:14,padding:"16px",fontSize:16,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer",marginBottom:10}}>Kom i gang — det er gratis →</button>
      <p style={{color:"rgba(255,255,255,0.25)",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>30 dage gratis · Derefter 79 kr/md · Opsig når som helst</p>
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({onDone}) {
  const [step,setStep]=useState("who");
  const [name,setName]=useState("");
  const [fam,setFam]=useState("");
  const [nyidk,setNyidk]=useState(false);

  const Logo=()=>(
    <div style={row({gap:7})}>
      <div style={center({width:22,height:22,borderRadius:"50%",border:"2px solid #A8C5A0"})}><div style={{width:8,height:8,borderRadius:"50%",background:"#A8C5A0"}}/></div>
      <span style={{color:"#A8C5A0",fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:700}}>Ro</span>
    </div>
  );
  const Bar=({n})=>(
    <div style={row({gap:5,marginBottom:22})}>
      {[0,1,2].map(i=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<n?"#A8C5A0":i===n?"rgba(168,197,160,0.5)":"rgba(255,255,255,0.12)"}}/>)}
    </div>
  );

  if(step==="who") return(
    <div style={col({minHeight:"100vh",background:"#0D1F18",padding:"52px 24px 40px"})}>
      <div style={{marginBottom:32}}><Logo/></div>
      <Bar n={0}/>
      <h2 style={{color:"#fff",fontSize:26,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 4px",lineHeight:1.2}}>Hvem er du?</h2>
      <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:"0 0 24px"}}>Ro taler direkte til dig — ikke til "kære bruger".</p>

      {/* Navn-felt med grønt glow når udfyldt */}
      <p style={{color:"rgba(255,255,255,0.45)",fontSize:11,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 8px"}}>DIT FORNAVN</p>
      <div style={{position:"relative",marginBottom:22}}>
        <input type="text" placeholder="fx. Sara, Mads, Laila..." value={name} onChange={e=>setName(e.target.value)}
          style={{width:"100%",background:"rgba(255,255,255,0.07)",border:`1.5px solid ${name?"#A8C5A0":"rgba(255,255,255,0.1)"}`,borderRadius:14,padding:"14px 16px",color:"#fff",fontSize:16,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",boxShadow:name?"0 0 0 3px rgba(168,197,160,0.1)":"none",transition:"all 0.2s"}}/>
        {name&&<div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",width:20,height:20,borderRadius:"50%",background:"#A8C5A0",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{color:"#0D1F18",fontSize:11,fontWeight:700}}>✓</span>
        </div>}
      </div>

      {/* Situation */}
      <p style={{color:"rgba(255,255,255,0.45)",fontSize:11,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 10px"}}>DIN SITUATION</p>
      <div style={col({gap:8,marginBottom:fam?14:0})}>
        {[{id:"to",emoji:"👨‍👩‍👧",l:"Vi er to forældre",s:"Bor sammen · deler opgaverne"},{id:"delt",emoji:"🏠",l:"Delt forældremyndighed",s:"Barnet bor skiftevis hos os begge"},{id:"alene",emoji:"🧡",l:"Jeg er alene om det",s:"Jeg klarer det selv — og er stolt af det"},{id:"blended",emoji:"👨‍👩‍👧‍👦",l:"Sammenbragt familie",s:"Vi har børn fra tidligere forhold"}].map(o=>(
          <button key={o.id} onClick={()=>setFam(o.id)}
            style={{background:fam===o.id?"rgba(168,197,160,0.1)":"rgba(255,255,255,0.05)",border:`1.5px solid ${fam===o.id?"#A8C5A0":"rgba(255,255,255,0.08)"}`,borderRadius:14,padding:"13px 15px",display:"flex",alignItems:"center",gap:13,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
            <span style={{fontSize:24,flexShrink:0}}>{o.emoji}</span>
            <div style={{flex:1}}><p style={{color:"#fff",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{o.l}</p><p style={{color:"rgba(255,255,255,0.38)",fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{o.s}</p></div>
            <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${fam===o.id?"#A8C5A0":"rgba(255,255,255,0.15)"}`,background:fam===o.id?"#A8C5A0":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
              {fam===o.id&&<span style={{color:"#0D1F18",fontSize:10,fontWeight:700}}>✓</span>}
            </div>
          </button>
        ))}
      </div>

      {/* Ny i DK — vises kun når situation er valgt */}
      {fam&&<button onClick={()=>setNyidk(v=>!v)}
        style={{background:nyidk?"rgba(168,197,160,0.1)":"rgba(255,255,255,0.04)",border:`1.5px solid ${nyidk?"#A8C5A0":"rgba(255,255,255,0.07)"}`,borderRadius:13,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",marginBottom:16,width:"100%",boxSizing:"border-box"}}>
        <div style={row({gap:10})}><span style={{fontSize:18}}>🌍</span><div style={{textAlign:"left"}}><p style={{color:"#fff",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{fam==="alene"?"Er du ny i Danmark?":"Én eller begge er ny i Danmark?"}</p><p style={{color:"rgba(255,255,255,0.38)",fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>Vi viser særlige rettigheder og regler</p></div></div>
        <div style={{width:42,height:24,borderRadius:12,background:nyidk?"#A8C5A0":"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",padding:"0 3px",justifyContent:nyidk?"flex-end":"flex-start",flexShrink:0,transition:"all 0.2s"}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
        </div>
      </button>}

      <div style={{flex:1}}/>
      <button onClick={()=>{if(name&&fam)setStep("phase");}}
        style={{background:name&&fam?"#A8C5A0":"rgba(255,255,255,0.08)",color:name&&fam?"#0D1F18":"rgba(255,255,255,0.25)",border:"none",borderRadius:14,padding:"15px",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:name&&fam?"pointer":"default",width:"100%",transition:"all 0.2s"}}>
        {name&&fam?`Videre, ${name} →`:"Udfyld dit navn og vælg situation"}
      </button>
    </div>
  );

  if(step==="phase") return(
    <div style={col({minHeight:"100vh",background:"#0D1F18",padding:"52px 24px 40px"})}>
      <div style={row({marginBottom:28,gap:8})}>
        <button onClick={()=>setStep("who")} style={{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:8,padding:"6px 11px",color:"rgba(255,255,255,0.5)",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>←</button>
        <Logo/>
      </div>
      <Bar n={1}/>
      <h2 style={{color:"#fff",fontSize:26,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 4px",lineHeight:1.2}}>Hvor er {fam==="alene"?"du":"I"} i rejsen?</h2>
      <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:"0 0 22px"}}>Ro tilpasser alt til {fam==="alene"?"din":"jeres"} fase.</p>
      <div style={col({gap:9,flex:1})}>
        {[{id:"gravid",emoji:"🤰",l:fam==="alene"?"Jeg venter barn":"Vi venter barn",s:"Graviditet · uge 1–40"},{id:"spaedbarn",emoji:"👶",l:"Nyfødt",s:"0–12 måneder"},{id:"lille",emoji:"🧒",l:"Lille barn",s:"1–4 år"},{id:"flere",emoji:"👨‍👩‍👧‍👦",l:fam==="alene"?"Jeg har flere børn":"Vi har flere børn",s:"Blandet fase"}].map(o=>(
          <button key={o.id} onClick={()=>setStep("trust")}
            style={{background:"rgba(255,255,255,0.06)",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"15px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
            <div style={center({width:44,height:44,borderRadius:12,background:"rgba(255,255,255,0.08)",fontSize:22,flexShrink:0})}>{o.emoji}</div>
            <div style={{flex:1}}><p style={{color:"#fff",fontSize:14,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{o.l}</p><p style={{color:"rgba(255,255,255,0.38)",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0}}>{o.s}</p></div>
            <span style={{color:"rgba(255,255,255,0.25)",fontSize:20}}>›</span>
          </button>
        ))}
      </div>
    </div>
  );

  if(step==="trust") return(
    <div style={col({minHeight:"100vh",background:"#0D1F18",padding:"52px 24px 40px"})}>
      <div style={row({gap:8,marginBottom:40})}>
        <div style={center({width:28,height:28,borderRadius:"50%",border:"2px solid #A8C5A0"})}><div style={{width:10,height:10,borderRadius:"50%",background:"#A8C5A0"}}/></div>
        <span style={{color:"#A8C5A0",fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700}}>Ro</span>
      </div>
      <h1 style={{color:"#fff",fontSize:28,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 8px",lineHeight:1.2}}>Ro lover dig tre ting.</h1>
      <p style={{color:"rgba(255,255,255,0.45)",fontSize:14,fontFamily:"'DM Sans',sans-serif",margin:"0 0 28px"}}>Ikke juridisk snak. Bare tre løfter vi holder.</p>
      <div style={col({gap:12,flex:1})}>
        {[{icon:"🔒",color:"#A8C5A0",title:"Dine data er dine",desc:"Bruges kun til at hjælpe dig. Vi sælger det ikke og bruger det ikke til reklame."},{icon:"🚫",color:"#E8A87C",title:"Vi sælger aldrig data om dine børn",desc:"Hverken nu eller i fremtiden. Dine børn er ikke et produkt."},{icon:"✋",color:"#C4876A",title:"Du har fuld kontrol — altid",desc:"Se, eksportér eller slet alt med ét tryk. Ingen ventetid."}].map((p,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.06)",borderRadius:16,padding:"16px",display:"flex",alignItems:"flex-start",gap:14,border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={center({width:44,height:44,borderRadius:12,background:`${p.color}20`,border:`1.5px solid ${p.color}44`,fontSize:20,flexShrink:0})}>{p.icon}</div>
            <div style={{flex:1}}><p style={{color:"#fff",fontSize:14,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 4px"}}>{p.title}</p><p style={{color:"rgba(255,255,255,0.5)",fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.55}}>{p.desc}</p></div>
          </div>
        ))}
      </div>
      <div style={{paddingTop:28}}>
        <button onClick={()=>onDone({name,fam,nyidk})} style={{width:"100%",background:"#A8C5A0",color:"#0D1F18",border:"none",borderRadius:14,padding:"16px",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer",marginBottom:14}}>Jeg forstår — lad os komme i gang →</button>
        <p style={{color:"rgba(255,255,255,0.25)",fontSize:12,fontFamily:"'DM Sans',sans-serif",textAlign:"center",margin:0}}>Ved at fortsætte accepterer du vores <span style={{color:"rgba(255,255,255,0.5)",textDecoration:"underline",cursor:"pointer"}}>privatlivspolitik</span></p>
      </div>
    </div>
  );
  return null;
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({kid,kids,tasks,setTasks,onSelectKid,userName,setTab,T}) {
  const done=tasks.filter(t=>t.done).length;
  const pct=tasks.length?Math.round((done/tasks.length)*100):0;
  const urgentAll=kids.flatMap(k=>k.urgentMsg?[{kid:k,msg:k.urgentMsg}]:[]);

  return(
    <div style={{height:"calc(100vh - 130px)",overflowY:"auto",paddingBottom:24}}>
      {/* Hero — aktivt barn */}
      <div style={{background:`linear-gradient(150deg,${kid.colorDark} 0%,${kid.color} 100%)`,padding:"20px 20px 18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        {userName&&<p style={{color:"rgba(255,255,255,0.5)",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>Hej {userName} 👋</p>}
        <div style={row({alignItems:"flex-start",justifyContent:"space-between",marginBottom:14})}>
          <div>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:10,fontWeight:700,letterSpacing:2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{kid.phaseLabel.toUpperCase()}</p>
            <h1 style={{color:"#fff",fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 3px"}}>{kid.emoji} {kid.name}</h1>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0}}>{kid.babyDesc}</p>
          </div>
          {/* Cirkulær progress */}
          <div style={center({width:52,height:52,flexShrink:0})}>
            <svg width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3"/>
              <circle cx="26" cy="26" r="20" fill="none" stroke="#fff" strokeWidth="3"
                strokeDasharray={`${2*Math.PI*20}`} strokeDashoffset={`${2*Math.PI*20*(1-pct/100)}`}
                strokeLinecap="round" transform="rotate(-90 26 26)"/>
            </svg>
            <div style={{position:"absolute"}}><span style={{color:"#fff",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{pct}%</span></div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:11,padding:"10px 13px"}}>
          <p style={{color:"rgba(255,255,255,0.55)",fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>Ugens opgaver</p>
          <p style={{color:"#fff",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:0}}>{done===tasks.length&&tasks.length>0?"🎉 Alle opgaver klaret!":done+" af "+tasks.length+" færdige"}</p>
        </div>
      </div>

      {/* Børne-switcher — horisontal scroll, kompakt */}
      <div style={{background:T.card,borderBottom:`1px solid ${T.border}`,padding:"10px 16px"}}>
        <div style={row({gap:8,overflowX:"auto"})}>
          {kids.map(k=>{
            const kd=k.tasks.filter(t=>t.done).length,kp=k.tasks.length?Math.round((kd/k.tasks.length)*100):0;
            const active=k.id===kid.id;
            return(
              <button key={k.id} onClick={()=>onSelectKid(k.id)}
                style={{display:"flex",alignItems:"center",gap:7,padding:"7px 11px 7px 8px",borderRadius:50,border:`2px solid ${active?k.color:T.border}`,background:active?k.colorLight:T.bg,cursor:"pointer",flexShrink:0,transition:"all 0.15s"}}>
                <div style={center({width:26,height:26,borderRadius:"50%",background:k.color,fontSize:13})}>{k.emoji}</div>
                <div style={{textAlign:"left"}}>
                  <p style={{color:active?k.colorDark:T.deep,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:0}}>{k.name}</p>
                  <p style={{color:T.muted,fontSize:9,fontFamily:"'DM Sans',sans-serif",margin:0}}>{kp}% ✓</p>
                </div>
              </button>
            );
          })}
          <button onClick={()=>{}} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:50,border:`2px dashed ${T.blush}`,background:"transparent",cursor:"pointer",flexShrink:0}}>
            <span style={{color:T.clay,fontSize:16}}>+</span><span style={{color:T.clay,fontSize:11,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>Tilføj</span>
          </button>
        </div>
      </div>

      <div style={{padding:"14px 16px 0"}}>
        {/* Urgent alerts på tværs af alle børn */}
        {urgentAll.length>0&&<div style={{marginBottom:14}}>
          {urgentAll.map((u,i)=>(
            <div key={i} style={{background:"#FFF5F0",borderRadius:13,padding:"11px 13px",display:"flex",alignItems:"center",gap:10,marginBottom:8,border:"1.5px solid #F2C4B2"}}>
              <div style={center({width:32,height:32,borderRadius:"50%",background:u.kid.color,fontSize:14,flexShrink:0})}>{u.kid.emoji}</div>
              <div style={{flex:1}}><p style={{color:"#8B3A2A",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{u.kid.name}</p><p style={{color:T.warm,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0}}>{u.msg}</p></div>
              <button style={{background:"#C4876A",color:"#fff",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Book</button>
            </div>
          ))}
        </div>}

        {/* Opgaver */}
        <div style={row({justifyContent:"space-between",alignItems:"center",marginBottom:10})}>
          <p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:0}}>UGEPLAN · {kid.name.toUpperCase()}</p>
          <button onClick={()=>setTab("ai")} style={{background:"transparent",border:"none",color:kid.color,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>Spørg AI →</button>
        </div>
        <div style={col({gap:8,marginBottom:16})}>
          {tasks.map(t=>{const tag=TAGS[t.tag]||{bg:T.sand,tx:T.warm};return(
            <div key={t.id} onClick={()=>setTasks(p=>p.map(x=>x.id===t.id?{...x,done:!x.done}:x))}
              style={{background:t.done?T.sand:T.card,borderRadius:13,padding:"12px 13px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${t.done?"transparent":T.border}`,cursor:"pointer",transition:"all 0.15s"}}>
              <div style={center({width:22,height:22,borderRadius:"50%",border:`2px solid ${t.done?kid.color:"#F2C4B2"}`,background:t.done?kid.color:"transparent",flexShrink:0})}>
                {t.done&&<span style={{color:"#fff",fontSize:10,fontWeight:700}}>✓</span>}
              </div>
              <p style={{flex:1,color:t.done?T.muted:T.deep,fontSize:13,fontWeight:500,fontFamily:"'DM Sans',sans-serif",margin:0,textDecoration:t.done?"line-through":"none"}}>{t.text}</p>
              <span style={{background:tag.bg,color:tag.tx,fontSize:9,fontWeight:700,padding:"3px 7px",borderRadius:20,fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>{t.tag}</span>
            </div>
          );})}
        </div>

        {/* Indsigt om barnet */}
        {kid.insights&&kid.insights.length>0&&(
          <div style={{background:`linear-gradient(135deg,${kid.colorLight},${T.card})`,borderRadius:14,padding:"13px 14px",marginBottom:14,border:`1px solid ${kid.color}22`}}>
            <p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 7px"}}>✨ VIDSTE DU OM {kid.name.toUpperCase()}</p>
            <p style={{color:kid.colorDark,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.6}}>{kid.insights[0]}</p>
          </div>
        )}

        {/* Sundhed-shortcut */}
        <button onClick={()=>setTab("sundhed")} style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"13px 15px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:8,textAlign:"left"}}>
          <div style={center({width:38,height:38,borderRadius:10,background:"#EEF6EE",fontSize:18,flexShrink:0})}>🏥</div>
          <div style={{flex:1}}><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>Sundhed & MitID</p><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>Aftaler, vaccinationer og journaldata</p></div>
          <span style={{color:T.muted,fontSize:18}}>›</span>
        </button>
      </div>
    </div>
  );
}

// ── SUNDHED ───────────────────────────────────────────────────────────────────
function SundhedScreen({kid,T}) {
  const [mitid,setMitid]=useState(false);
  const [flow,setFlow]=useState(null);

  if(flow==="mitid") return(
    <div style={col({minHeight:"100%",background:"#0A1628",alignItems:"center",justifyContent:"center",padding:28})}>
      <div style={center({width:72,height:72,borderRadius:"50%",background:"rgba(42,106,232,0.15)",border:"2px solid #2A6AE8",fontSize:32,marginBottom:20})}>🔐</div>
      <h2 style={{color:"#fff",fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 8px",textAlign:"center"}}>Log ind med MitID</h2>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:"0 0 8px",textAlign:"center",lineHeight:1.6}}>Ro henter automatisk dine lægeaftaler, vaccinationer og journalnoter fra sundhed.dk</p>
      <div style={{background:"rgba(255,255,255,0.06)",borderRadius:14,padding:"13px 15px",marginBottom:24,width:"100%",boxSizing:"border-box"}}>
        {["Lægeaftaler og kontroller","Vaccinationsjournal","Graviditetsjournaldata","Sundhedsplejerske-noter"].map(f=>(
          <div key={f} style={row({gap:9,marginBottom:8})}>
            <div style={center({width:16,height:16,borderRadius:"50%",background:"#A8C5A0",flexShrink:0})}><span style={{color:"#0D1F18",fontSize:9,fontWeight:700}}>✓</span></div>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0}}>{f}</p>
          </div>
        ))}
      </div>
      <button onClick={()=>{setMitid(true);setFlow(null);}} style={{width:"100%",background:"#2A6AE8",color:"#fff",border:"none",borderRadius:14,padding:"14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer",marginBottom:10}}>Godkend med MitID →</button>
      <button onClick={()=>setFlow(null)} style={{background:"transparent",color:"rgba(255,255,255,0.35)",border:"none",fontSize:13,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",padding:8}}>Annullér</button>
    </div>
  );

  return(
    <div style={{height:"calc(100vh - 130px)",overflowY:"auto",paddingBottom:24}}>
      <div style={{background:"linear-gradient(145deg,#1A3A2A,#2C5C3A)",padding:"20px 20px 16px"}}>
        <h1 style={{color:"#fff",fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 14px"}}>{kid.emoji} {kid.name} · Sundhed</h1>
        {!mitid?(
          <button onClick={()=>setFlow("mitid")} style={{background:"rgba(42,106,232,0.2)",border:"1.5px solid rgba(42,106,232,0.5)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",width:"100%",textAlign:"left"}}>
            <span style={{fontSize:20}}>🔐</span>
            <div style={{flex:1}}><p style={{color:"#fff",fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>Tilslut MitID</p><p style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>Hent lægeaftaler og journaldata automatisk</p></div>
            <span style={{color:"rgba(255,255,255,0.4)",fontSize:18}}>›</span>
          </button>
        ):(
          <div style={{background:"rgba(168,197,160,0.15)",border:"1px solid rgba(168,197,160,0.4)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>✅</span><p style={{color:"#A8C5A0",fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:0}}>MitID tilsluttet — data synkroniseret</p>
          </div>
        )}
      </div>
      <div style={{padding:"14px 16px 0"}}>
        <p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 9px"}}>AFTALER</p>
        <div style={col({gap:8,marginBottom:14})}>
          {(kid.appts||[]).map((a,i)=>(
            <div key={i} style={{background:T.card,borderRadius:13,padding:"12px 13px",display:"flex",alignItems:"center",gap:11,border:`1px solid ${a.urgent?"#F2C4B2":T.border}`}}>
              <div style={center({width:38,height:38,borderRadius:10,background:a.urgent?"#FFF0EB":T.sand,fontSize:18,flexShrink:0})}>🩺</div>
              <div style={{flex:1}}>
                <p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{a.title}</p>
                <p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{a.loc} · {a.date}</p>
              </div>
              {a.urgent?<button style={{background:"#C4876A",color:"#fff",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Book</button>:<span style={{background:"#EEF6EE",color:"#2C5C2C",fontSize:10,fontWeight:700,padding:"4px 8px",borderRadius:8,fontFamily:"'DM Sans',sans-serif"}}>Booket</span>}
            </div>
          ))}
        </div>
        <p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 9px"}}>VACCINATIONER</p>
        <div style={col({gap:7,marginBottom:14})}>
          {(kid.vaccines||[]).map((v,i)=>(
            <div key={i} style={{background:v.done?"#EEF6EE":T.card,borderRadius:12,padding:"11px 13px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${v.done?"#C8D8C8":T.border}`}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:v.done?"#A8C5A0":"#C4876A",flexShrink:0}}/>
              <div style={{flex:1}}><p style={{color:T.deep,fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{v.name}</p><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{v.done?"Givet "+v.due:v.due}</p></div>
              <span style={{color:v.done?"#2C5C2C":"#C4876A",fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{v.done?"✓ Givet":"Kommende"}</span>
            </div>
          ))}
        </div>
        {mitid&&<div style={{background:"#F0F7FF",borderRadius:14,padding:"13px 14px",border:"1px solid #C8D8F0"}}>
          <p style={{color:"#1A3A6A",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 6px"}}>📋 FRA SUNDHED.DK</p>
          {["Seneste lægebesøg: 15. marts","Næste kontrol anbefalet: Om 3 mdr.","Ingen aktive henvisninger"].map(n=><p key={n} style={{color:"#1A3A6A",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 4px"}}>{n}</p>)}
        </div>}
      </div>
    </div>
  );
}

// ── AI — GENDESIGNET ──────────────────────────────────────────────────────────
function AIScreen({kids,isPremium,onUpgrade,T,setTab}) {
  const [aiTab,setAiTab]=useState("familie");
  const [msgs,setMsgs]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [msgCount,setMsgCount]=useState(0);
  const [parCat,setParCat]=useState(0);
  const [focusKid,setFocusKid]=useState(null);
  const messagesEndRef=useRef(null);
  const FREE=3;
  const showWall=!isPremium&&msgCount>=FREE;

  useEffect(()=>{if(messagesEndRef.current)messagesEndRef.current.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const familyContext=kids.map(k=>`${k.name} (${k.phaseLabel}): Åbne opgaver: ${k.tasks.filter(t=>!t.done).map(t=>t.text).join(", ")||"ingen"}. Urgent: ${k.urgentMsg||"ingen"}. Indsigter: ${(k.insights||[]).join(" ")}`).join("\n");

  const sys=`Du er Ro AI — en varm, klog dansk forældreskabsassistent.
Familie-overblik:\n${familyContext}
${focusKid?`Fokus på: ${focusKid.name} (${focusKid.phaseLabel})`:"Svar med familiens helhed i fokus."}
Regler: Svar på dansk. Brug børnenes navne. Maks 180 ord. Nummerér råd. Ingen diagnose. Nævn handlinger der kan tages i appen (fx "Book i Sundhed-fanen"). Du er Ro AI.`;

  async function send(text) {
    const msg=text||input.trim();
    if(!msg||loading||showWall)return;
    setInput("");
    const next=[...msgs,{role:"user",content:msg}];
    setMsgs(next);
    setLoading(true);
    try {
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:sys,messages:next})});
      const d=await r.json();
      const reply=d.content?.map(b=>b.text||"").join("")||"Beklager, prøv igen.";
      setMsgs([...next,{role:"assistant",content:reply}]);
    } catch {
      setMsgs([...next,{role:"assistant",content:"Noget gik galt. Tjek din forbindelse."}]);
    }
    setLoading(false);
    setMsgCount(c=>c+1);
  }

  const TabBtn=({id,label})=>(
    <button onClick={()=>setAiTab(id)} style={{flex:1,padding:"8px 4px",borderRadius:9,border:"none",background:aiTab===id?"#fff":"transparent",color:aiTab===id?T.deep:T.muted,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",boxShadow:aiTab===id?"0 1px 4px rgba(0,0,0,0.1)":"none",transition:"all 0.15s"}}>
      {label}
    </button>
  );

  return(
    <div style={col({height:"calc(100vh - 130px)",background:T.bg,position:"relative"})}>
      {/* Header */}
      <div style={{background:"linear-gradient(150deg,#0D1F18,#1A3D28)",padding:"16px 18px 14px",flexShrink:0}}>
        <div style={row({justifyContent:"space-between",alignItems:"flex-start",marginBottom:12})}>
          <div>
            <p style={{color:"rgba(168,197,160,0.6)",fontSize:9,fontWeight:700,letterSpacing:2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{isPremium?"⭐ PREMIUM":"GRATIS · "+Math.max(0,FREE-msgCount)+" TILBAGE"} · AI ASSISTENT</p>
            <h1 style={{color:"#fff",fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:0}}>Ro AI ✨</h1>
          </div>
          {!isPremium&&<button onClick={onUpgrade} style={{background:"rgba(168,197,160,0.15)",border:"1px solid rgba(168,197,160,0.4)",borderRadius:20,padding:"5px 11px",color:"#A8C5A0",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>Opgrader</button>}
        </div>
        {/* Tab-switcher */}
        <div style={{background:"rgba(255,255,255,0.08)",borderRadius:11,padding:"3px",display:"flex",gap:3}}>
          <TabBtn id="familie" label="🏠 Familie"/>
          <TabBtn id="par" label="💑 Parret"/>
          <TabBtn id="uge" label="📬 Uge"/>
        </div>
      </div>

      {/* FAMILIE TAB — chat med fuld søskendehukommelse */}
      {aiTab==="familie"&&(
        <div style={col({flex:1,overflow:"hidden"})}>
          {/* Barn-filter */}
          <div style={{padding:"10px 16px 8px",background:T.card,borderBottom:`1px solid ${T.border}`,flexShrink:0}}>
            <div style={row({gap:7,overflowX:"auto"})}>
              <button onClick={()=>setFocusKid(null)} style={{padding:"4px 11px",borderRadius:20,border:`1.5px solid ${!focusKid?"#A8C5A0":T.border}`,background:!focusKid?"rgba(168,197,160,0.1)":T.bg,color:!focusKid?"#2C5C2C":T.muted,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",flexShrink:0}}>🏠 Alle</button>
              {kids.map(k=>(
                <button key={k.id} onClick={()=>setFocusKid(focusKid?.id===k.id?null:k)}
                  style={{display:"flex",alignItems:"center",gap:5,padding:"4px 11px 4px 6px",borderRadius:20,border:`1.5px solid ${focusKid?.id===k.id?k.color:T.border}`,background:focusKid?.id===k.id?`${k.color}15`:T.bg,cursor:"pointer",flexShrink:0}}>
                  <div style={center({width:16,height:16,borderRadius:"50%",background:k.color,fontSize:9})}>{k.emoji}</div>
                  <span style={{color:focusKid?.id===k.id?k.colorDark:T.muted,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{k.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Beskeder */}
          <div style={{flex:1,overflowY:"auto",padding:"14px 16px 8px"}}>
            {msgs.length===0?(
              <div>
                <div style={{textAlign:"center",padding:"16px 0 18px"}}>
                  <div style={center({width:56,height:56,borderRadius:"50%",background:"rgba(168,197,160,0.12)",border:"2px solid #A8C5A0",fontSize:24,margin:"0 auto 12px"})}>✨</div>
                  <p style={{color:T.deep,fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 4px"}}>Hej! Jeg kender hele din familie.</p>
                  <p style={{color:T.muted,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.55}}>{kids.map(k=>k.name).join(", ")} — jeg ved hvad der sker for dem alle.</p>
                  {!isPremium&&<div style={{background:"#FFF8EE",borderRadius:10,padding:"8px 12px",marginTop:10,border:"1px solid #F5E4C0",display:"inline-block"}}><p style={{color:"#7A5C1A",fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{Math.max(0,FREE-msgCount)} gratis beskeder tilbage · <span onClick={onUpgrade} style={{color:"#C4876A",fontWeight:700,cursor:"pointer"}}>Opgrader →</span></p></div>}
                </div>
                {/* Quick prompts */}
                <p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 9px"}}>FORSLAG</p>
                <div style={col({gap:7})}>
                  {kids.flatMap(k=>[
                    k.urgentMsg?{text:`Hjælp mig med: "${k.urgentMsg}"`,kid:k,action:()=>send(`Hjælp mig med at håndtere: "${k.urgentMsg}" for ${k.name}`)}: null,
                    {text:`Hvad er vigtigt for ${k.name} denne uge?`,kid:k,action:()=>send(`Hvad er det vigtigste jeg skal fokusere på med ${k.name} denne uge?`)},
                  ].filter(Boolean)).slice(0,4).map((p,i)=>(
                    <button key={i} onClick={p.action} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:13,padding:"11px 13px",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                      {p.kid&&<div style={center({width:22,height:22,borderRadius:"50%",background:p.kid.color,fontSize:11,flexShrink:0})}>{p.kid.emoji}</div>}
                      <p style={{color:T.deep,fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,margin:0,flex:1,lineHeight:1.4}}>{p.text}</p>
                      <span style={{color:T.muted,fontSize:14}}>›</span>
                    </button>
                  ))}
                </div>
              </div>
            ):(
              <div style={col({gap:12})}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                    {m.role==="assistant"&&<div style={center({width:28,height:28,borderRadius:"50%",background:"rgba(168,197,160,0.15)",border:"1.5px solid #A8C5A0",fontSize:13,flexShrink:0,marginRight:8,marginTop:2})}>✨</div>}
                    <div style={{background:m.role==="user"?"#A8C5A0":T.card,borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"11px 14px",maxWidth:"78%",border:m.role==="user"?"none":`1px solid ${T.border}`}}>
                      <p style={{color:m.role==="user"?T.dg:T.deep,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.65,whiteSpace:"pre-wrap"}}>{m.content}</p>
                      {/* Handlingsknapper i AI svar */}
                      {m.role==="assistant"&&(m.content.includes("Book")&&m.content.includes("fanen"))&&(
                        <button onClick={()=>setTab("home")} style={{marginTop:8,background:T.sand,border:`1px solid ${T.border}`,borderRadius:8,padding:"5px 10px",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:700,color:T.warm,cursor:"pointer"}}>→ Åbn Sundhed</button>
                      )}
                    </div>
                  </div>
                ))}
                {loading&&<div style={row({alignItems:"center",gap:8})}>
                  <div style={center({width:28,height:28,borderRadius:"50%",background:"rgba(168,197,160,0.15)",border:"1.5px solid #A8C5A0",fontSize:13})}>✨</div>
                  <div style={{background:T.card,borderRadius:"18px 18px 18px 4px",padding:"10px 14px",border:`1px solid ${T.border}`,display:"flex",gap:5,alignItems:"center"}}>
                    {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#A8C5A0",opacity:0.5}}/>)}
                  </div>
                </div>}
                <div ref={messagesEndRef}/>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{padding:"10px 14px 14px",background:T.nav,borderTop:`1px solid ${T.border}`,flexShrink:0}}>
            <div style={row({gap:8,alignItems:"flex-end"})}>
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
                placeholder={showWall?"Opgrader for at fortsætte...":focusKid?`Spørg om ${focusKid.name}...`:"Spørg om din familie..."}
                rows={1} disabled={showWall}
                style={{flex:1,background:T.input,border:`1.5px solid ${T.border}`,borderRadius:14,padding:"11px 13px",fontSize:14,fontFamily:"'DM Sans',sans-serif",color:T.deep,outline:"none",resize:"none",lineHeight:1.4,opacity:showWall?0.5:1}}/>
              <button onClick={()=>send()} disabled={!input.trim()||loading||showWall}
                style={{width:42,height:42,borderRadius:"50%",background:input.trim()&&!loading&&!showWall?"#A8C5A0":T.border,border:"none",cursor:input.trim()&&!loading&&!showWall?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{color:input.trim()&&!loading&&!showWall?T.dg:T.muted,fontSize:16}}>↑</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PARRET TAB — fælles for hele familien */}
      {aiTab==="par"&&(
        <div style={{flex:1,overflowY:"auto",padding:"16px 16px"}}>
          <div style={{textAlign:"center",padding:"12px 0 16px"}}>
            <div style={center({width:52,height:52,borderRadius:"50%",background:"rgba(196,135,106,0.12)",border:"2px solid #C4876A",fontSize:22,margin:"0 auto 10px"})}>💑</div>
            <p style={{color:T.deep,fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 4px"}}>Samtaleemner for hele familien</p>
            <p style={{color:T.muted,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.5}}>Forældre taler om børnene. Sjældnere om det at <em>være</em> forældre.</p>
          </div>
          {/* Kategori-tabs */}
          <div style={row({gap:7,overflowX:"auto",marginBottom:14})}>
            {PAR_EMNER.map((cat,i)=>(
              <button key={i} onClick={()=>setParCat(i)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${parCat===i?"#C4876A":T.border}`,background:parCat===i?"rgba(196,135,106,0.1)":T.bg,color:parCat===i?"#8B3A2A":T.muted,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",flexShrink:0}}>
                {PAR_EMNER[i].cat}
              </button>
            ))}
          </div>
          <div style={col({gap:8,marginBottom:14})}>
            {PAR_EMNER[parCat].items.map((p,i)=>(
              <button key={i} onClick={()=>{setAiTab("familie");send(`Hjælp os med samtaleemnet: "${p}"`);}}
                style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:"3px solid #C4876A",borderRadius:"0 13px 13px 0",padding:"13px 14px",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                <p style={{color:T.deep,fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,margin:0,flex:1,lineHeight:1.5}}>{p}</p>
                <span style={{color:"#C4876A",fontSize:14,flexShrink:0}}>›</span>
              </button>
            ))}
          </div>
          <div style={{background:"#FFF8EE",borderRadius:13,padding:"12px 14px",border:"1px solid #F5E4C0"}}>
            <p style={{color:"#7A5C1A",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.6}}>💡 Tryk et emne → Ro hjælper jer med at starte samtalen og komme videre.</p>
          </div>
        </div>
      )}

      {/* UGEBESKED TAB */}
      {aiTab==="uge"&&(
        <div style={{flex:1,overflowY:"auto",padding:"16px 16px"}}>
          {kids.map(k=>(
            <div key={k.id} style={{marginBottom:12}}>
              <div style={{background:`linear-gradient(135deg,${k.colorDark},${k.color})`,borderRadius:16,padding:"14px",marginBottom:8}}>
                <p style={{color:"rgba(255,255,255,0.6)",fontSize:9,fontWeight:700,letterSpacing:2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 5px"}}>📬 UGEBESKED · {k.name.toUpperCase()}</p>
                <p style={{color:"#fff",fontSize:13,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 6px",lineHeight:1.4}}>
                  {k.phase==="gravid"?`Uge 16: Fokus på ${k.urgentMsg||"hvile og forberedelse"}.`:k.phase==="spaedbarn"?`8 mdr: Fokus på ${k.urgentMsg||"kravling og finger-mad"}.`:`3 år: Fokus på selvstændighed og rollelege.`}
                </p>
                <p style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 10px",lineHeight:1.55,fontStyle:"italic"}}>{k.insights?.[0]||""}</p>
                <button onClick={()=>{setAiTab("familie");setFocusKid(k);send(`Fortæl mig mere om hvad jeg skal fokusere på denne uge med ${k.name}`);}}
                  style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:9,padding:"7px 13px",color:"#fff",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Snak med Ro om det →</button>
              </div>
              {/* Åbne opgaver denne uge */}
              {k.tasks.filter(t=>!t.done).slice(0,2).map((t,i)=>(
                <div key={i} style={{background:T.card,borderRadius:11,padding:"9px 12px",display:"flex",alignItems:"center",gap:9,border:`1px solid ${T.border}`,marginBottom:5}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:k.color,flexShrink:0}}/>
                  <p style={{color:T.deep,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0,flex:1}}>{t.text}</p>
                  <span style={{background:TAGS[t.tag]?.bg||T.sand,color:TAGS[t.tag]?.tx||T.warm,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:8,fontFamily:"'DM Sans',sans-serif"}}>{t.tag}</span>
                </div>
              ))}
            </div>
          ))}
          {!isPremium&&<div style={{background:"linear-gradient(135deg,#0D1F18,#1A3D28)",borderRadius:14,padding:"14px",border:"1px solid rgba(168,197,160,0.2)"}}>
            <p style={{color:"#A8C5A0",fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 4px"}}>⭐ Push-notifikationer</p>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 10px",lineHeight:1.5}}>Modtag ugenes besked automatisk mandag morgen — for hvert barn.</p>
            <button onClick={onUpgrade} style={{background:"#A8C5A0",color:"#0D1F18",border:"none",borderRadius:9,padding:"9px 14px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Aktivér med Premium →</button>
          </div>}
        </div>
      )}

      {/* Premium wall */}
      {showWall&&aiTab==="familie"&&(
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:`linear-gradient(to top,${T.bg} 60%,transparent)`,padding:"36px 20px 70px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={center({width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#0D1F18,#1A3D28)",fontSize:20,marginBottom:10})}>✨</div>
          <p style={{color:T.deep,fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 6px",textAlign:"center"}}>Opgrader til Ro Premium</p>
          <p style={{color:T.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif",textAlign:"center",margin:"0 0 16px",lineHeight:1.5}}>30 dage gratis — derefter 79 kr/md.</p>
          <button onClick={onUpgrade} style={{width:"100%",background:"linear-gradient(135deg,#0D1F18,#1A3D28)",color:"#A8C5A0",border:"none",borderRadius:13,padding:"14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Prøv gratis i 30 dage →</button>
        </div>
      )}
    </div>
  );
}

// ── ØKONOMI ───────────────────────────────────────────────────────────────────
function OkonomiScreen({kids,kid,nyidk,T}) {
  const [tab,setTab]=useState("ydelser");
  const [salary,setSalary]=useState(45000);
  const [checked,setChecked]=useState({});
  const ph=kid.phase;
  const YD={gravid:[{e:"📋",t:"Anmeld graviditet til arbejdsgiver",a:"Lovkrav",d:"Senest 3 mdr. før termin.",f:"Senest 3 mdr. før",u:true,url:"https://www.borger.dk"},{e:"💶",t:"Barselsdagpenge",a:"Maks 4.715 kr/uge",d:"90% af løn op til loftet.",f:"8 uger efter fødsel",u:false,url:"https://www.borger.dk"},{e:"👶",t:"Børnecheck",a:"4.746 kr/kvartal",d:"Automatisk fra Skattestyrelsen.",f:"Automatisk",u:false,url:"https://skat.dk"}],spaedbarn:[{e:"🏫",t:"Søg daginstitutionsplads",a:"Garanti fra 26 uger",d:"Søg tidligt — ventelister er lange.",f:"Søg nu",u:true,url:"https://www.borger.dk"},{e:"💶",t:"Barselsdagpenge",a:"Op til 52 uger",d:"Mor: 14, Far: 2, Fælles: 32 uger.",f:"Via borger.dk",u:false,url:"https://www.borger.dk"},{e:"🎓",t:"Fripladstilskud",a:"Op til 100%",d:"Afhænger af indkomst.",f:"Ved indmeldelse",u:false,url:"https://www.borger.dk"}],smaabarn:[{e:"🏫",t:"Søg plads i børnehave",a:"6 mdr. venteliste",d:"Søg tidligt via kommunen.",f:"Søg nu",u:true,url:"https://www.borger.dk"},{e:"💰",t:"Børnecheck (3–6 år)",a:"3.744 kr/kvartal",d:"Skifter ved 3-årsdag.",f:"Automatisk",u:false,url:"https://skat.dk"},{e:"🦷",t:"Gratis tandpleje",a:"Gratis til 22 år",d:"Kommunal tandpleje.",f:"Kommunen kontakter dig",u:false,url:"https://www.borger.dk"}]};
  const FR={gravid:[{t:"Anmeld graviditet",f:"Senest 3 mdr. før termin",u:true},{t:"Ansøg barselsdagpenge",f:"8 uger efter fødsel",u:false},{t:"Book fødselsforberedelse",f:"Tidligst muligt",u:false},{t:"Søg daginstitutionsplads",f:"Så tidligt som muligt",u:false}],spaedbarn:[{t:"Søg daginstitutionsplads",f:"Plads fra 26 uger",u:true},{t:"Ansøg fripladstilskud",f:"Ved indmeldelse",u:false},{t:"9-månederskontrol",f:"Inden 10 måneder",u:false},{t:"Start børneopsparing",f:"Jo tidligere jo bedre",u:false}],smaabarn:[{t:"Søg plads i børnehave",f:"6 mdr. venteliste",u:true},{t:"Tandlæge første besøg",f:"Inden 2,5 år",u:false},{t:"Sprogvurdering",f:"Kommunen kontakter dig",u:false},{t:"Tjek børnecheck",f:"Skifter ved 3-årsdag",u:false}]};
  const yd=YD[ph]||YD.smaabarn, fr=FR[ph]||FR.smaabarn;
  const wb=Math.min((salary*12/52)*0.9,4715);
  const tabs=[{id:"ydelser",l:"Ydelser"},{id:"frister",l:"Frister"},{id:"beregner",l:"Beregner"},...(nyidk?[{id:"nyidk",l:"Ny i DK"}]:[])];

  return(
    <div style={col({height:"calc(100vh - 130px)",background:T.bg})}>
      <div style={{background:`linear-gradient(145deg,${kid.colorDark},${kid.color})`,padding:"16px 18px 12px",flexShrink:0}}>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:10,fontWeight:700,letterSpacing:2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 3px"}}>TILPASSET {kid.phaseLabel.toUpperCase()}</p>
        <h1 style={{color:"#fff",fontSize:19,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 12px"}}>💰 Økonomi & Rettigheder</h1>
        <div style={row({gap:6,overflowX:"auto"})}>
          {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${tab===t.id?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.2)"}`,background:tab===t.id?"rgba(255,255,255,0.15)":"transparent",color:tab===t.id?"#fff":"rgba(255,255,255,0.5)",fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",flexShrink:0}}>{t.l}</button>)}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px",paddingBottom:20}}>
        {tab==="ydelser"&&<div>
          {yd.filter(y=>y.u).map((y,i)=><div key={i} style={{background:"#FFF5F0",borderRadius:14,padding:14,marginBottom:10,border:"1.5px solid #F2C4B2"}}>
            <div style={row({gap:11,marginBottom:9})}><span style={{fontSize:22}}>{y.e}</span><div style={{flex:1}}><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{y.t}</p><p style={{color:"#C4876A",fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{y.a}</p><p style={{color:T.muted,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 4px",lineHeight:1.5}}>{y.d}</p><p style={{color:"#8B3A2A",fontSize:11,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:0}}>⏰ {y.f}</p></div></div>
            <button onClick={()=>window.open(y.url,"_blank")} style={{display:"block",width:"100%",background:"#C4876A",color:"#fff",borderRadius:9,padding:"9px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:700,border:"none",cursor:"pointer",textAlign:"center"}}>Læs mere på borger.dk →</button>
          </div>)}
          {yd.filter(y=>!y.u).map((y,i)=><div key={i} style={{background:T.card,borderRadius:14,padding:13,border:`1px solid ${T.border}`,marginBottom:9}}>
            <div style={row({gap:11})}><span style={{fontSize:20,marginTop:1}}>{y.e}</span><div style={{flex:1}}><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{y.t}</p><p style={{color:kid.color,fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 3px"}}>{y.a}</p><p style={{color:T.muted,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 4px",lineHeight:1.5}}>{y.d}</p><div style={row({justifyContent:"space-between"})}><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>📅 {y.f}</p><button onClick={()=>window.open(y.url,"_blank")} style={{color:kid.color,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",background:"none",border:"none",cursor:"pointer",padding:0}}>borger.dk →</button></div></div></div>
          </div>)}
        </div>}
        {tab==="frister"&&<div style={col({gap:9})}>
          {fr.map((f,i)=>{const done=checked[i];return(
            <div key={i} onClick={()=>setChecked(p=>({...p,[i]:!p[i]}))} style={{background:done?T.sand:T.card,borderRadius:14,padding:13,display:"flex",alignItems:"center",gap:12,border:`1.5px solid ${f.u&&!done?"#F2C4B2":done?"transparent":T.border}`,cursor:"pointer"}}>
              <div style={center({width:24,height:24,borderRadius:"50%",border:`2px solid ${done?kid.color:f.u?"#C4876A":"#F2C4B2"}`,background:done?kid.color:"transparent",flexShrink:0})}>{done&&<span style={{color:"#fff",fontSize:11}}>✓</span>}</div>
              <div style={{flex:1}}><p style={{color:done?T.muted:T.deep,fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px",textDecoration:done?"line-through":"none"}}>{f.t}</p><p style={{color:f.u&&!done?"#C4876A":T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{f.u&&!done?"⚠️ ":"📅 "}{f.f}</p></div>
            </div>
          );})}
        </div>}
        {tab==="beregner"&&<div>
          {/* Fælles familie-overblik */}
          <div style={{background:T.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${T.border}`}}>
            <p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 10px"}}>FAMILIE-OVERBLIK · BØRNECHECK</p>
            {kids.map(k=>{
              const kv=k.phase==="gravid"||k.phase==="spaedbarn"?4746:3744;
              return(
                <div key={k.id} style={row({gap:10,marginBottom:9,paddingBottom:9,borderBottom:`1px solid ${T.border}`})}>
                  <div style={center({width:30,height:30,borderRadius:"50%",background:k.color,fontSize:14,flexShrink:0})}>{k.emoji}</div>
                  <div style={{flex:1}}><p style={{color:T.deep,fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{k.name}</p><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{k.phaseLabel}</p></div>
                  <div style={{textAlign:"right"}}><p style={{color:k.color,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{kv.toLocaleString("da-DK")} kr/kvartal</p><p style={{color:T.muted,fontSize:10,fontFamily:"'DM Sans',sans-serif",margin:0}}>{(kv*4).toLocaleString("da-DK")} kr/år</p></div>
                </div>
              );
            })}
            <div style={{background:"#EEF6EE",borderRadius:10,padding:"10px 12px"}}>
              <p style={{color:"#2C5C2C",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px",fontWeight:700}}>Samlet børnecheck for familien</p>
              <p style={{color:"#2C5C2C",fontSize:16,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:0}}>{kids.reduce((sum,k)=>sum+(k.phase==="gravid"||k.phase==="spaedbarn"?4746:3744)*4,0).toLocaleString("da-DK")} kr/år</p>
            </div>
          </div>
          {/* Dagpenge beregner */}
          {(ph==="gravid"||ph==="spaedbarn")&&<div style={{background:T.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${T.border}`}}>
            <p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 12px"}}>BARSELSDAGPENGE-BEREGNER</p>
            <p style={{color:T.deep,fontSize:22,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{salary.toLocaleString("da-DK")} kr/md</p>
            <input type="range" min={20000} max={100000} step={1000} value={salary} onChange={e=>setSalary(Number(e.target.value))} style={{width:"100%",accentColor:kid.color,margin:"10px 0 14px"}}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
              {[{l:"Per uge",v:Math.round(wb)},{l:"Per md.",v:Math.round(wb*4.33)},{l:"32 uger",v:Math.round(wb*32)},{l:"52 uger",v:Math.round(wb*52)}].map(x=>(
                <div key={x.l} style={{background:kid.colorLight,borderRadius:11,padding:11,border:`1px solid ${kid.color}22`}}>
                  <p style={{color:T.muted,fontSize:10,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{x.l}</p>
                  <p style={{color:kid.colorDark,fontSize:15,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:0}}>{x.v.toLocaleString("da-DK")} kr</p>
                </div>
              ))}
            </div>
          </div>}
        </div>}
        {tab==="nyidk"&&<div>
          <div style={{background:"rgba(168,197,160,0.1)",borderRadius:13,padding:"12px 14px",marginBottom:12,border:"1px solid rgba(168,197,160,0.25)",display:"flex",gap:10}}>
            <span style={{fontSize:16}}>🌍</span><p style={{color:T.deep,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:0,lineHeight:1.6}}>Rettigheder for <strong>nye i Danmark</strong>. Afhænger af din opholdstilladelse.</p>
          </div>
          {[{e:"💶",t:"Barselsdagpenge",d:"Kræver 6 måneders arbejde i DK.",url:"https://www.borger.dk"},{e:"👩‍⚕️",t:"Gratis sundhedsydelser",d:"Gælder alle med gyldig opholdstilladelse.",url:"https://www.borger.dk"},{e:"📚",t:"Gratis danskundervisning",d:"Op til 5 år via kommunen.",url:"https://www.borger.dk"},{e:"👶",t:"Børnecheck",d:"Ret til check hvis barnet bor i DK og du arbejder.",url:"https://skat.dk"}].map((y,i)=>(
            <div key={i} style={{background:T.card,borderRadius:13,padding:13,border:`1px solid ${T.border}`,marginBottom:8}}>
              <div style={row({gap:11})}><span style={{fontSize:20}}>{y.e}</span><div style={{flex:1}}><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 3px"}}>{y.t}</p><p style={{color:T.muted,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 5px",lineHeight:1.5}}>{y.d}</p><button onClick={()=>window.open(y.url,"_blank")} style={{color:kid.color,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",background:"none",border:"none",cursor:"pointer",padding:0}}>Læs mere →</button></div></div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

// ── PROFIL ────────────────────────────────────────────────────────────────────
function ProfilScreen({kid,kids,setKids,userName,setUserName,partnerName,setPartnerName,partnerInvited,setPartnerInvited,isPremium,setIsPremium,dark,toggleDark,T,onSelectKid}) {
  const [sec,setSec]=useState("main");
  const [editKid,setEditKid]=useState(null);
  const [newKid,setNewKid]=useState({name:"",emoji:"👶",col:KCOLS[0],phase:"spaedbarn"});
  const [pInput,setPInput]=useState("");
  const [pPhone,setPPhone]=useState("");
  const [sent,setSent]=useState(false);
  const [editName,setEditName]=useState("");

  const Back=({to,label="← Tilbage"})=>(
    <button onClick={()=>setSec(to)} style={{background:T.sand,border:"none",borderRadius:9,padding:"7px 13px",color:T.warm,fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",marginBottom:18,alignSelf:"flex-start"}}>{label}</button>
  );
  const SH=({title,T})=><p style={{color:T.muted,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 9px"}}>{title}</p>;

  if(sec==="main") return(
    <div style={{height:"calc(100vh - 130px)",overflowY:"auto",paddingBottom:24}}>
      {/* Profil header */}
      <div style={{background:"linear-gradient(150deg,#0D1F18,#1A3D28)",padding:"22px 20px 20px"}}>
        <div style={row({gap:14,marginBottom:18})}>
          <div style={center({width:58,height:58,borderRadius:"50%",background:"rgba(168,197,160,0.15)",border:"2px solid #A8C5A0",fontSize:24,flexShrink:0})}>{userName?userName[0].toUpperCase():"👤"}</div>
          <div style={{flex:1}}>
            <h2 style={{color:"#fff",fontSize:19,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 3px"}}>{userName||"Din profil"}</h2>
            {partnerName&&<p style={{color:"rgba(255,255,255,0.45)",fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:"0 0 5px"}}>& {partnerName}</p>}
            <div style={row({gap:6,flexWrap:"wrap"})}>
              <span style={{background:isPremium?"rgba(168,197,160,0.2)":"rgba(196,135,106,0.2)",color:isPremium?"#A8C5A0":"#C4876A",fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,fontFamily:"'DM Sans',sans-serif",border:`1px solid ${isPremium?"rgba(168,197,160,0.4)":"rgba(196,135,106,0.4)"}`}}>{isPremium?"⭐ Premium":"🔓 Gratis"}</span>
            </div>
          </div>
          <button onClick={()=>{setEditName(userName);setSec("editName");}} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:9,padding:"6px 11px",color:"rgba(255,255,255,0.6)",fontSize:11,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>Rediger</button>
        </div>
        {/* Børn pills */}
        <div style={row({gap:7,overflowX:"auto"})}>
          {kids.map(k=>(
            <button key={k.id} onClick={()=>onSelectKid(k.id)} style={row({gap:7,background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:50,padding:"5px 11px 5px 6px",cursor:"pointer",flexShrink:0})}>
              <div style={center({width:24,height:24,borderRadius:"50%",background:k.color,fontSize:12})}>{k.emoji}</div>
              <div><p style={{color:"#fff",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:0}}>{k.name}</p><p style={{color:"rgba(255,255,255,0.4)",fontSize:9,fontFamily:"'DM Sans',sans-serif",margin:0}}>{k.phaseLabel}</p></div>
            </button>
          ))}
          <button onClick={()=>setSec("addKid")} style={row({gap:6,background:"rgba(168,197,160,0.1)",border:"1.5px dashed rgba(168,197,160,0.35)",borderRadius:50,padding:"5px 13px 5px 9px",cursor:"pointer",flexShrink:0})}>
            <span style={{color:"#A8C5A0",fontSize:15}}>+</span><span style={{color:"#A8C5A0",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>Tilføj barn</span>
          </button>
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}>
        {/* Premium banner */}
        {!isPremium&&<button onClick={()=>setSec("premium")} style={{width:"100%",background:"linear-gradient(135deg,#0D1F18,#1A3D28)",borderRadius:16,padding:"14px 16px",marginBottom:16,cursor:"pointer",border:"1px solid rgba(168,197,160,0.2)",textAlign:"left"}}>
          <div style={row({justifyContent:"space-between",alignItems:"center"})}>
            <div><p style={{color:"#A8C5A0",fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 3px"}}>RO PREMIUM</p><p style={{color:"#fff",fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 2px"}}>30 dage gratis · 79 kr/md</p><p style={{color:"rgba(255,255,255,0.45)",fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>Ubegrænset AI · Vækstgraf · Deling</p></div>
            <div style={{background:"#A8C5A0",borderRadius:9,padding:"7px 11px"}}><span style={{color:"#0D1F18",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>Prøv →</span></div>
          </div>
        </button>}

        {/* Børneprofiler */}
        <SH title="BØRNEPROFILER" T={T}/>
        <div style={col({gap:8,marginBottom:16})}>
          {kids.map(k=>(
            <div key={k.id} style={{background:T.card,borderRadius:14,padding:"12px 13px",display:"flex",alignItems:"center",gap:11,border:`1px solid ${T.border}`}}>
              <div style={center({width:42,height:42,borderRadius:"50%",background:k.color,fontSize:20,flexShrink:0})}>{k.emoji}</div>
              <div style={{flex:1}}><p style={{color:T.deep,fontSize:14,fontWeight:700,fontFamily:"'Playfair Display',serif",margin:"0 0 2px"}}>{k.name}</p><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{k.phaseLabel}</p></div>
              <button onClick={()=>{setEditKid({...k});setSec("editKid");}} style={{background:T.sand,border:`1px solid ${T.border}`,borderRadius:9,padding:"5px 11px",color:T.warm,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>Rediger</button>
            </div>
          ))}
        </div>

        {/* Partner */}
        <SH title="PARTNER" T={T}/>
        <button onClick={()=>setSec("partner")} style={{width:"100%",background:T.card,borderRadius:14,padding:"12px 13px",display:"flex",alignItems:"center",gap:11,border:`1px solid ${T.border}`,marginBottom:16,cursor:"pointer",textAlign:"left"}}>
          {partnerInvited?<>
            <div style={center({width:38,height:38,borderRadius:"50%",background:"#EEF6EE",border:"2px solid #A8C5A0",fontSize:18,flexShrink:0})}>👋</div>
            <div style={{flex:1}}><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>{partnerName}</p><p style={{color:"#2C5C2C",fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>✓ Invitation sendt</p></div>
          </>:<>
            <div style={center({width:38,height:38,borderRadius:"50%",background:T.sand,border:`2px dashed #F2C4B2`,fontSize:18,flexShrink:0})}>+</div>
            <div style={{flex:1}}><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>Tilknyt din partner</p><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>Del opgaver, planer og AI</p></div>
            <span style={{color:T.muted,fontSize:18}}>›</span>
          </>}
        </button>

        {/* Ro anbefaler — Tobi + Børn i Byen */}
        <SH title="RO ANBEFALER" T={T}/>
        <div style={col({gap:9,marginBottom:16})}>
          {[{e:"💰",n:"Tobi",tag:"Børneopsparing",desc:"Start børneopsparingen tidligt — ingen skjulte gebyrer.",url:"https://www.tobi.dk"},{e:"🌳",n:"Børn i Byen",tag:"Aktiviteter",desc:"Danmarks største guide til familieaktiviteter nær dig.",url:"https://www.bornibyen.dk"}].map(p=>(
            <div key={p.n} style={{background:T.card,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,border:`1px solid ${T.border}`}}>
              <div style={center({width:40,height:40,borderRadius:11,background:T.sand,fontSize:20,flexShrink:0})}>{p.e}</div>
              <div style={{flex:1}}><div style={row({alignItems:"center",gap:6,marginBottom:2})}><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:0}}>{p.n}</p><span style={{background:T.sand,color:T.muted,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:8,fontFamily:"'DM Sans',sans-serif"}}>RO ANBEFALER</span></div><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>{p.desc}</p></div>
              <button onClick={()=>window.open(p.url,"_blank")} style={{background:T.sand,border:`1px solid ${T.border}`,borderRadius:9,padding:"6px 11px",color:T.warm,fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",flexShrink:0}}>Besøg →</button>
            </div>
          ))}
          <p style={{color:T.muted,fontSize:10,fontFamily:"'DM Sans',sans-serif",margin:"2px 0 0",lineHeight:1.5}}>Ro har ingen kommerciel aftale med disse virksomheder. Vi anbefaler dem fordi vi selv ville bruge dem.</p>
        </div>

        {/* Indstillinger */}
        <SH title="INDSTILLINGER" T={T}/>
        <div style={{background:T.card,borderRadius:14,border:`1px solid ${T.border}`,overflow:"hidden",marginBottom:8}}>
          <div onClick={toggleDark} style={{padding:"12px 15px",display:"flex",alignItems:"center",gap:11,borderBottom:`1px solid ${T.border}`,cursor:"pointer"}}>
            <span style={{fontSize:18}}>{dark?"🌙":"☀️"}</span><p style={{flex:1,color:T.deep,fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:0}}>Mørk tilstand</p>
            <div style={{width:42,height:22,borderRadius:11,background:dark?"#A8C5A0":"#EDE5D8",display:"flex",alignItems:"center",padding:"0 2px",justifyContent:dark?"flex-end":"flex-start"}}><div style={{width:18,height:18,borderRadius:"50%",background:"#fff"}}/></div>
          </div>
          {[{i:"📋",l:"Privatlivspolitik",a:()=>{}},{i:"📤",l:"Eksportér mine data",a:()=>{}},{i:"🗑️",l:"Slet alle mine data",a:()=>{},red:true}].map((item,i,arr)=>(
            <div key={item.l} onClick={item.a} style={{padding:"12px 15px",display:"flex",alignItems:"center",gap:11,borderBottom:i<arr.length-1?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
              <span style={{fontSize:18}}>{item.i}</span><p style={{flex:1,color:item.red?"#C4423A":T.deep,fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:0}}>{item.l}</p><span style={{color:T.muted,fontSize:16}}>›</span>
            </div>
          ))}
        </div>
        <p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",textAlign:"center",margin:"12px 0 0"}}>Ro v1.0 Beta · Lavet med ❤️ til danske forældre</p>
      </div>
    </div>
  );

  if(sec==="editName") return(<div style={col({height:"calc(100vh - 130px)",padding:"20px",overflowY:"auto"})}><Back to="main"/><h2 style={{color:T.deep,fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 20px"}}>Rediger profil</h2><p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 7px"}}>DIT FORNAVN</p><input value={editName} onChange={e=>setEditName(e.target.value)} placeholder="fx. Sara" style={{width:"100%",background:T.input,border:`1.5px solid ${editName?kid.color:T.border}`,borderRadius:13,padding:"13px 15px",color:T.deep,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",marginBottom:14}}/><button onClick={()=>{setUserName(editName);setSec("main");}} style={{width:"100%",background:kid.color,color:"#fff",border:"none",borderRadius:13,padding:"13px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Gem →</button></div>);

  if(sec==="editKid"&&editKid) return(<div style={col({height:"calc(100vh - 130px)",padding:"20px",overflowY:"auto"})}>
    <Back to="main"/>
    <h2 style={{color:T.deep,fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 4px"}}>Rediger {editKid.name}</h2>
    <p style={{color:T.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:"0 0 16px"}}>Emoji, navn og farve.</p>
    <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><div style={center({width:68,height:68,borderRadius:"50%",background:editKid.color,fontSize:32,boxShadow:`0 4px 16px ${editKid.color}44`})}>{editKid.emoji}</div></div>
    <p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 8px"}}>EMOJI</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:14}}>
      {EMOJIS.map(e=><button key={e} onClick={()=>setEditKid(k=>({...k,emoji:e}))} style={{aspectRatio:"1",background:editKid.emoji===e?editKid.color+"33":T.sand,border:`2px solid ${editKid.emoji===e?editKid.color:T.border}`,borderRadius:11,fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{e}</button>)}
    </div>
    <div style={{background:T.sand,borderRadius:10,padding:"9px 12px",marginBottom:14,border:`1px solid ${T.border}`}}><p style={{color:T.muted,fontSize:11,fontFamily:"'DM Sans',sans-serif",margin:0}}>📸 Profilbillede via kamera tilgængeligt i telefon-appen (Expo Go).</p></div>
    <p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 7px"}}>NAVN</p>
    <input value={editKid.name} onChange={e=>setEditKid(k=>({...k,name:e.target.value}))} style={{width:"100%",background:T.input,border:`1.5px solid ${T.border}`,borderRadius:13,padding:"12px 14px",color:T.deep,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",marginBottom:14}}/>
    <p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 8px"}}>FARVE</p>
    <div style={{display:"flex",gap:8,marginBottom:18}}>{KCOLS.map(c=><button key={c.c} onClick={()=>setEditKid(k=>({...k,color:c.c,colorLight:c.l,colorDark:c.d}))} style={{width:34,height:34,borderRadius:"50%",background:c.c,border:`3px solid ${editKid.color===c.c?T.deep:"transparent"}`,cursor:"pointer"}}/>)}</div>
    <button onClick={()=>{setKids(p=>p.map(k=>k.id===editKid.id?{...k,...editKid}:k));setSec("main");}} style={{width:"100%",background:editKid.color,color:"#fff",border:"none",borderRadius:13,padding:"13px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Gem ændringer →</button>
  </div>);

  if(sec==="addKid") return(<div style={col({height:"calc(100vh - 130px)",padding:"20px",overflowY:"auto"})}>
    <Back to="main"/>
    <h2 style={{color:T.deep,fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 4px"}}>Tilføj barn</h2>
    <p style={{color:T.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:"0 0 14px"}}>Hvert barn får sin egen plan og AI.</p>
    <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><div style={center({width:60,height:60,borderRadius:"50%",background:newKid.col.c,fontSize:28})}>{newKid.emoji}</div></div>
    <p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 8px"}}>EMOJI</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginBottom:14}}>{EMOJIS.slice(0,10).map(e=><button key={e} onClick={()=>setNewKid(k=>({...k,emoji:e}))} style={{aspectRatio:"1",background:newKid.emoji===e?newKid.col.c+"33":T.sand,border:`2px solid ${newKid.emoji===e?newKid.col.c:T.border}`,borderRadius:11,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{e}</button>)}</div>
    <p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 7px"}}>NAVN</p>
    <input value={newKid.name} onChange={e=>setNewKid(k=>({...k,name:e.target.value}))} placeholder="fx. Emma, Oliver..." style={{width:"100%",background:T.input,border:`1.5px solid ${newKid.name?newKid.col.c:T.border}`,borderRadius:13,padding:"12px 14px",color:T.deep,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",marginBottom:14}}/>
    <p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 8px"}}>FASE</p>
    <div style={col({gap:7,marginBottom:14})}>{[{id:"gravid",e:"🤰",l:"Gravid"},{id:"spaedbarn",e:"👶",l:"Spædbarn"},{id:"smaabarn",e:"🧒",l:"Lille barn"}].map(p=><button key={p.id} onClick={()=>setNewKid(k=>({...k,phase:p.id}))} style={{background:newKid.phase===p.id?"rgba(168,197,160,0.1)":T.sand,border:`1.5px solid ${newKid.phase===p.id?"#A8C5A0":T.border}`,borderRadius:11,padding:"10px 13px",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}><span style={{fontSize:18}}>{p.e}</span><p style={{color:T.deep,fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",margin:0,flex:1}}>{p.l}</p>{newKid.phase===p.id&&<span style={{color:"#A8C5A0",fontWeight:700}}>✓</span>}</button>)}</div>
    <p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 8px"}}>FARVE</p>
    <div style={{display:"flex",gap:7,marginBottom:18}}>{KCOLS.map(c=><button key={c.c} onClick={()=>setNewKid(k=>({...k,col:c}))} style={{width:32,height:32,borderRadius:"50%",background:c.c,border:`3px solid ${newKid.col.c===c.c?T.deep:"transparent"}`,cursor:"pointer"}}/>)}</div>
    <button onClick={()=>{if(!newKid.name||!newKid.phase)return;const ph={gravid:{phaseLabel:"Gravid",heroTagline:"Et nyt liv er på vej",babyDesc:"🤰 Graviditet",urgentMsg:null,insights:["Graviditet er en rejse — tillad dig selv at nyde den."]},spaedbarn:{phaseLabel:"Spædbarn",heroTagline:"Opdager verden dag for dag",babyDesc:"👶 Spædbarn",urgentMsg:null,insights:["Hvert smil er et skridt i den rette retning."]},smaabarn:{phaseLabel:"Lille barn",heroTagline:"Fuld af nysgerrighed",babyDesc:"🧒 Lille barn",urgentMsg:null,insights:["Leg er det vigtigste læringsredskab i denne alder."]}}[newKid.phase]||{};const id=Math.max(...kids.map(k=>k.id))+1;setKids(p=>[...p,{id,name:newKid.name,emoji:newKid.emoji,phase:newKid.phase,color:newKid.col.c,colorLight:newKid.col.l,colorDark:newKid.col.d,tasks:[],vaccines:[],appts:[],...ph}]);setNewKid({name:"",emoji:"👶",col:KCOLS[0],phase:"spaedbarn"});setSec("main");}} style={{width:"100%",background:newKid.name&&newKid.phase?"#A8C5A0":"#EDE5D8",color:newKid.name&&newKid.phase?"#0D1F18":T.muted,border:"none",borderRadius:13,padding:"13px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:newKid.name&&newKid.phase?"pointer":"default"}}>
      {newKid.name?"Tilføj "+newKid.name+" →":"Udfyld navn for at fortsætte"}
    </button>
  </div>);

  if(sec==="partner") return(<div style={col({height:"calc(100vh - 130px)",padding:"20px",overflowY:"auto"})}>
    <Back to="main"/>
    <h2 style={{color:T.deep,fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 4px"}}>Invitér din partner</h2>
    <p style={{color:T.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:"0 0 22px",lineHeight:1.6}}>Begge ser ugeplaner, deler opgaver og bruger Ro AI for hvert barn.</p>
    {!sent?<><p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 7px"}}>PARTNERS NAVN</p><input value={pInput} onChange={e=>setPInput(e.target.value)} placeholder="fx. Mads, Sara..." style={{width:"100%",background:T.input,border:`1.5px solid ${pInput?kid.color:T.border}`,borderRadius:13,padding:"12px 14px",color:T.deep,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",marginBottom:14}}/><p style={{color:T.muted,fontSize:11,fontWeight:700,letterSpacing:1.2,fontFamily:"'DM Sans',sans-serif",margin:"0 0 7px"}}>MOBILNUMMER</p><input value={pPhone} onChange={e=>setPPhone(e.target.value)} placeholder="+45 00 00 00 00" type="tel" style={{width:"100%",background:T.input,border:`1.5px solid ${pPhone?kid.color:T.border}`,borderRadius:13,padding:"12px 14px",color:T.deep,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",marginBottom:20}}/><button onClick={()=>{if(pInput&&pPhone){setPartnerName(pInput);setPartnerInvited(true);setSent(true);}}} style={{width:"100%",background:pInput&&pPhone?kid.color:"#EDE5D8",color:pInput&&pPhone?"#fff":T.muted,border:"none",borderRadius:13,padding:"13px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:pInput&&pPhone?"pointer":"default"}}>{pInput&&pPhone?"Send invitation →":"Udfyld navn og nummer"}</button></>
    :<div style={{textAlign:"center",paddingTop:24}}><div style={center({width:60,height:60,borderRadius:"50%",background:"#EEF6EE",border:"2px solid #A8C5A0",fontSize:26,margin:"0 auto 14px"})}>📱</div><h3 style={{color:T.deep,fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 8px"}}>Invitation sendt!</h3><p style={{color:T.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:"0 0 22px",lineHeight:1.6}}>{pInput} modtager en SMS med et link til at downloade Ro.</p><button onClick={()=>setSec("main")} style={{background:"#A8C5A0",color:"#0D1F18",border:"none",borderRadius:13,padding:"12px 22px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer"}}>Tilbage →</button></div>}
  </div>);

  if(sec==="premium") return(<div style={col({height:"calc(100vh - 130px)",padding:"20px",overflowY:"auto"})}>
    <Back to="main"/>
    <div style={{textAlign:"center",padding:"8px 0 18px"}}>
      <div style={center({width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#0D1F18,#1A3D28)",fontSize:24,margin:"0 auto 12px"})}>⭐</div>
      <h2 style={{color:T.deep,fontSize:24,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:"0 0 5px"}}>Ro Premium</h2>
      <p style={{color:T.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:0}}>Alt samlet — tilpasset din familie.</p>
    </div>
    <div style={{background:T.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${T.border}`}}>
      {[{i:"✨",t:"Ubegrænset Ro AI",d:"Fuld søskendehukommelse og samtalehistorik"},{i:"💑",t:"Samtaleemner til parret",d:"Vejledning der dækker alle børn samlet"},{i:"📬",t:"Push-notifikation mandag morgen",d:"Ugebesked automatisk for hvert barn"},{i:"📈",t:"Vækstgraf med WHO",d:"Log højde og vægt, se percentiler"},{i:"👥",t:"Del med partner",d:"Begge forældre ser og redigerer alt"},{i:"💾",t:"Samtalehukommelse",d:"AI husker tidligere samtaler på tværs af sessioner"}].map(f=>(
        <div key={f.t} style={row({gap:11,marginBottom:12})}>
          <div style={center({width:34,height:34,borderRadius:9,background:"rgba(168,197,160,0.12)",fontSize:16,flexShrink:0})}>{f.i}</div>
          <div><p style={{color:T.deep,fontSize:13,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 2px"}}>{f.t}</p><p style={{color:T.muted,fontSize:12,fontFamily:"'DM Sans',sans-serif",margin:0}}>{f.d}</p></div>
        </div>
      ))}
    </div>
    <div style={{background:"linear-gradient(135deg,#0D1F18,#1A3D28)",borderRadius:16,padding:14,marginBottom:10}}>
      <div style={row({justifyContent:"space-between",alignItems:"center",marginBottom:12})}>
        <div><p style={{color:"#A8C5A0",fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",margin:"0 0 3px"}}>RO PREMIUM</p><p style={{color:"#fff",fontSize:24,fontFamily:"'Playfair Display',serif",fontWeight:700,margin:0}}>79 kr<span style={{fontSize:13,fontWeight:400}}>/md</span></p></div>
        <div style={{background:"rgba(168,197,160,0.15)",borderRadius:9,padding:"7px 11px",border:"1px solid rgba(168,197,160,0.3)"}}><p style={{color:"#A8C5A0",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif",margin:"0 0 1px"}}>30 dage</p><p style={{color:"rgba(255,255,255,0.45)",fontSize:10,fontFamily:"'DM Sans',sans-serif",margin:0}}>gratis prøve</p></div>
      </div>
      <button onClick={()=>{setIsPremium(true);setSec("main");}} style={{width:"100%",background:"#A8C5A0",color:"#0D1F18",border:"none",borderRadius:11,padding:"13px",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,cursor:"pointer",marginBottom:7}}>Start 30 dages gratis prøveperiode →</button>
      <p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontFamily:"'DM Sans',sans-serif",textAlign:"center",margin:0}}>Opsig når som helst · Ingen kreditkort til prøveperioden</p>
    </div>
  </div>);

  return null;
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [dark,setDark]=useState(false);
  const [screen,setScreen]=useState("splash");
  const [nyidk,setNyidk]=useState(false);
  const [tab,setTab]=useState("home");
  const [subTab,setSubTab]=useState(null); // fx "sundhed"
  const [activeId,setActiveId]=useState(1);
  const [kids,setKids]=useState(KIDS0);
  const [isPremium,setIsPremium]=useState(false);
  const [userName,setUserName]=useState("");
  const [partnerName,setPartnerName]=useState("");
  const [partnerInvited,setPartnerInvited]=useState(false);
  const T=dark?DARK:LIGHT;
  const kid=kids.find(k=>k.id===activeId)||kids[0];
  const tasks=kid.tasks;
  const setTasks=fn=>setKids(p=>p.map(k=>k.id===activeId?{...k,tasks:fn(k.tasks)}:k));
  function selectKid(id){setActiveId(id);setTab("home");setSubTab(null);}
  function navTo(t){setTab(t);setSubTab(null);}

  // Inject Google Fonts via DOM (works in web artifact, no <link> needed)
  useEffect(()=>{
    const id="ro-fonts";
    if(!document.getElementById(id)){
      const l=document.createElement("link");
      l.id=id; l.rel="stylesheet";
      l.href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(l);
    }
  },[]);
  const base=<style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0;overscroll-behavior:none}input,textarea,button{font-family:'DM Sans',sans-serif;-webkit-appearance:none}::-webkit-scrollbar{display:none}`}</style>;

  if(screen==="splash")return <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh"}}><Splash onStart={()=>setScreen("onboarding")}/></div>;
  if(screen==="onboarding")return <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh"}}><Onboarding onDone={({name,fam,nyidk:ndk})=>{setUserName(name);setNyidk(ndk);setScreen("app");}}/></div>;

  const showSundhed=(tab==="home"&&subTab==="sundhed");

  return(
    <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh",background:T.bg}}>
      {base}
      {/* Top bar */}
      <div style={{background:T.nav,borderBottom:`1px solid ${T.border}`,padding:"9px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={row({gap:6})}>
          {showSundhed&&<button onClick={()=>setSubTab(null)} style={{background:T.sand,border:"none",borderRadius:8,padding:"5px 10px",color:T.warm,fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",marginRight:4}}>←</button>}
          <div style={center({width:20,height:20,borderRadius:"50%",background:T.deep+"22",border:`2px solid ${T.deep}`})}><div style={{width:7,height:7,borderRadius:"50%",background:T.deep}}/></div>
          <span style={{color:T.deep,fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{showSundhed?"Sundhed":"Ro"}</span>
        </div>
        <div style={row({gap:5,overflowX:"auto"})}>
          {kids.map(k=>{const a=k.id===activeId;return(
            <button key={k.id} onClick={()=>selectKid(k.id)} style={row({gap:4,padding:"3px 9px 3px 4px",borderRadius:50,border:`2px solid ${a?k.color:"transparent"}`,background:a?k.colorLight:T.sand,cursor:"pointer",flexShrink:0,transition:"all 0.15s"})}>
              <div style={center({width:20,height:20,borderRadius:"50%",background:k.color,fontSize:10})}>{k.emoji}</div>
              <span style={{color:a?k.colorDark:T.warm,fontSize:10,fontWeight:700}}>{k.name}</span>
            </button>
          );})}
          <button onClick={()=>{setTab("profil");}} style={center({width:26,height:26,borderRadius:"50%",border:`2px dashed #F2C4B2`,background:"transparent",color:"#C4876A",fontSize:12,cursor:"pointer",flexShrink:0})}>+</button>
        </div>
      </div>

      {/* Screens */}
      {tab==="home"&&!showSundhed&&<HomeScreen kid={kid} kids={kids} tasks={tasks} setTasks={setTasks} onSelectKid={selectKid} userName={userName} setTab={(t)=>{if(t==="sundhed")setSubTab("sundhed");else navTo(t);}} T={T}/>}
      {showSundhed&&<SundhedScreen kid={kid} T={T}/>}
      {tab==="ai"&&<AIScreen kids={kids} isPremium={isPremium} onUpgrade={()=>setIsPremium(true)} T={T} setTab={navTo}/>}
      {tab==="okonomi"&&<OkonomiScreen kids={kids} kid={kid} nyidk={nyidk} T={T}/>}
      {tab==="profil"&&<ProfilScreen kid={kid} kids={kids} setKids={setKids} userName={userName} setUserName={setUserName} partnerName={partnerName} setPartnerName={setPartnerName} partnerInvited={partnerInvited} setPartnerInvited={setPartnerInvited} isPremium={isPremium} setIsPremium={setIsPremium} dark={dark} toggleDark={()=>setDark(d=>!d)} T={T} onSelectKid={selectKid}/>}

      {/* Bottom nav — 4 punkter */}
      {!showSundhed&&<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:T.nav,borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"space-around",padding:"9px 0 14px",zIndex:100}}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>navTo(n.id)} style={col({alignItems:"center",gap:2,background:"none",border:"none",cursor:"pointer",padding:"2px 8px",position:"relative"})}>
            <span style={{fontSize:18,opacity:tab===n.id?1:0.35,transition:"opacity 0.15s"}}>{n.icon}</span>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:0.5,color:tab===n.id?kid.color:T.muted,transition:"color 0.15s"}}>{n.label}</span>
            {n.id==="ai"&&!isPremium&&<div style={{position:"absolute",top:1,right:6,width:6,height:6,borderRadius:"50%",background:"#C4876A"}}/>}
          </button>
        ))}
      </div>}
    </div>
  );
}
