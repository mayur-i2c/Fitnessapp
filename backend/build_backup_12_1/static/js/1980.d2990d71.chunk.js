"use strict";(self.webpackChunkfitnessapp=self.webpackChunkfitnessapp||[]).push([[1980],{86522:function(e,t,i){i(47313);var r=i(8047),s=i(19641),n=i(46417);t.Z=function(e){var t=e.name,i=e.label,l=e.inputRef,a=e.InputProps,o=e.error,c=e.helperText,d=e.xs,u=e.sm,p=e.m,x=e.placeholder,h=e.id,g=e.defaultValue,m=e.readOnly,f=e.disabled,b=e.type,j=e.onChange;return console.log(b),(0,n.jsx)(s.ZP,{item:!0,xs:d,sm:u,m:p,children:(0,n.jsx)(r.Z,{InputLabelProps:{shrink:!0},type:b||"text",variant:"outlined",margin:"normal",fullWidth:!0,label:i,id:h,name:t,inputRef:l,InputProps:a,error:o,helperText:c,placeholder:x,defaultValue:g,readOnly:m,disabled:f,onChange:j})})}},81980:function(e,t,i){i.r(t);var r=i(1413),s=i(29439),n=i(58467),l=i(19641),a=i(47605),o=i(85345),c=i(56605),d=i(15480),u=i(85281),p=i(48104),x=i(42832),h=i(86522),g=i(80472),m=i(75627),f=i(47313),b=i(24083),j=i(31387),y=(i(88282),i(84726)),Z=i(16),v=i.n(Z),S=(i(94230),i(46417));t.default=function(){var e=(0,n.TH)().state,t=(0,f.useState)(!0),i=(0,s.Z)(t,2),Z=i[0],P=i[1],A=(0,f.useState)(!1),C=(0,s.Z)(A,2),I=C[0],w=C[1],L=(0,f.useState)(""),k=(0,s.Z)(L,2),O=k[0],R=k[1],V=(0,n.s0)(),q=(0,f.useState)(!1),E=(0,s.Z)(q,2),T=E[0],M=E[1],W=(0,f.useState)(!1),U=(0,s.Z)(W,2),F=U[0],B=U[1],D=(0,f.useState)(y),H=(0,s.Z)(D,2),z=H[0],Q=H[1],Y=(0,f.useState)(null),_=(0,s.Z)(Y,2),G=_[0],J=_[1],K=(0,m.cI)(),N=K.register,X=K.getValues,$=K.setValue,ee=K.handleSubmit,te=K.control,ie=K.formState.errors;(0,f.useEffect)((function(){if(e){var t=e.editdata,i=e.imageurl;R(t._id),$("title",t.title),$("subtitle",t.subtitle),$("description",t.description),Q(i+t.icon),J(i+t.video)}P(!1)}),[]);return(0,S.jsx)(l.ZP,{container:!0,rowSpacing:4.5,columnSpacing:2.75,children:(0,S.jsxs)(l.ZP,{item:!0,xs:12,md:6,lg:6,children:[(0,S.jsxs)(l.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",children:[(0,S.jsx)(l.ZP,{item:!0,children:(0,S.jsxs)(a.Z,{variant:"h5",children:[""===O?"Add":"Update"," Exercise Library"]})}),(0,S.jsx)(l.ZP,{item:!0})]}),(0,S.jsx)(g.Z,{sx:{mt:2},content:!1,children:(0,S.jsx)(x.Z,{spacing:3,children:(0,S.jsxs)(l.ZP,{xs:12,sx:{p:3},children:[(0,S.jsx)(j.Ix,{}),(0,S.jsx)("form",{onSubmit:ee((function(e){w(!1);var t=new FormData;Object.keys(e).forEach((function(i){"icon"===i||"video"===i?t.append(i,e[i][0]):t.append(i,e[i])})),""===O?(0,b.sA)(t).then((function(){localStorage.setItem("redirectSuccess","true"),localStorage.setItem("redirectMessage","Added successfully!"),V("/exeLibrary")})).catch((function(e){e.response.data.isSuccess?j.Am.error("Something Went Wrong!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0}):j.Am.error(e.response.data.message),w(!1)})):(0,b.L6)(t,O).then((function(){localStorage.setItem("redirectSuccess","true"),localStorage.setItem("redirectMessage","Updated successfully!"),V("/exeLibrary")})).catch((function(e){e.response.data.isSuccess?j.Am.error("Something Went Wrong!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0}):j.Am.error(e.response.data.message),w(!1)}))})),children:Z?(0,S.jsx)("p",{children:"Loading..."}):(0,S.jsxs)("div",{children:[(0,S.jsx)(h.Z,{xs:12,m:2,spacing:3,id:"title",name:"title",label:"Title",inputRef:N("title",{required:!0}),error:!!ie.title,helperText:ie.title&&"Title is required",placeholder:"Title",defaultValue:X("title"),onChange:function(e){return $("title",e.target.value)}}),(0,S.jsx)(h.Z,{xs:12,m:2,spacing:3,id:"subtitle",name:"subtitle",label:"Subtitle",inputRef:N("subtitle",{required:!0}),error:!!ie.subtitle,helperText:ie.subtitle&&"Subtitle is required",placeholder:"Subtitle",defaultValue:X("subtitle"),onChange:function(e){return $("subtitle",e.target.value)}}),(0,S.jsx)(l.ZP,{item:!0,xs:12,md:3,style:{display:"contents"},children:(0,S.jsx)(m.Qr,{name:"description",control:te,defaultValue:X("description"),render:function(e){var t=e.field;return(0,S.jsxs)(o.Z,{variant:"outlined",style:{margin:"15px",padding:"8px"},children:[(0,S.jsx)(a.Z,{variant:"body1",gutterBottom:!0,children:"Description"}),(0,S.jsx)(v(),{value:t.value||"",onChange:t.onChange,style:{height:"200px",border:"none"}})]})}})}),(0,S.jsxs)(l.ZP,{xs:12,mt:2,spacing:3,container:!0,children:[(0,S.jsx)(l.ZP,{item:!0,xs:6,mt:2,style:{textAlign:"center"},children:(0,S.jsxs)(x.Z,{direction:"row",alignItems:"center",style:{display:"block"},spacing:2,sx:6,onMouseOver:function(){M(!0)},onMouseOut:function(){M(!1)},children:[(0,S.jsxs)("label",{htmlFor:"icon-button-file-icon",style:{textAlign:"center"},children:[(0,S.jsx)(c.Z,(0,r.Z)((0,r.Z)({name:"icon",accept:"image/*"},N("icon",{required:!O})),{},{id:"icon-button-file-icon",type:"file",onChange:function(e){var t=e.target.files[0],i=new FileReader;console.log(t),i.onloadend=function(){Q(i.result)},i.readAsDataURL(t)},alignItems:"center",style:{top:"-9999px",left:"-9999px"}})),T?(0,S.jsx)("img",{src:y,alt:"Exercise Library",width:"100",height:100,style:{borderRadius:"50%"}}):(0,S.jsx)("img",{src:z,alt:"Exercise Library",width:"100",height:100,style:{borderRadius:"50%"}})]}),(0,S.jsx)("br",{}),(0,S.jsx)("span",{children:"Icon"}),(0,S.jsx)(d.Z,{error:!0,style:{textAlign:"center"},children:ie.icon&&"Icon is required"})]})}),(0,S.jsx)(l.ZP,{item:!0,xs:6,mt:2,style:{textAlign:"center"},children:(0,S.jsxs)(x.Z,{direction:"row",alignItems:"center",style:{display:"block"},spacing:2,sx:6,onMouseOver:function(){B(!0)},onMouseOut:function(){B(!1)},children:[(0,S.jsxs)("label",{htmlFor:"icon-button-file",style:{textAlign:"center"},children:[(0,S.jsx)(c.Z,(0,r.Z)((0,r.Z)({name:"video",accept:"video/*"},N("video",{required:!O})),{},{id:"icon-button-file",type:"file",onChange:function(e){var t=e.target.files[0];if(t){var i=URL.createObjectURL(t);J(i)}},alignItems:"center",style:{top:"-9999px",left:"-9999px"}})),F?(0,S.jsx)("img",{src:y,alt:"Exercise Library",width:"100",height:100,style:{borderRadius:"50%"}}):G?(0,S.jsxs)("video",{controls:!0,width:"200",height:"150",children:[(0,S.jsx)("source",{src:G,type:"video/mp4"}),(0,S.jsx)("track",{label:"English Captions",kind:"subtitles",srcLang:"en",src:"captions.vtt",default:!0}),"Your browser does not support the video tag."]}):(0,S.jsx)("img",{src:y,alt:"Exercise Library",width:"100",height:100,style:{borderRadius:"50%"}})]}),(0,S.jsx)("br",{}),(0,S.jsx)("span",{children:"Video"}),(0,S.jsx)(d.Z,{error:!0,style:{textAlign:"center"},children:ie.video&&"Video is required"})]})})]}),I?(0,S.jsx)(l.ZP,{item:!0,xs:12,mt:2,style:{textAlign:"center"},children:(0,S.jsx)(u.Z,{size:26,fullWidth:!0,style:{"margin-top":"15px"}})}):(0,S.jsx)(l.ZP,{item:!0,xs:12,mt:2,style:{textAlign:"center"},children:(0,S.jsx)(p.Z,{type:"submit",variant:"contained",color:"primary",size:"large",style:{"margin-top":"15px",textAlign:"center"},children:"Submit"})})]})})]})})})]})})}},84726:function(e,t,i){e.exports=i.p+"static/media/upload3.bba22052686782d8edb3.jpg"}}]);