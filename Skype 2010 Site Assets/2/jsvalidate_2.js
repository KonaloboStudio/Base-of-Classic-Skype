function xGetElementById(id){
var D=YAHOO.util.Dom;
return D.get(id);
}
function findParentTag(el,_4){
_4=_4.toUpperCase();
while(el.parentNode&&el.tagName.toUpperCase()!="BODY"){
if(el.parentNode.tagName.toUpperCase()==_4){
return el.parentNode;
}
el=el.parentNode;
}
return null;
}
String.prototype.trim=function(){
return this.replace(/^\s*|\s*$/g,"");
};
String.prototype.ltrim=function(){
return this.replace(/^\s*/g,"");
};
String.prototype.rtrim=function(){
return this.replace(/\s*$/g,"");
};
function FIC_checkForm(e){
var _6=new Array();
var _7=true;
if(typeof (e)=="string"){
e=xGetElementById(e);
if(!e){
return true;
}
}
var _8=e;
if(!e.nodeName){
_8=(e.srcElement)?e.srcElement:e.target;
}
if(_8.nodeName.toLowerCase()!="form"){
_8=findParentTag(_8,"form");
}
var _9=_8.getElementsByTagName("input");
var _a=_8.getElementsByTagName("select");
var _b=_8.getElementsByTagName("textarea");
for(i=0;i<_9.length;i++){
if(_9[i].type.toLowerCase()!="submit"&&_9[i].type.toLowerCase()!="button"&&_9[i].type.toLowerCase()!="hidden"){
if(isVisible(_9[i])){
var _c=" "+_9[i].className.replace(/^\s*|\s*$/g,"")+" ";
_c=_c.toLowerCase();
var _d=_9[i].value.trim();
var t=_9[i].type.toLowerCase();
var _f="";
if(t=="text"||t=="password"){
var _10=FIC_checkField(_c,_9[i]);
}else{
if(t=="radio"||t=="checkbox"){
var _10=FIC_checkRadCbx(_c,_9[i],_9);
_f="-cr";
}else{
var _10=true;
}
}
if(_10){
if(t=="radio"||t=="checkbox"){
var l=findParentTag(_9[i],"label");
if(l){
removeClassName(l,"validation-failed");
addClassName(l,"validation-passed");
}
}
removeClassName(_9[i],"validation-failed"+_f);
addClassName(_9[i],"validation-passed"+_f);
}else{
if(t=="radio"||t=="checkbox"){
var l=findParentTag(_9[i],"label");
if(l){
removeClassName(l,"validation-passed");
addClassName(l,"validation-failed");
}
}
removeClassName(_9[i],"validation-passed"+_f);
addClassName(_9[i],"validation-failed"+_f);
if(_9[i].getAttribute("title")){
_6[_6.length]=_9[i].getAttribute("title");
}
_7=false;
}
}
}
}
for(i=0;i<_b.length;i++){
if(isVisible(_b[i])){
var _c=" "+_b[i].className.replace(/^\s*|\s*$/g,"")+" ";
_c=_c.toLowerCase();
var _10=FIC_checkField(_c,_b[i]);
if(_10){
removeClassName(_b[i],"validation-failed");
addClassName(_b[i],"validation-passed");
}else{
removeClassName(_b[i],"validation-passed");
addClassName(_b[i],"validation-failed");
if(_b[i].getAttribute("title")){
_6[_6.length]=_b[i].getAttribute("title");
}
_7=false;
}
}
}
for(i=0;i<_a.length;i++){
if(isVisible(_a[i])){
var _c=" "+_a[i].className.replace(/^\s*|\s*$/g,"")+" ";
_c=_c.toLowerCase();
var _10=FIC_checkSel(_c,_a[i]);
if(_10){
removeClassName(_a[i],"validation-failed-sel");
addClassName(_a[i],"validation-passed-sel");
}else{
removeClassName(_a[i],"validation-passed-sel");
addClassName(_a[i],"validation-failed-sel");
if(_a[i].getAttribute("title")){
_6[_6.length]=_a[i].getAttribute("title");
}
_7=false;
}
}
}
if(!_7){
if(_6.length>0){
//alert("We have found the following error(s):\n\n  * "+_6.join("\n  * ")+"\n\nPlease check the fields and try again");
if(typeof localErrorMessage!='undefined'){
alert(localErrorMessage);
}else {
alert('Some required values are not correct. Please check the items in red.');
}
}else{
if(typeof localErrorMessage!='undefined'){
alert(localErrorMessage);
}else {
alert('Some required values are not correct. Please check the items in red.');
}
}
YAHOO.util.Event.stopEvent(e);
}
return _7;
}
function FIC_checkField(c,e){
var _14=true;
var t=e.value.trim();
if(c.indexOf(" required ")!=-1&&t.length==0){
_14=false;
}
if(c.indexOf(" required ")!=-1){
var m=e.getAttribute("minlength");
if(m&&Math.abs(m)>0){
if(e.value.length<Math.abs(m)){
_14=false;
}
}
}
if(c.indexOf(" validate-number ")!=-1&&isNaN(t)&&t.match(/[^\d]/)){
_14=false;
}else{
if(c.indexOf(" validate-digits ")!=-1&&t.replace(/ /,"").match(/[^\d]/)){
_14=false;
}else{
if(c.indexOf(" validate-alpha ")!=-1&&!t.match(/^[a-zA-Z]+$/)){
_14=false;
}else{
if(c.indexOf(" validate-surname ")!=-1&&!t.match(/^[a-zA-Z']+$/)){
_14=false;
}else{
if(c.indexOf(" validate-alphanum ")!=-1&&t.match(/\W/)){
_14=false;
}else{
if(c.indexOf(" validate-date ")!=-1){
var d=new date(t);
if(isNaN(d)){
_14=false;
}
}else{
if(c.indexOf(" validate-email ")!=-1&&!t.match(/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/)){
_14=false;
if(c.indexOf(" required ")==-1&&t.length==0){
_14=true;
}
}else{
if(c.indexOf(" validate-url ")!=-1&&!t.match(/^(http|https|ftp):\/\/$/)&&!t.match(/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i)){
_14=false;
if(c.indexOf(" required ")==-1&&t.length==0){
_14=true;
}
}else{
if(c.indexOf(" validate-date-au ")!=-1&&!t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)){
_14=false;
}else{
if(c.indexOf(" validate-currency-dollar ")!=-1&&!t.match(/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/)){
_14=false;
}
}
}
}
}
}
}
}
}
}
var _18=c.indexOf("match");
if(_18!=-1){
_18=c.substr(_18).split("-")[1];
_18=_18.split(" ")[0];
if(xGetElementById(_18).value!=e.value){
_14=false;
}
}
return _14;
}
function FIC_checkRadCbx(c,e,f){
var _1c=true;
if(c.indexOf(" validate-one-required ")!=-1){
_1c=false;
for(var i=0;i<f.length;i++){
if(f[i].name.toLowerCase()==e.name.toLowerCase()&&f[i].checked){
_1c=true;
break;
}
}
}
return _1c;
}
function FIC_checkSel(c,e){
var _20=true;
if(e.getAttribute("multiple")||e.getAttribute("multiple")=="multiple"){
if(c.indexOf(" validate-not-empty ")!=-1){
var _21=false;
if(e.value.length>0){
_21=true;
}
if(!_21){
_20=false;
}
}
}else{
if(c.indexOf(" validate-not-first ")!=-1&&e.selectedIndex==0){
_20=false;
}else{
if(c.indexOf(" validate-not-empty ")!=-1&&e.options[e.selectedIndex].value.length==0){
_20=false;
}
}
}
return _20;
}
function addClassName(e,t){
if(typeof e=="string"){
e=xGetElementById(e);
}
var ec=" "+e.className.replace(/^\s*|\s*$/g,"")+" ";
var nc=ec;
t=t.replace(/^\s*|\s*$/g,"");
if(ec.indexOf(" "+t+" ")==-1){
nc=ec+t;
}
e.className=nc.replace(/^\s*|\s*$/g,"");
return true;
}
function removeClassName(e,t){
if(typeof e=="string"){
e=xGetElementById(e);
}
var ec=" "+e.className.replace(/^\s*|\s*$/g,"")+" ";
var nc=ec;
t=t.replace(/^\s*|\s*$/g,"");
if(ec.indexOf(" "+t+" ")!=-1){
nc=ec.replace(" "+t.replace(/^\s*|\s*$/g,"")+" "," ");
}
e.className=nc.replace(/^\s*|\s*$/g,"");
return true;
}
function attachToForms(e){
var _2b=document.getElementsByTagName("form");
for(var i=0;i<_2b.length;i++){
YAHOO.util.Event.addListener(_2b[i],"submit",FIC_checkForm);
}
}
function isVisible(e){
if(typeof e=="string"){
e=xGetElementById(e);
}
if(e.disabled){
return false;
}
while(e.nodeName.toLowerCase()!="body"&&e.style.display.toLowerCase()!="none"&&e.style.visibility.toLowerCase()!="hidden"){
e=e.parentNode;
}
if(e.nodeName.toLowerCase()=="body"){
return true;
}else{
return false;
}
}
YAHOO.util.Event.addListener(window,"load",attachToForms);

