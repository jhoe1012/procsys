import{r as a,j as r}from"./app-DrKxL2JF.js";import{d as t}from"./index-BhwgxNds.js";function i({item_details:e}){const[o,l]=a.useState(e),s=[{...t.keyColumn("doc",t.textColumn),title:"Document",disabled:!0},{...t.keyColumn("itm",t.textColumn),title:"Item",disabled:!0},{...t.keyColumn("sts",t.textColumn),title:"Status",disabled:!0},{...t.keyColumn("qty",t.textColumn),title:"Quantity",disabled:!0},{...t.keyColumn("unit",t.textColumn),title:"Unit",disabled:!0}],u={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"};return r.jsx(t.DataSheetGrid,{value:o,onChange:l,columns:s,style:u,disableContextMenu:!0,lockRows:!0,rowHeight:30,className:"text-sm"})}export{i as default};
