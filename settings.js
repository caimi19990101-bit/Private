export async function onRequestPut({request,env}) {
 const data=await request.json();
 await env.DB.prepare("INSERT INTO settings(key,value,updated_at) VALUES('site',?,CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=CURRENT_TIMESTAMP").bind(JSON.stringify(data)).run();
 return Response.json({ok:true});
}
