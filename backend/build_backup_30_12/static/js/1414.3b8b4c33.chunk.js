"use strict";(self.webpackChunkfitnessapp=self.webpackChunkfitnessapp||[]).push([[1414],{91414:function(e,t,r){r.r(t);var s=r(74165),n=r(15861),o=r(29439),a=r(24083),i=r(47313),c=r(7794),u=r(31387),d=(r(88282),r(71207)),l=r(35192),p=r(58467),f=r(48104),m=r(80836),x=r(19641),h=r(47605),g=r(85281),y=r(94621),v=r.n(y),b=r(70024),Z=r(1164),k=r(46417);t.default=function(){var e=(0,i.useState)([]),t=(0,o.Z)(e,2),r=t[0],y=t[1],j=(0,i.useState)(!1),w=(0,o.Z)(j,2),A=w[0],S=w[1],R=(0,p.s0)(),C=(0,i.useState)([]),I=(0,o.Z)(C,2),P=I[0],_=I[1],N=(0,Z.ec)().userRole,z=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(!0),e.next=3,(0,a.Xm)().then((function(e){S(!1),y(e.data.info),_("".concat("http://167.71.227.102:5055","/public/recipes/"))})).catch((function(e){e.response.data.isSuccess||(401===e.response.data.status?(u.Am.error(e.response.data.message),S(!1)):console.log(e.response.data,"else"))}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){"true"===localStorage.getItem("redirectSuccess")&&(u.Am.success(localStorage.getItem("redirectMessage"),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0}),localStorage.removeItem("redirectSuccess")),z()}),[]);var B=[{name:"image",label:"Image",options:{customBodyRender:function(e){return e?(0,k.jsx)("img",{src:"".concat("http://167.71.227.102:5055/public/recipes/").concat(e),alt:e,style:{height:"50px",width:"50px",borderRadius:"50%"}}):""}}},{name:"name",label:"Name",options:{filter:!0,sort:!0}},{name:"status",label:"Status",options:{filter:!0,sort:!1,customBodyRender:function(e,t){var s=t.rowIndex,n=r[s],o=n.status,i=n._id;return(0,k.jsx)(b.Z,{checked:o,onChange:function(){if(1==N){var e={id:i,status:!o};(0,a.dt)(e,i).then((function(){u.Am.success("status changed successfully!",{key:e._id}),z()})).catch((function(){u.Am.error("something went wrong!",{key:e._id})}))}else u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")}})}}},{name:"_id",label:"Action",options:{customBodyRender:function(e){return(0,k.jsxs)("div",{children:[(0,k.jsx)(d.Z,{style:{color:"#6495ED",cursor:"pointer",border:"1px solid",borderRadius:"5px",margin:"0px 6px",fontSize:"30px",padding:"4px"},onClick:function(){if(1==N){var t=r.find((function(t){return t._id===e}));R("/recipes/manage",{state:{editdata:t,imageurl:P}})}else u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")}}),(0,k.jsx)(l.Z,{style:{color:"#FF5733",cursor:"pointer",border:"1px solid",borderRadius:"5px",margin:"0px 6px",fontSize:"30px",padding:"4px"},onClick:(0,n.Z)((0,s.Z)().mark((function t(){return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=N){t.next=7;break}return t.next=3,v()({title:"Are you sure?",text:"Are you sure that you want to delete this Essential?",icon:"warning",buttons:["No, cancel it!","Yes, I am sure!"],dangerMode:!0});case 3:t.sent&&(0,a.eI)(e).then((function(){u.Am.success("deleted successfully!",{key:e}),z()})).catch((function(){u.Am.error("something went wrong!",{key:e})})),t.next=8;break;case 7:u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.");case 8:case"end":return t.stop()}}),t)})))}),(0,k.jsx)(f.Z,{style:{color:"#237804",cursor:"pointer",border:"1px solid",borderRadius:"5px",margin:"0px 6px",lineHeight:"1.2",marginTop:"-21px"},onClick:function(){var t=r.find((function(t){return t._id===e}));R("/recipes/recipessubcat",{state:{catdata:t,imageurl:P}})},children:"Sub-Category"})]})}}}],E=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(t){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=N){e.next=8;break}return n=t.data.map((function(e){return r.find((function(t,r){return r===e.dataIndex&&t._id}))._id})),e.next=4,v()({title:"Are you sure?",text:"Are you sure that you want to delete this Essential?",icon:"warning",buttons:["No, cancel it!","Yes, I am sure!"],dangerMode:!0});case 4:e.sent&&(0,a.oe)(n).then((function(){z(),u.Am.success("Deleted successfully!",{key:n})})).catch((function(){u.Am.error("Something went wrong!",{key:n})})),e.next=9;break;case 8:u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(e){var t=e.selectedRows,r=e.data;return(0,k.jsx)("div",{children:(0,k.jsx)(m.Z,{onClick:function(){return E(t,r)},children:(0,k.jsx)(l.Z,{})})})},T={customToolbarSelect:function(e,t){return(0,k.jsx)(M,{selectedRows:e,data:t,columns:B,datatableTitle:"test"})}};return(0,k.jsx)("div",{children:(0,k.jsx)(x.ZP,{container:!0,spacing:4,children:(0,k.jsxs)(x.ZP,{item:!0,xs:12,children:[(0,k.jsx)(u.Ix,{}),(0,k.jsxs)("div",{className:"text-container",children:[(0,k.jsx)("div",{className:"left-text",children:(0,k.jsx)(h.Z,{variant:"h4",size:"sm",children:"Recipes"})}),(0,k.jsx)("div",{className:"right-text",children:(0,k.jsx)(f.Z,{variant:"contained",size:"medium",color:"primary",onClick:function(){1==N?R("/recipes/manage"):u.Am.error("Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.")},children:"Add Recipe"})})]}),A?(0,k.jsx)(x.ZP,{item:!0,xs:12,style:{textAlign:"center"},children:(0,k.jsx)(g.Z,{size:26,fullWidth:!0})}):(0,k.jsx)(c.ZP,{data:r,columns:B,options:T})]})})})}}}]);