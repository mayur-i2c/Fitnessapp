"use strict";(self.webpackChunkfitnessapp=self.webpackChunkfitnessapp||[]).push([[5582],{85582:function(e,n,t){t.r(n);var s=t(74165),r=t(15861),i=t(29439),a=t(47313),c=t(19641),o=t(47605),d=t(32530),u=t(85345),l=t(85281),p=t(48104),x=t(42832),h=t(75627),m=t(24083),f=t(31387),j=(t(88282),t(80472)),g=t(16),Z=t.n(g),y=(t(94230),t(1164)),v=t(46417);n.default=function(){var e=(0,a.useState)(!1),n=(0,i.Z)(e,2),t=n[0],g=n[1],S=(0,a.useState)(!0),P=(0,i.Z)(S,2),b=P[0],A=P[1],w=(0,a.useState)(!0),C=(0,i.Z)(w,2),k=C[0],I=C[1],F=(0,y.ec)().userRole,U=(0,h.cI)(),V=U.handleSubmit,W=U.setValue,z=U.getValues,E=U.control,L=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,m.fF)().then((function(e){W("description",e.data.info[0].description),I(e.data.info[0]._id),A(!1)})).catch((function(){A(!1)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,a.useEffect)((function(){L()}),[W,z]);return(0,v.jsx)(c.ZP,{container:!0,rowSpacing:4.5,columnSpacing:2.75,children:(0,v.jsxs)(c.ZP,{item:!0,xs:12,md:6,lg:6,children:[(0,v.jsxs)(c.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",children:[(0,v.jsx)(c.ZP,{item:!0,children:(0,v.jsx)(o.Z,{variant:"h5",children:"Terms & Conditions"})}),(0,v.jsx)(c.ZP,{item:!0})]}),(0,v.jsx)(j.Z,{sx:{mt:2},content:!1,children:(0,v.jsx)(x.Z,{spacing:3,children:(0,v.jsxs)(c.ZP,{xs:12,sx:{p:3},children:[(0,v.jsx)(f.Ix,{}),(0,v.jsx)("form",{onSubmit:V((function(e){1==F?(g(!0),(0,m.nU)(e,k).then((function(e){e.data.isSuccess&&200===e.data.status?(g(!1),f.Am.success("Updated successfully!")):(e.data.status,e.data.isSuccess||(f.Am.error(e.data.message),g(!1)))})).catch((function(e){f.Am.error(e.response.data),e.response.data.isSuccess?(f.Am.error("Something Went Wrong!"),g(!1)):400===e.response.data.status?(f.Am.error(e.response.data.message),g(!1)):(f.Am.error("Something is wrong in an input."),g(!1))}))):f.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")})),children:b?(0,v.jsx)("p",{children:"Loading..."}):(0,v.jsxs)("div",{children:[(0,v.jsx)(d.Z,{mb:2,children:(0,v.jsx)(o.Z,{color:"#FF0000"})}),(0,v.jsx)(f.Ix,{}),(0,v.jsx)(c.ZP,{item:!0,xs:12,md:3,style:{display:"contents"},children:(0,v.jsx)(h.Qr,{name:"description",control:E,defaultValue:z("description"),render:function(e){var n=e.field;return(0,v.jsx)(u.Z,{variant:"outlined",style:{margin:"15px",padding:"8px"},children:(0,v.jsx)(Z(),{value:n.value||"",onChange:n.onChange,style:{height:"400px",border:"none"}})})}})}),(0,v.jsx)("div",{children:t?(0,v.jsx)(c.ZP,{item:!0,xs:12,mt:2,style:{textAlign:"center"},children:(0,v.jsx)(l.Z,{size:26,fullWidth:!0,style:{"margin-top":"40px",float:"right"}})}):(0,v.jsx)(p.Z,{type:"submit",variant:"contained",color:"primary",size:"large",style:{"margin-top":"40px",float:"right"},children:"Update"})})]})})]})})})]})})}}}]);