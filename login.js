async function sign(value, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {name:"HMAC",hash:"SHA-256"}, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
}
export async function onRequestPost({request,env}) {
  const {username,password}=await request.json().catch(()=>({}));
  if (!env.ADMIN_USER || !env.ADMIN_PASSWORD || !env.SESSION_SECRET) return Response.json({error:"管理员环境变量未配置"}, {status:503});
  if (username!==env.ADMIN_USER || password!==env.ADMIN_PASSWORD) return Response.json({error:"账号或密码错误"}, {status:401});
  const exp=Date.now()+8*60*60*1000, payload=`${username}.${exp}`, token=`${payload}.${await sign(payload,env.SESSION_SECRET)}`;
  return Response.json({ok:true},{headers:{ "Set-Cookie":`admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800` }});
}
