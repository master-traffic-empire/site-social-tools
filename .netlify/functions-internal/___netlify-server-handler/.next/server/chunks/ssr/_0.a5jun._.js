module.exports=[776319,a=>{"use strict";let b=(0,a.i(170106).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);a.s(["default",0,b])},705151,a=>{"use strict";var b=a.i(776319);a.s(["Copy",()=>b.default])},234157,a=>{"use strict";let b=(0,a.i(170106).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);a.s(["default",0,b])},533441,a=>{"use strict";var b=a.i(234157);a.s(["Check",()=>b.default])},890561,a=>{"use strict";let b=(0,a.i(170106).default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);a.s(["default",0,b])},669520,a=>{"use strict";var b=a.i(890561);a.s(["RefreshCw",()=>b.default])},229556,a=>{"use strict";var b=a.i(187924),c=a.i(572131),d=a.i(705151),e=a.i(533441),f=a.i(669520);let g=["Fitness & Health","Food & Cooking","Travel","Fashion & Style","Beauty & Skincare","Business & Entrepreneur","Photography","Tech & Coding","Music","Art & Design","Gaming","Lifestyle","Parenting","Education","Real Estate"],h=[(a,b,c)=>`${a}
${b} | ${c}
Sharing what I learn along the way
DMs open for collabs`,(a,b,c)=>`${a} | ${b}
${c}
Helping you level up
Link below for more`,(a,b)=>`${a}
Passionate about ${b.toLowerCase()}
Creating content that matters
New posts weekly`,(a,b,c)=>`${a}
${b} creator
${c}
Building something cool
Stay tuned`,(a,b,c)=>`${a} // ${b}
On a mission: ${c}
Follow for daily inspo
Collab? DM me`,(a,b)=>`Hi, I'm ${a}
${b} enthusiast
Documenting the journey
Let's connect`,(a,b,c)=>`${a}
Making ${b.toLowerCase()} simple
${c}
Free tips in highlights`,(a,b)=>`${a}
${b} | Creator | Dreamer
Turning ideas into reality
Based in the internet`],i={maxWidth:600,margin:"0 auto"},j={display:"block",fontSize:14,fontWeight:600,color:"var(--text-secondary)",marginBottom:8},k={width:"100%",padding:"12px 16px",background:"var(--bg-secondary)",border:"1px solid var(--border)",borderRadius:"var(--radius)",color:"var(--text-primary)",fontSize:15,outline:"none",marginBottom:20},l={width:"100%",padding:"12px 16px",background:"var(--bg-secondary)",border:"1px solid var(--border)",borderRadius:"var(--radius)",color:"var(--text-primary)",fontSize:15,outline:"none",marginBottom:20,appearance:"none"},m={display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",borderRadius:"var(--radius-sm)",border:"none",background:"var(--accent)",color:"white",fontWeight:600,fontSize:15,cursor:"pointer",marginBottom:32},n={padding:20,background:"var(--bg-secondary)",border:"1px solid var(--border)",borderRadius:"var(--radius)",marginBottom:16,position:"relative"},o={fontSize:15,color:"var(--text-primary)",lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"var(--font-sans)"},p={fontSize:12,color:"var(--text-muted)",marginTop:8},q={position:"absolute",top:12,right:12,display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:"var(--radius-sm)",border:"1px solid var(--border)",background:"var(--bg-tertiary)",color:"var(--text-secondary)",fontSize:12,cursor:"pointer"};a.s(["default",0,function(){let[a,r]=(0,c.useState)(""),[s,t]=(0,c.useState)(""),[u,v]=(0,c.useState)(""),[w,x]=(0,c.useState)([]),[y,z]=(0,c.useState)(-1);return(0,b.jsxs)("div",{style:i,children:[(0,b.jsx)("label",{style:j,children:"Your Name or Brand"}),(0,b.jsx)("input",{style:k,placeholder:"e.g., Alex Chen",value:a,onChange:a=>r(a.target.value)}),(0,b.jsx)("label",{style:j,children:"Your Niche"}),(0,b.jsxs)("select",{style:l,value:s,onChange:a=>t(a.target.value),children:[(0,b.jsx)("option",{value:"",children:"Select a niche..."}),g.map(a=>(0,b.jsx)("option",{value:a,children:a},a))]}),(0,b.jsx)("label",{style:j,children:"Keywords or Tagline (optional)"}),(0,b.jsx)("input",{style:k,placeholder:"e.g., Plant-based recipes, NYC based",value:u,onChange:a=>v(a.target.value)}),(0,b.jsxs)("button",{style:{...m,opacity:a.trim()&&s?1:.5},onClick:()=>{if(!a.trim()||!s)return;let b=u.trim()||s;x([...h].sort(()=>Math.random()-.5).slice(0,4).map(c=>c(a.trim(),s,b)))},disabled:!a.trim()||!s,children:[(0,b.jsx)(f.RefreshCw,{size:18}),"Generate Bios"]}),w.map((a,c)=>(0,b.jsxs)("div",{style:n,children:[(0,b.jsxs)("button",{style:q,onClick:()=>{navigator.clipboard.writeText(a),z(c),setTimeout(()=>z(-1),2e3)},children:[y===c?(0,b.jsx)(e.Check,{size:14}):(0,b.jsx)(d.Copy,{size:14}),y===c?"Copied":"Copy"]}),(0,b.jsx)("div",{style:o,children:a}),(0,b.jsxs)("div",{style:{...p,color:a.length>150?"var(--danger)":"var(--text-muted)"},children:[a.length,"/150 characters"]})]},c))]})}])},389654,a=>{a.n(a.i(229556))}];

//# sourceMappingURL=_0.a5jun._.js.map