export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  const path = url.pathname;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  if (method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  // 解析当前登录用户（token = base64(username:password)）
  async function getCurrentUser(req) {
    const auth = req.headers.get('Authorization') || '';
    if (!auth.startsWith('Bearer ')) return null;
    try {
      const token = atob(auth.slice(7));
      const colonIdx = token.indexOf(':');
      if (colonIdx === -1) return null;
      const username = token.slice(0, colonIdx);
      const password = token.slice(colonIdx + 1);
      return await env.DB.prepare(
        'SELECT * FROM users WHERE username = ? AND password = ?'
      ).bind(username, password).first();
    } catch { return null; }
  }

  // ── 登录（无需 token）──────────────────────────────────────
  if (path === '/api/meetings/login' && method === 'POST') {
    const { username, password } = await request.json();
    if (!username || !password) return json({ error: '请输入用户名和密码' }, 400);
    const user = await env.DB.prepare(
      'SELECT id, username, role FROM users WHERE username = ? AND password = ?'
    ).bind(username, password).first();
    if (!user) return json({ error: '用户名或密码错误' }, 401);
    const token = btoa(`${username}:${password}`);
    return json({ token, username: user.username, role: user.role });
  }

  // ── 以下所有路由需要登录 ───────────────────────────────────
  const currentUser = await getCurrentUser(request);
  if (!currentUser) return json({ error: '未登录或登录已过期' }, 401);
  const isAdmin = currentUser.role === 'admin';

  // ── GET /api/meetings ──────────────────────────────────────
  if (path === '/api/meetings' && method === 'GET') {
    const viewAll = url.searchParams.get('view') === 'all' && isAdmin;
    const result = viewAll
      ? await env.DB.prepare('SELECT * FROM meetings ORDER BY meeting_time ASC').all()
      : await env.DB.prepare('SELECT * FROM meetings WHERE owner_username = ? ORDER BY meeting_time ASC').bind(currentUser.username).all();
    return json(result.results);
  }

  // ── POST /api/meetings ─────────────────────────────────────
  if (path === '/api/meetings' && method === 'POST') {
    const b = await request.json();
    if (!b.title || !b.meeting_time || !b.location)
      return json({ error: '标题、时间、地点为必填项' }, 400);
    const r = await env.DB.prepare(`
      INSERT INTO meetings (title,meeting_time,meeting_end_time,location,meeting_type,department,leader,status,notes,owner_username)
      VALUES (?,?,?,?,?,?,?,?,?,?)
    `).bind(b.title, b.meeting_time, b.meeting_end_time||null, b.location,
       b.meeting_type||'本地会', b.department||null, b.leader||null,
       b.status||'市级', b.notes||null, currentUser.username).run();
    return json({ id: r.meta.last_row_id, message: '创建成功' });
  }

  // ── PUT /api/meetings/:id ──────────────────────────────────
  const idMatch = path.match(/^\/api\/meetings\/(\d+)$/);
  if (idMatch && method === 'PUT') {
    const id = idMatch[1];
    const meeting = await env.DB.prepare('SELECT * FROM meetings WHERE id=?').bind(id).first();
    if (!meeting) return json({ error: '会议不存在' }, 404);
    if (!isAdmin && meeting.owner_username !== currentUser.username)
      return json({ error: '无权修改他人的会议' }, 403);
    const b = await request.json();
    await env.DB.prepare(`
      UPDATE meetings SET title=?,meeting_time=?,meeting_end_time=?,location=?,meeting_type=?,department=?,leader=?,status=?,notes=? WHERE id=?
    `).bind(b.title, b.meeting_time, b.meeting_end_time||null, b.location,
       b.meeting_type, b.department||null, b.leader||null, b.status, b.notes||null, id).run();
    return json({ message: '修改成功' });
  }

  // ── DELETE /api/meetings/:id ───────────────────────────────
  if (idMatch && method === 'DELETE') {
    const id = idMatch[1];
    const meeting = await env.DB.prepare('SELECT * FROM meetings WHERE id=?').bind(id).first();
    if (!meeting) return json({ error: '会议不存在' }, 404);
    if (!isAdmin && meeting.owner_username !== currentUser.username)
      return json({ error: '无权删除他人的会议' }, 403);
    await env.DB.prepare('DELETE FROM meetings WHERE id=?').bind(id).run();
    return json({ message: '删除成功' });
  }

  // ── 用户管理（管理员专用）─────────────────────────────────
  if (path === '/api/meetings/users' && method === 'GET' && isAdmin) {
    const r = await env.DB.prepare('SELECT id,username,role,created_at FROM users ORDER BY id').all();
    return json(r.results);
  }

  if (path === '/api/meetings/users' && method === 'POST' && isAdmin) {
    const { username, password, role } = await request.json();
    if (!username || !password) return json({ error: '用户名和密码必填' }, 400);
    try {
      await env.DB.prepare('INSERT INTO users (username,password,role) VALUES (?,?,?)')
        .bind(username, password, role||'user').run();
      return json({ message: '用户创建成功' });
    } catch { return json({ error: '用户名已存在' }, 409); }
  }

  const userIdMatch = path.match(/^\/api\/meetings\/users\/(\d+)$/);
  if (userIdMatch && method === 'DELETE' && isAdmin) {
    await env.DB.prepare('DELETE FROM users WHERE id=?').bind(userIdMatch[1]).run();
    return json({ message: '用户已删除' });
  }

  return json({ error: '接口不存在' }, 404);
}
