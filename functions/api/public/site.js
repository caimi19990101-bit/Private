export async function onRequestGet({ env }) {
  try {
    const siteRow = await env.DB.prepare("SELECT value FROM settings WHERE key='site'").first();
    const rows = await env.DB.prepare("SELECT id,type,title,description,category,poster_url,video_url,language,sort_order,published FROM content WHERE published=1 ORDER BY type,sort_order").all();
    return Response.json({site: siteRow ? JSON.parse(siteRow.value) : {}, content: rows.results || []}, {headers: {"Cache-Control":"public, max-age=60"}});
  } catch (e) { return Response.json({error:"Content service unavailable"}, {status:500}); }
}
