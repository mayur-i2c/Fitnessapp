"use strict";(self.webpackChunkfitnessapp=self.webpackChunkfitnessapp||[]).push([[2116],{2116:function(e,t,r){r.r(t);var s=r(74165),n=r(15861),o=r(29439),a=r(24083),i=r(47313),c=r(7794),u=r(31387),d=(r(88282),r(71207)),l=r(35192),f=r(58467),x=r(80836),p=r(19641),m=r(47605),h=r(48104),y=r(85281),g=r(94621),b=r.n(g),v=r(70024),Z=r(1164),k=r(46417);t.default=function(){var e=(0,i.useState)([]),t=(0,o.Z)(e,2),r=t[0],g=t[1],w=(0,i.useState)(!1),j=(0,o.Z)(w,2),A=j[0],S=j[1],P=(0,f.s0)(),C=(0,i.useState)([]),I=(0,o.Z)(C,2),L=I[0],R=I[1],E=(0,Z.ec)().userRole,_=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(!0),e.next=3,(0,a.Ex)().then((function(e){S(!1),g(e.data.info),R("".concat("http://167.71.227.102:5055/public/exerciseLibrary/"))})).catch((function(e){e.response.data.isSuccess||(401===e.response.data.status?(u.Am.error(e.response.data.message),S(!1)):console.log(e.response.data,"else"))}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){"true"===localStorage.getItem("redirectSuccess")&&(u.Am.success(localStorage.getItem("redirectMessage"),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0}),localStorage.removeItem("redirectSuccess")),_()}),[]);var z=[{name:"icon",label:"Icon",options:{customBodyRender:function(e){return e?(0,k.jsx)("img",{src:"".concat("http://167.71.227.102:5055/public/exerciseLibrary/").concat(e),alt:e,style:{height:"50px",width:"50px",borderRadius:"50%"}}):""}}},{name:"title",label:"Title",options:{filter:!0,sort:!0}},{name:"status",label:"Status",options:{filter:!0,sort:!1,customBodyRender:function(e,t){var s=t.rowIndex,n=r[s],o=n.status,i=n._id;return(0,k.jsx)(v.Z,{checked:o,onChange:function(){if(1==E){var e={id:i,status:!o};(0,a.YQ)(e,i).then((function(){u.Am.success("status changed successfully!",{key:e._id}),_()})).catch((function(){u.Am.error("something went wrong!",{key:e._id})}))}else u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")}})}}},{name:"_id",label:"Action",options:{customBodyRender:function(e){return(0,k.jsxs)("div",{children:[(0,k.jsx)(d.Z,{style:{color:"#6495ED",cursor:"pointer",border:"1px solid",borderRadius:"5px",margin:"0px 6px",fontSize:"30px",padding:"4px"},onClick:function(){if(1==E){var t=r.find((function(t){return t._id===e}));P("/exeLibrary/manage",{state:{editdata:t,imageurl:L}})}else u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")}}),(0,k.jsx)(l.Z,{style:{color:"#FF5733",cursor:"pointer",border:"1px solid",borderRadius:"5px",margin:"0px 6px",fontSize:"30px",padding:"4px"},onClick:(0,n.Z)((0,s.Z)().mark((function t(){return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=E){t.next=7;break}return t.next=3,b()({title:"Are you sure?",text:"Are you sure that you want to delete this Excercise Library?",icon:"warning",buttons:["No, cancel it!","Yes, I am sure!"],dangerMode:!0});case 3:t.sent&&(0,a.Po)(e).then((function(){u.Am.success("deleted successfully!",{key:e}),_()})).catch((function(){u.Am.error("something went wrong!",{key:e})})),t.next=8;break;case 7:u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.");case 8:case"end":return t.stop()}}),t)})))})]})}}}],N=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(t){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=E){e.next=8;break}return n=t.data.map((function(e){return r.find((function(t,r){return r===e.dataIndex&&t._id}))._id})),e.next=4,b()({title:"Are you sure?",text:"Are you sure that you want to delete this Excercise Library?",icon:"warning",buttons:["No, cancel it!","Yes, I am sure!"],dangerMode:!0});case 4:e.sent&&(0,a.it)(n).then((function(){_(),u.Am.success("Deleted successfully!",{key:n})})).catch((function(){u.Am.error("Something went wrong!",{key:n})})),e.next=9;break;case 8:u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(e){var t=e.selectedRows,r=e.data;return(0,k.jsx)("div",{children:(0,k.jsx)(x.Z,{onClick:function(){return N(t,r)},children:(0,k.jsx)(l.Z,{})})})},M={customToolbarSelect:function(e,t){return(0,k.jsx)(B,{selectedRows:e,data:t,columns:z,datatableTitle:"Excercise Library"})}};return(0,k.jsx)("div",{children:(0,k.jsx)(p.ZP,{container:!0,spacing:4,children:(0,k.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,k.jsx)(u.Ix,{}),(0,k.jsxs)("div",{className:"text-container",children:[(0,k.jsx)("div",{className:"left-text",children:(0,k.jsx)(m.Z,{variant:"h4",size:"sm",children:"Excercise Library"})}),(0,k.jsx)("div",{className:"right-text",children:(0,k.jsx)(h.Z,{variant:"contained",size:"medium",color:"primary",onClick:function(){1==E?P("/exeLibrary/manage"):u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")},children:"Add Excercise Library"})})]}),A?(0,k.jsx)(p.ZP,{item:!0,xs:12,style:{textAlign:"center"},children:(0,k.jsx)(y.Z,{size:26,fullWidth:!0})}):(0,k.jsx)(c.ZP,{data:r,columns:z,options:M})]})})})}}}]);