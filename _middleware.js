async function verify(token, secret) {
  if(!token||!secret)return false;
  const parts=token.split(".");if(parts.length!==3)return false;
  const [user,exp,sig]=parts; if(Number(exp)<Date.now())return false;
  const payload=`${user}.${exp}`;
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const raw=await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(payload));
  const expected=btoa(String.fromCharCode(...new Uint8Array(raw))).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
  return sig===expected;
}
export async function onRequest({request,env,next}) {
  const url=new URL(request.url);
  if(url.pathname.endsWith("/login")||url.pathname.endsWith("/logout"))return next();
  const cookie=request.headers.get("Cookie")||"";
  const token=cookie.match(/(?:^|; )admin_session=([^;]+)/)?.[1];
  if(!(await verify(token,env.SESSION_SECRET)))return Response.json({error:"请先登录"}, {status:401});
  return next();
}
