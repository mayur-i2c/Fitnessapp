"use strict";(self.webpackChunkfitnessapp=self.webpackChunkfitnessapp||[]).push([[1492],{21492:function(e,t,s){s.r(t);var r=s(74165),n=s(15861),o=s(29439),a=s(24083),i=s(47313),c=s(7794),u=s(31387),l=(s(88282),s(71207)),d=s(35192),f=s(58467),m=s(80836),p=s(19641),h=s(47605),x=s(48104),y=s(85281),g=s(94621),v=s.n(g),Z=s(70024),k=s(1164),b=s(46417);t.default=function(){var e=(0,i.useState)([]),t=(0,o.Z)(e,2),s=t[0],g=t[1],w=(0,i.useState)(!1),j=(0,o.Z)(w,2),A=j[0],S=j[1],R=(0,f.s0)(),P=(0,i.useState)([]),C=(0,o.Z)(P,2),I=C[0],_=C[1],z=(0,k.ec)().userRole,N=function(){var e=(0,n.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(!0),e.next=3,(0,a.Tm)().then((function(e){S(!1),g(e.data.info),_("".concat("http://167.71.227.102:5055/public/reels/"))})).catch((function(e){e.response.data.isSuccess||(401===e.response.data.status?(u.Am.error(e.response.data.message),S(!1)):console.log(e.response.data,"else"))}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){"true"===localStorage.getItem("redirectSuccess")&&(u.Am.success(localStorage.getItem("redirectMessage"),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0}),localStorage.removeItem("redirectSuccess")),N()}),[]);var B=[{name:"image",label:"Image",options:{customBodyRender:function(e){return e?(0,b.jsx)("img",{src:"".concat("http://167.71.227.102:5055/public/reels/").concat(e),alt:e,style:{height:"50px",width:"50px",borderRadius:"50%"}}):""}}},{name:"title",label:"Title",options:{filter:!0,sort:!0}},{name:"status",label:"Status",options:{filter:!0,sort:!1,customBodyRender:function(e,t){var r=t.rowIndex,n=s[r],o=n.status,i=n._id;return(0,b.jsx)(Z.Z,{checked:o,onChange:function(){if(1==z){var e={id:i,status:!o};(0,a.q9)(e,i).then((function(){u.Am.success("status changed successfully!",{key:e._id}),N()})).catch((function(){u.Am.error("something went wrong!",{key:e._id})}))}else u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")}})}}},{name:"_id",label:"Action",options:{customBodyRender:function(e){return(0,b.jsxs)("div",{children:[(0,b.jsx)(l.Z,{style:{color:"#6495ED",cursor:"pointer",border:"1px solid",borderRadius:"5px",margin:"0px 6px",fontSize:"30px",padding:"4px"},onClick:function(){if(1==z){var t=s.find((function(t){return t._id===e}));R("/reels/manage",{state:{editdata:t,imageurl:I}})}else u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")}}),(0,b.jsx)(d.Z,{style:{color:"#FF5733",cursor:"pointer",border:"1px solid",borderRadius:"5px",margin:"0px 6px",fontSize:"30px",padding:"4px"},onClick:(0,n.Z)((0,r.Z)().mark((function t(){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=z){t.next=7;break}return t.next=3,v()({title:"Are you sure?",text:"Are you sure that you want to delete this Essential?",icon:"warning",buttons:["No, cancel it!","Yes, I am sure!"],dangerMode:!0});case 3:t.sent&&(0,a.c8)(e).then((function(){u.Am.success("deleted successfully!",{key:e}),N()})).catch((function(){u.Am.error("something went wrong!",{key:e})})),t.next=8;break;case 7:u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.");case 8:case"end":return t.stop()}}),t)})))})]})}}}],E=function(){var e=(0,n.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=z){e.next=8;break}return n=t.data.map((function(e){return s.find((function(t,s){return s===e.dataIndex&&t._id}))._id})),e.next=4,v()({title:"Are you sure?",text:"Are you sure that you want to delete this Essential?",icon:"warning",buttons:["No, cancel it!","Yes, I am sure!"],dangerMode:!0});case 4:e.sent&&(0,a.OY)(n).then((function(){N(),u.Am.success("Deleted successfully!",{key:n})})).catch((function(){u.Am.error("Something went wrong!",{key:n})})),e.next=9;break;case 8:u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(e){var t=e.selectedRows,s=e.data;return(0,b.jsx)("div",{children:(0,b.jsx)(m.Z,{onClick:function(){return E(t,s)},children:(0,b.jsx)(d.Z,{})})})},M={customToolbarSelect:function(e,t){return(0,b.jsx)(T,{selectedRows:e,data:t,columns:B,datatableTitle:"Reels"})}};return(0,b.jsx)("div",{children:(0,b.jsx)(p.ZP,{container:!0,spacing:4,children:(0,b.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,b.jsx)(u.Ix,{}),(0,b.jsxs)("div",{className:"text-container",children:[(0,b.jsx)("div",{className:"left-text",children:(0,b.jsx)(h.Z,{variant:"h4",size:"sm",children:"Reels"})}),(0,b.jsx)("div",{className:"right-text",children:(0,b.jsx)(x.Z,{variant:"contained",size:"medium",color:"primary",onClick:function(){1==z?R("/reels/manage"):u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")},children:"Add Reel"})})]}),A?(0,b.jsx)(p.ZP,{item:!0,xs:12,style:{textAlign:"center"},children:(0,b.jsx)(y.Z,{size:26,fullWidth:!0})}):(0,b.jsx)(c.ZP,{data:s,columns:B,options:M})]})})})}}}]);