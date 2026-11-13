export async function onRequestPost() {
 return Response.json({ok:true},{headers:{"Set-Cookie":"admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"}});
}
