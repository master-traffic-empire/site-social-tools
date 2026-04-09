(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,991124,e=>{"use strict";let t=(0,e.i(475254).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["default",0,t])},174886,e=>{"use strict";var t=e.i(991124);e.s(["Copy",()=>t.default])},678745,e=>{"use strict";let t=(0,e.i(475254).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["default",0,t])},643531,e=>{"use strict";var t=e.i(678745);e.s(["Check",()=>t.default])},563906,e=>{"use strict";let t=(0,e.i(475254).default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["default",0,t])},16715,e=>{"use strict";var t=e.i(563906);e.s(["RefreshCw",()=>t.default])},846780,e=>{"use strict";var t=e.i(843476),r=e.i(271645),a=e.i(174886),i=e.i(643531),o=e.i(16715);let n=["Fitness & Health","Food & Cooking","Travel","Fashion & Style","Beauty & Skincare","Business & Entrepreneur","Photography","Tech & Coding","Music","Art & Design","Gaming","Lifestyle","Parenting","Education","Real Estate"],s=[(e,t,r)=>`${e}
${t} | ${r}
Sharing what I learn along the way
DMs open for collabs`,(e,t,r)=>`${e} | ${t}
${r}
Helping you level up
Link below for more`,(e,t)=>`${e}
Passionate about ${t.toLowerCase()}
Creating content that matters
New posts weekly`,(e,t,r)=>`${e}
${t} creator
${r}
Building something cool
Stay tuned`,(e,t,r)=>`${e} // ${t}
On a mission: ${r}
Follow for daily inspo
Collab? DM me`,(e,t)=>`Hi, I'm ${e}
${t} enthusiast
Documenting the journey
Let's connect`,(e,t,r)=>`${e}
Making ${t.toLowerCase()} simple
${r}
Free tips in highlights`,(e,t)=>`${e}
${t} | Creator | Dreamer
Turning ideas into reality
Based in the internet`],l={maxWidth:600,margin:"0 auto"},d={display:"block",fontSize:14,fontWeight:600,color:"var(--text-secondary)",marginBottom:8},c={width:"100%",padding:"12px 16px",background:"var(--bg-secondary)",border:"1px solid var(--border)",borderRadius:"var(--radius)",color:"var(--text-primary)",fontSize:15,outline:"none",marginBottom:20},u={width:"100%",padding:"12px 16px",background:"var(--bg-secondary)",border:"1px solid var(--border)",borderRadius:"var(--radius)",color:"var(--text-primary)",fontSize:15,outline:"none",marginBottom:20,appearance:"none"},p={display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",borderRadius:"var(--radius-sm)",border:"none",background:"var(--accent)",color:"white",fontWeight:600,fontSize:15,cursor:"pointer",marginBottom:32},h={padding:20,background:"var(--bg-secondary)",border:"1px solid var(--border)",borderRadius:"var(--radius)",marginBottom:16,position:"relative"},g={fontSize:15,color:"var(--text-primary)",lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"var(--font-sans)"},y={fontSize:12,color:"var(--text-muted)",marginTop:8},v={position:"absolute",top:12,right:12,display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border)",background:"var(--bg-tertiary)",color:"var(--text-secondary)",fontSize:12,cursor:"pointer"};e.s(["default",0,function(){let[e,m]=(0,r.useState)(""),[x,b]=(0,r.useState)(""),[f,C]=(0,r.useState)(""),[k,$]=(0,r.useState)([]),[j,w]=(0,r.useState)(-1);return(0,t.jsxs)("div",{style:l,children:[(0,t.jsx)("label",{style:d,children:"Your Name or Brand"}),(0,t.jsx)("input",{style:c,placeholder:"e.g., Alex Chen",value:e,onChange:e=>m(e.target.value)}),(0,t.jsx)("label",{style:d,children:"Your Niche"}),(0,t.jsxs)("select",{style:u,value:x,onChange:e=>b(e.target.value),children:[(0,t.jsx)("option",{value:"",children:"Select a niche..."}),n.map(e=>(0,t.jsx)("option",{value:e,children:e},e))]}),(0,t.jsx)("label",{style:d,children:"Keywords or Tagline (optional)"}),(0,t.jsx)("input",{style:c,placeholder:"e.g., Plant-based recipes, NYC based",value:f,onChange:e=>C(e.target.value)}),(0,t.jsxs)("button",{style:{...p,opacity:e.trim()&&x?1:.5},onClick:()=>{if(!e.trim()||!x)return;let t=f.trim()||x;$([...s].sort(()=>Math.random()-.5).slice(0,4).map(r=>r(e.trim(),x,t)))},disabled:!e.trim()||!x,children:[(0,t.jsx)(o.RefreshCw,{size:18}),"Generate Bios"]}),k.map((e,r)=>(0,t.jsxs)("div",{style:h,children:[(0,t.jsxs)("button",{style:v,onClick:()=>{navigator.clipboard.writeText(e),w(r),setTimeout(()=>w(-1),2e3)},children:[j===r?(0,t.jsx)(i.Check,{size:14}):(0,t.jsx)(a.Copy,{size:14}),j===r?"Copied":"Copy"]}),(0,t.jsx)("div",{style:g,children:e}),(0,t.jsxs)("div",{style:{...y,color:e.length>150?"var(--danger)":"var(--text-muted)"},children:[e.length,"/150 characters"]})]},r))]})}])},436802,e=>{e.n(e.i(846780))}]);