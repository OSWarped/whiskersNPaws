(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[85],{6940:(e,t,a)=>{Promise.resolve().then(a.bind(a,1603))},1603:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var i=a(5155),r=a(2115),n=a(6046),d=a(8998),s=a(9561),o=a(1396),l=a(2282),c=a(3536),u=a(615),h=a(9283),p=a(6469);function v(){let[e,t]=(0,r.useState)([]),[a,v]=(0,r.useState)([]),[f,m]=(0,r.useState)([]),[g,S]=(0,r.useState)([]),[x,I]=(0,r.useState)(null),[y,b]=(0,r.useState)(null),[j,A]=(0,r.useState)([]),[O,k]=(0,r.useState)([]),[D,w]=(0,r.useState)(!1),[C,P]=(0,r.useState)(null),[N,B]=(0,r.useState)([]),E=(0,n.useRouter)();return(0,r.useEffect)(()=>{(async()=>{try{let e=localStorage.getItem("jwt");if(!e)throw Error("Authorization token not found");let[a,i,r,n]=await Promise.all([fetch("/api/services"),fetch("/api/addons"),fetch("/api/pets/me",{headers:{Authorization:"Bearer ".concat(e)}}),fetch("/api/reservations",{headers:{Authorization:"Bearer ".concat(e)}})]);if(!a.ok||!i.ok||!r.ok||!n.ok)throw Error("Failed to fetch one or more resources");let[d,s,o,l]=await Promise.all([a.json(),i.json(),r.json(),n.json()]);v(d),m(s),S(o);let c=l.map(e=>{let t=e.details.find(e=>e.serviceId),a=e.details.filter(e=>e.addOnId);return{date:new Date(e.date).toISOString(),service:(null==t?void 0:t.serviceId)||"",addOns:a.map(e=>{var t;return(null===(t=e.addOnId)||void 0===t?void 0:t.toString())||""}),pets:e.pets.map(e=>({id:e.id,name:e.name,type:e.type,breed:e.breed||"",specialNeeds:e.specialNeeds||""})),totalCost:e.totalCost,details:e.details.map(e=>({id:e.id,reservationId:e.reservationId,serviceId:e.serviceId||"",addOnId:e.addOnId||null,price:e.price,quantity:e.quantity}))}}).filter(e=>null!==e);B(c),t(c)}catch(e){console.error("Error fetching resources:",e),P("Unable to load resources. Please try again.")}})()},[]),(0,i.jsxs)(d.A,{sx:{p:4},children:[(0,i.jsx)(s.A,{variant:"h4",align:"center",gutterBottom:!0,children:"Book Your Pet Sitting Dates"}),C&&(0,i.jsx)(o.A,{severity:"error",children:C}),(0,i.jsx)(p.Ay,{onClickDay:t=>{I(t);let a=e.find(e=>new Date(e.date).toDateString()===t.toDateString());if(a){var i;let e=(null===(i=a.details.find(e=>e.serviceId))||void 0===i?void 0:i.serviceId)||null,t=a.details.filter(e=>e.addOnId).map(e=>e.addOnId);b(e),A(t),k(a.pets.map(e=>e.id))}else b(null),A([]),k([]);P(t>=new Date?null:"Past reservations cannot be edited."),w(!0)},tileClassName:t=>{let{date:a}=t;return e.find(e=>new Date(e.date).toDateString()===a.toDateString())?a<new Date?"past-reservation":"future-reservation":""},calendarType:"gregory"}),(0,i.jsx)(l.A,{variant:"contained",color:"primary",sx:{mt:4},onClick:()=>{let t=e.filter(e=>!N.some(t=>t.date===e.date&&t.service===e.service&&JSON.stringify(t.addOns)===JSON.stringify(e.addOns)&&JSON.stringify(t.pets)===JSON.stringify(e.pets)));if(0===t.length){P("No new reservations to check out.");return}localStorage.setItem("bookings",JSON.stringify(t)),E.push("/checkout")},disabled:0===e.length,children:"Checkout"}),(0,i.jsx)(c.A,{open:D,onClose:()=>w(!1),children:(0,i.jsxs)(d.A,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",p:4,borderRadius:2,width:400,boxShadow:24},children:[(0,i.jsxs)(s.A,{variant:"h6",gutterBottom:!0,children:["Reservation Details for ",null==x?void 0:x.toDateString()]}),(0,i.jsx)(s.A,{variant:"h6",gutterBottom:!0,children:"Selected Service"}),a.map(e=>(0,i.jsx)(u.A,{control:(0,i.jsx)(h.A,{checked:y===e.id,onChange:()=>b(e.id),disabled:!!(x&&x<new Date)}),label:"".concat(e.name," ($").concat(e.basePricePerDay.toFixed(2),")")},e.id)),(0,i.jsx)(s.A,{variant:"h6",gutterBottom:!0,sx:{mt:3},children:"Selected Add-Ons"}),f.map(e=>(0,i.jsx)(u.A,{control:(0,i.jsx)(h.A,{checked:j.includes(e.id),onChange:()=>A(t=>t.includes(e.id)?t.filter(t=>t!==e.id):[...t,e.id]),disabled:!!(x&&x<new Date)}),label:"".concat(e.name," ($").concat(e.price.toFixed(2),")")},e.id)),(0,i.jsx)(s.A,{variant:"h6",gutterBottom:!0,sx:{mt:3},children:"Selected Pets"}),g.map(e=>(0,i.jsx)(u.A,{control:(0,i.jsx)(h.A,{checked:O.includes(e.id),onChange:()=>k(t=>t.includes(e.id)?t.filter(t=>t!==e.id):[...t,e.id]),disabled:!!(x&&x<new Date)}),label:e.name},e.id)),x&&x>=new Date&&(0,i.jsx)(l.A,{variant:"contained",color:"primary",sx:{mt:2},onClick:()=>{if(!x||!y||0===O.length){P("Please select a service and at least one pet.");return}let e=a.find(e=>e.id===y),i=j.reduce((e,t)=>{let a=f.find(e=>e.id===t);return e+((null==a?void 0:a.price)||0)},0),r=((null==e?void 0:e.basePricePerDay)||0)+i,n=[{id:Math.random(),reservationId:0,serviceId:y,addOnId:null,price:(null==e?void 0:e.basePricePerDay)||0,quantity:1},...j.map(e=>{let t=f.find(t=>t.id===e);return{id:Math.random(),reservationId:0,serviceId:"",addOnId:e,price:(null==t?void 0:t.price)||0,quantity:1}})],d={date:x.toISOString(),service:y,addOns:j,pets:O.map(e=>g.find(t=>t.id===e)),totalCost:r,details:n};t(e=>{let t=e.findIndex(e=>new Date(e.date).toISOString()===d.date);if(-1!==t){let a=[...e];return a[t]=d,a}return[...e,d]}),w(!1),P(null)},children:"Save Changes"})]})})]})}a(6769),a(1485)},1485:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[0,171,380,282,269,536,645,403,441,517,358],()=>t(6940)),_N_E=e.O()}]);