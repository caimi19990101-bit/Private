export async function onRequestGet({env}) {
 const rows=await env.DB.prepare("SELECT * FROM content ORDER BY type,sort_order").all();
 const s=await env.DB.prepare("SELECT value FROM settings WHERE key='site'").first();
 return Response.json({content:rows.results||[],site:s?JSON.parse(s.value):{}});
}
export async function onRequestPut({request,env}) {
 const x=await request.json();
 if(!x.id||!x.title||!["drama","anime"].includes(x.type))return Response.json({error:"请填写标题并选择正确类型"},{status:400});
 await env.DB.prepare(`INSERT INTO content(id,type,title,description,category,poster_url,video_url,language,sort_order,published,updated_at)
 VALUES(?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
 ON CONFLICT(id) DO UPDATE SET type=excluded.type,title=excluded.title,description=excluded.description,category=excluded.category,poster_url=excluded.poster_url,video_url=excluded.video_url,language=excluded.language,sort_order=excluded.sort_order,published=excluded.published,updated_at=CURRENT_TIMESTAMP`)
 .bind(x.id,x.type,x.title,x.description||"",x.category||"",x.poster_url||"",x.video_url||"",x.language||"en",x.sort_order||0,x.published?1:0).run();
 return Response.json({ok:true});
}
export async function onRequestDelete({request,env}) {
 const {id}=await request.json();await env.DB.prepare("DELETE FROM content WHERE id=?").bind(id).run();return Response.json({ok:true});
}
