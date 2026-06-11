<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>会议保障排期表 - 3.0多账户版</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📅</text></svg>">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <style>
        .table-container { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); background: white; }
        table { border-collapse: collapse; width: 100%; min-width: 1600px; }
        @media (min-width: 768px) { table { table-layout: fixed; min-width: 100%; } }
        thead th { background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #f3f4f6; color: #374151; font-weight: 700; padding: 16px 12px !important; font-size: 0.9rem; vertical-align: middle; }
        tbody td { border-bottom: 1px solid #f3f4f6; border-right: 1px solid #f3f4f6; padding: 12px !important; vertical-align: middle; color: #4b5563; font-size: 0.875rem; }
        .col-idx   { width: 50px; }
        .col-title { width: 22%; }
        .col-time  { width: 160px; white-space: nowrap; }
        .col-loc   { width: 100px; white-space: nowrap; }
        .col-type  { width: 90px;  white-space: nowrap; }
        .col-dept  { width: 90px;  white-space: nowrap; }
        .col-leader{ width: 9%; }
        .col-scope { width: 105px; }
        .col-owner { width: 90px;  white-space: nowrap; }
        .col-notes { width: auto; }
        .col-ops   { width: 90px; }
        .cell-content { word-break: break-all; overflow: hidden; }
        #mainContent { display: none; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn.active { background-color: #3b82f6; color: white; }
        .tab-btn:not(.active) { background-color: #f3f4f6; color: #6b7280; }
        .modal-enter { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    </style>
</head>
<body class="bg-gray-50">

<!-- ===== 登录遮罩 ===== -->
<div id="loginOverlay" class="fixed inset-0 flex items-center justify-center z-[999]">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-sky-300"></div>
    <div class="relative bg-white/85 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl w-[90%] max-w-[420px] border border-white/60 text-center modal-enter">
        <div class="text-5xl mb-4">🗓️</div>
        <h2 class="text-2xl font-black mb-1 text-gray-800">会议保障排期表</h2>
        <p class="text-gray-400 text-sm mb-6">请使用账户登录</p>
        <input type="text" id="loginUsername" placeholder="用户名" autocomplete="username"
            onkeypress="if(event.keyCode==13) doLogin()"
            class="w-full bg-white/70 border border-blue-100 p-4 rounded-2xl text-center text-base font-bold outline-none mb-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition">
        <input type="password" id="loginPassword" placeholder="密码" autocomplete="current-password"
            onkeypress="if(event.keyCode==13) doLogin()"
            class="w-full bg-white/70 border border-blue-100 p-4 rounded-2xl text-center text-base font-bold outline-none mb-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition">
        <button onclick="doLogin()" id="loginBtn"
            class="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white p-4 rounded-2xl font-bold text-lg shadow-lg transition-all">
            进入系统
        </button>
        <p id="loginError" class="text-red-500 mt-4 text-sm font-medium hidden">⚠️ 用户名或密码错误</p>
    </div>
</div>

<!-- ===== 主界面 ===== -->
<div id="mainContent" class="p-4 md:p-6">
    <div class="w-full md:w-[98%] mx-auto">

        <!-- 顶部标题栏 -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-blue-600">🗓️ 会议保障排期表</h1>
                <p class="text-gray-400 text-sm mt-1">
                    当前用户：<span id="displayUsername" class="text-blue-500 font-bold"></span>
                    <span id="adminBadge" class="hidden ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">管理员</span>
                </p>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
                <button id="userMgmtBtn" onclick="toggleUserMgmt()" class="hidden bg-orange-500 text-white px-4 py-2 rounded-xl font-bold shadow-md text-sm hover:bg-orange-600 transition">👥 用户管理</button>
                <button onclick="exportToExcel()" class="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow-md text-sm hover:bg-emerald-600 transition">📊 导出表格</button>
                <button onclick="logout()" class="text-gray-400 hover:text-red-500 text-sm font-medium transition">退出登录</button>
            </div>
        </div>

        <!-- ===== 管理员：用户管理面板 ===== -->
        <div id="userMgmtPanel" style="display:none" class="bg-white p-5 rounded-3xl shadow-sm mb-6 border border-orange-100">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-orange-600">👥 用户账户管理</h2>
                <button onclick="toggleUserMgmt()" class="text-gray-400 hover:text-gray-600 text-sm">收起 ▲</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 p-4 bg-orange-50 rounded-2xl">
                <input type="text" id="newUsername" placeholder="新用户名" class="border p-3 rounded-xl bg-white outline-none focus:border-orange-300">
                <input type="password" id="newPassword" placeholder="初始密码" class="border p-3 rounded-xl bg-white outline-none focus:border-orange-300">
                <select id="newRole" class="border p-3 rounded-xl bg-white outline-none">
                    <option value="user">普通用户</option>
                    <option value="admin">管理员</option>
                </select>
                <button onclick="createUser()" class="bg-orange-500 text-white p-3 rounded-xl font-bold hover:bg-orange-600 transition">➕ 创建用户</button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm" style="min-width:400px; table-layout:auto;">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="text-left p-3 font-bold text-gray-600 border-b">用户名</th>
                            <th class="text-center p-3 font-bold text-gray-600 border-b">角色</th>
                            <th class="text-center p-3 font-bold text-gray-600 border-b">创建时间</th>
                            <th class="text-center p-3 font-bold text-gray-600 border-b">操作</th>
                        </tr>
                    </thead>
                    <tbody id="userList"></tbody>
                </table>
            </div>
            <p id="userMgmtMsg" class="text-sm mt-3 hidden"></p>
        </div>

        <!-- ===== 新增/编辑表单 ===== -->
        <div class="bg-white p-5 rounded-3xl shadow-sm mb-6 border border-gray-100">
            <h2 class="text-lg font-bold mb-4 text-gray-700" id="formTitle">➕ 新增会议任务</h2>
            <form id="addMeetingForm" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="hidden" id="edit_id" value="">
                <input type="text" id="title" placeholder="会议名称" required class="border p-3 rounded-xl md:col-span-2 bg-gray-50 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition">
                <div class="flex flex-col md:flex-row items-center gap-2 md:col-span-2">
                    <input type="datetime-local" id="meeting_time" required class="border p-3 rounded-xl bg-gray-50 w-full outline-none focus:border-blue-300 transition">
                    <span class="text-gray-400 text-xs">至</span>
                    <input type="datetime-local" id="meeting_end_time" class="border p-3 rounded-xl bg-gray-50 w-full outline-none focus:border-blue-300 transition">
                </div>
                <select id="location" required class="border p-3 rounded-xl bg-gray-50 outline-none">
                    <option value="" disabled selected>选择地点</option>
                    <option value="会商室">会商室</option>
                    <option value="值班室">值班室</option>
                    <option value="指挥中心">指挥大厅</option>
                    <option value="西会议室">西会议室</option>
                </select>
                <select id="meeting_type" class="border p-3 rounded-xl bg-gray-50 outline-none">
                    <option value="本地会">本地会</option>
                    <option value="视频会">视频会</option>
                    <option value="调度会">调度会</option>
                    <option value="参观接待">参观接待</option>
                    <option value="突发事件">突发事件</option>
                </select>
                <input type="text" id="department" placeholder="主办科室" class="border p-3 rounded-xl bg-gray-50 outline-none focus:border-blue-300 transition">
                <select id="status" class="border p-3 rounded-xl bg-gray-50 outline-none">
                    <option value="市级">市级</option>
                    <option value="区市参加">区市参加</option>
                    <option value="区市、镇街参加">区市、镇街参加</option>
                </select>
                <input type="text" id="leader" placeholder="参会领导" class="border p-3 rounded-xl bg-gray-50 md:col-span-2 outline-none focus:border-blue-300 transition">
                <input type="text" id="notes" placeholder="保障要求、桌牌信息、备注信息" class="border p-3 rounded-xl bg-gray-50 md:col-span-2 outline-none focus:border-blue-300 transition">
                <div class="md:col-span-4 flex gap-3">
                    <button type="submit" id="submitBtn" class="flex-1 bg-blue-500 text-white p-4 rounded-xl font-black text-lg hover:bg-blue-600 shadow-lg transition-all">保存会议排期</button>
                    <button type="button" onclick="resetForm()" class="px-6 bg-gray-100 text-gray-500 p-4 rounded-xl font-bold hover:bg-gray-200 transition">取消</button>
                </div>
            </form>
        </div>

        <!-- 视图切换 Tab -->
        <div class="flex items-center gap-2 mb-3">
            <span class="text-sm font-bold text-gray-500">显示范围：</span>
            <button id="tabMine" onclick="switchTab('mine')" class="tab-btn active text-sm px-4 py-1.5 rounded-full font-bold">我的会议</button>
            <button id="tabAll" onclick="switchTab('all')" class="tab-btn hidden text-sm px-4 py-1.5 rounded-full font-bold">全部会议</button>
        </div>

        <!-- 数据表格 -->
        <div class="table-container">
            <div class="overflow-x-auto">
                <table id="meetingTableMain">
                    <thead>
                        <tr>
                            <th class="text-center col-idx">序号</th>
                            <th class="text-center col-title">会议名称</th>
                            <th class="text-center col-time">起止时间</th>
                            <th class="text-center col-loc">地点</th>
                            <th class="text-center col-type">类型</th>
                            <th class="text-center col-dept">主办科室</th>
                            <th class="text-center col-leader">参会领导</th>
                            <th class="text-center col-scope">参会范围</th>
                            <th id="ownerColHeader" class="text-center col-owner hidden no-export">创建人</th>
                            <th class="text-left col-notes">保障备注</th>
                            <th class="text-center col-ops no-export">操作</th>
                        </tr>
                    </thead>
                    <tbody id="meetingList">
                        <tr><td colspan="10" class="text-center py-12 text-gray-300 text-lg">正在加载...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>

<script>
// ============================================================
// 全局状态
// ============================================================
let meetingDataList = [];
let currentTab = 'mine';

let authToken    = sessionStorage.getItem('mt_token')    || '';
let authUsername = sessionStorage.getItem('mt_username') || '';
let authRole     = sessionStorage.getItem('mt_role')     || '';

// ============================================================
// 初始化
// ============================================================
window.onload = () => {
    if (authToken && authUsername) showSystem();
};

// ============================================================
// 登录
// ============================================================
async function doLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn      = document.getElementById('loginBtn');
    const errEl    = document.getElementById('loginError');

    if (!username || !password) {
        errEl.textContent = '⚠️ 请填写用户名和密码';
        errEl.classList.remove('hidden');
        return;
    }
    btn.textContent = '验证中...';
    btn.disabled = true;
    errEl.classList.add('hidden');

    try {
        const res  = await fetch('/api/meetings/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            authToken    = data.token;
            authUsername = data.username;
            authRole     = data.role;
            sessionStorage.setItem('mt_token',    authToken);
            sessionStorage.setItem('mt_username', authUsername);
            sessionStorage.setItem('mt_role',     authRole);
            showSystem();
        } else {
            errEl.textContent = '⚠️ ' + (data.error || '用户名或密码错误');
            errEl.classList.remove('hidden');
        }
    } catch (e) {
        errEl.textContent = '⚠️ 网络错误，请稍后重试';
        errEl.classList.remove('hidden');
    } finally {
        btn.textContent = '进入系统';
        btn.disabled = false;
    }
}

function showSystem() {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('displayUsername').textContent = authUsername;
    if (authRole === 'admin') {
        document.getElementById('adminBadge').classList.remove('hidden');
        document.getElementById('userMgmtBtn').classList.remove('hidden');
        document.getElementById('tabAll').classList.remove('hidden');
    }
    loadMeetings();
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

// ============================================================
// 请求头
// ============================================================
function authHeaders() {
    return {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + authToken
    };
}

// ============================================================
// 加载会议列表
// ============================================================
async function loadMeetings() {
    try {
        const url = (currentTab === 'all' && authRole === 'admin')
            ? '/api/meetings?view=all'
            : '/api/meetings';
        const res = await fetch(url, { headers: authHeaders() });
        if (res.status === 401) { logout(); return; }
        if (res.ok) {
            meetingDataList = await res.json();
            renderTable();
        }
    } catch (e) {
        document.getElementById('meetingList').innerHTML =
            '<tr><td colspan="10" class="text-center py-8 text-red-400">加载失败，请刷新重试</td></tr>';
    }
}

// ============================================================
// Tab 切换
// ============================================================
function switchTab(tab) {
    currentTab = tab;
    document.getElementById('tabMine').classList.toggle('active', tab === 'mine');
    document.getElementById('tabAll').classList.toggle('active', tab === 'all');
    const ownerHeader = document.getElementById('ownerColHeader');
    if (tab === 'all' && authRole === 'admin') {
        ownerHeader.classList.remove('hidden');
    } else {
        ownerHeader.classList.add('hidden');
    }
    loadMeetings();
}

// ============================================================
// 渲染表格
// ============================================================
function renderTable() {
    const tbody = document.getElementById('meetingList');
    tbody.innerHTML = '';
    const showOwner = currentTab === 'all' && authRole === 'admin';
    const colspan   = showOwner ? 11 : 10;

    if (!meetingDataList || meetingDataList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${colspan}" class="text-center py-16 text-gray-300 text-base">暂无会议数据，请点击上方「保存会议排期」添加</td></tr>`;
        return;
    }

    const today = new Date().setHours(0,0,0,0);
    const typeColorMap = {
        '本地会':  'bg-blue-50 text-blue-700 border-blue-200',
        '视频会':  'bg-purple-50 text-purple-700 border-purple-200',
        '调度会':  'bg-orange-50 text-orange-700 border-orange-200',
        '参观接待':'bg-emerald-50 text-emerald-700 border-emerald-200',
        '突发事件':'bg-red-50 text-red-700 border-red-200'
    };

    const sorted = [...meetingDataList].sort((a, b) => {
        const endA = new Date(a.meeting_end_time || a.meeting_time).getTime();
        const endB = new Date(b.meeting_end_time || b.meeting_time).getTime();
        const aA = endA >= today, bA = endB >= today;
        if (aA && !bA) return -1;
        if (!aA && bA) return 1;
        if (aA && bA) return new Date(a.meeting_time) - new Date(b.meeting_time);
        return endB - endA;
    });

    sorted.forEach((m, idx) => {
        const isFuture   = new Date(m.meeting_end_time || m.meeting_time).getTime() >= today;
        const rowClass   = isFuture ? 'bg-pink-50 border-l-4 border-l-pink-400' : 'opacity-60 bg-white';
        const fontWeight = isFuture ? 'font-bold' : 'font-normal';
        const textColor  = isFuture ? 'text-gray-800' : 'text-gray-400';
        const typeStyle  = typeColorMap[m.meeting_type] || 'bg-gray-50 text-gray-700 border-gray-200';

        let timeDisplay = `<div class="text-blue-600 text-sm whitespace-nowrap">起: ${(m.meeting_time||'').replace('T',' ')}</div>`;
        if (m.meeting_end_time) {
            timeDisplay += `<div class="text-red-500 text-sm whitespace-nowrap">止: ${m.meeting_end_time.replace('T',' ')}</div>`;
        }

        const canEdit = authRole === 'admin' || m.owner_username === authUsername;
        const opBtns  = canEdit
            ? `<button onclick="editMeeting(${m.id})" class="text-blue-500 underline text-xs mr-2">修改</button><button onclick="deleteMeeting(${m.id})" class="text-red-400 underline text-xs">删除</button>`
            : `<span class="text-gray-300 text-xs">无权限</span>`;

        const ownerCell = showOwner
            ? `<td class="text-center text-xs no-export"><span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">${esc(m.owner_username||'-')}</span></td>`
            : '';

        const scopeColor = (m.status||'').includes('镇街') ? 'text-red-600' : (m.status||'').includes('区市') ? 'text-blue-600' : 'text-gray-400';

        tbody.innerHTML += `
            <tr class="${rowClass} hover:bg-pink-100/30 transition-colors">
                <td class="text-center ${textColor}">${idx+1}</td>
                <td class="text-center ${fontWeight} cell-content ${textColor}">${esc(m.title)}</td>
                <td class="text-left px-2 whitespace-nowrap">${timeDisplay}</td>
                <td class="text-center whitespace-nowrap ${textColor}">${esc(m.location)}</td>
                <td class="text-center whitespace-nowrap"><span class="px-2 py-0.5 rounded-full text-sm border whitespace-nowrap ${typeStyle}">${esc(m.meeting_type)}</span></td>
                <td class="text-center whitespace-nowrap ${textColor}">${esc(m.department||'-')}</td>
                <td class="text-center">${createLeaderTags(m.leader, isFuture)}</td>
                <td class="text-center text-xs font-bold ${isFuture?'':'opacity-40'} ${scopeColor}">${esc(m.status||'-')}</td>
                ${ownerCell}
                <td class="text-left col-notes cell-content ${textColor}">${esc(m.notes||'-')}</td>
                <td class="text-center no-export">${opBtns}</td>
            </tr>`;
    });
}

function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function createLeaderTags(str, isFuture) {
    if (!str || str==='-') return '-';
    const op = isFuture ? '' : 'opacity-50';
    return str.split(/[、,，\s]+/).filter(n=>n.trim()).map(name =>
        `<span class="inline-block bg-blue-50 text-gray-700 border border-blue-100 px-2 py-0.5 rounded mr-1 mb-1 text-sm font-medium ${op}">${esc(name)}</span>`
    ).join('');
}

// ============================================================
// 冲突检测
// ============================================================
function checkConflict(newData) {
    const newS = new Date(newData.meeting_time).getTime();
    const newE = newData.meeting_end_time ? new Date(newData.meeting_end_time).getTime() : (newS+3600000);
    if (newData.meeting_end_time && newE <= newS) { alert('❌ 结束时间不能早于开始时间'); return true; }
    for (const exist of meetingDataList) {
        if (newData.id && String(exist.id)===String(newData.id)) continue;
        if (exist.location === newData.location) {
            const existS = new Date(exist.meeting_time).getTime();
            const existE = exist.meeting_end_time ? new Date(exist.meeting_end_time).getTime() : (existS+3600000);
            if (newS < existE && newE > existS) {
                alert(`⚠️ 会议冲突！${newData.location}会场在该时间段已有排期：\n「${exist.title}」`);
                return true;
            }
        }
    }
    return false;
}

// ============================================================
// 提交表单
// ============================================================
document.getElementById('addMeetingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = document.getElementById('edit_id').value;
    const data = {
        id:               editId ? Number(editId) : undefined,
        title:            document.getElementById('title').value.trim(),
        meeting_time:     document.getElementById('meeting_time').value,
        meeting_end_time: document.getElementById('meeting_end_time').value || null,
        location:         document.getElementById('location').value,
        meeting_type:     document.getElementById('meeting_type').value,
        department:       document.getElementById('department').value.trim(),
        leader:           document.getElementById('leader').value.trim(),
        status:           document.getElementById('status').value,
        notes:            document.getElementById('notes').value.trim()
    };
    if (checkConflict(data)) return;

    const btn = document.getElementById('submitBtn');
    btn.textContent = '保存中...';
    btn.disabled = true;

    try {
        const url    = editId ? `/api/meetings/${editId}` : '/api/meetings';
        const method = editId ? 'PUT' : 'POST';
        const res    = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(data) });
        const result = await res.json();
        if (res.ok) { resetForm(); await loadMeetings(); }
        else         { alert('❌ 保存失败：' + (result.error || '未知错误')); }
    } catch (err) {
        alert('❌ 网络错误，请重试');
    } finally {
        btn.textContent = '保存会议排期';
        btn.disabled = false;
    }
});

// ============================================================
// 编辑
// ============================================================
function editMeeting(id) {
    const m = meetingDataList.find(i=>i.id===id);
    if (!m) return;
    if (authRole !== 'admin' && m.owner_username !== authUsername) { alert('⚠️ 您没有权限修改此会议'); return; }
    document.getElementById('edit_id').value          = m.id;
    document.getElementById('title').value            = m.title;
    document.getElementById('meeting_time').value     = m.meeting_time  || '';
    document.getElementById('meeting_end_time').value = m.meeting_end_time || '';
    document.getElementById('location').value         = m.location;
    document.getElementById('meeting_type').value     = m.meeting_type;
    document.getElementById('department').value       = m.department    || '';
    document.getElementById('leader').value           = m.leader        || '';
    document.getElementById('status').value           = m.status;
    document.getElementById('notes').value            = m.notes         || '';
    document.getElementById('formTitle').innerText    = '✏️ 修改会议记录';
    window.scrollTo({ top:0, behavior:'smooth' });
}

// ============================================================
// 删除
// ============================================================
async function deleteMeeting(id) {
    const m = meetingDataList.find(i=>i.id===id);
    if (!m) return;
    if (authRole !== 'admin' && m.owner_username !== authUsername) { alert('⚠️ 您没有权限删除此会议'); return; }
    if (!confirm(`确定删除会议「${m.title}」？此操作不可恢复。`)) return;
    try {
        const res    = await fetch(`/api/meetings/${id}`, { method:'DELETE', headers: authHeaders() });
        const result = await res.json();
        if (res.ok) await loadMeetings();
        else         alert('❌ 删除失败：' + (result.error || '无权限'));
    } catch (err) {
        alert('❌ 网络错误，请重试');
    }
}

// ============================================================
// 重置表单
// ============================================================
function resetForm() {
    document.getElementById('addMeetingForm').reset();
    document.getElementById('edit_id').value       = '';
    document.getElementById('formTitle').innerText = '➕ 新增会议任务';
}

// ============================================================
// 导出 Excel
// ============================================================
function exportToExcel() {
    XLSX.writeFile(
        XLSX.utils.table_to_book(document.getElementById('meetingTableMain')),
        `会议排期表_${authUsername}_${new Date().toLocaleDateString('zh-CN')}.xlsx`
    );
}

// ============================================================
// 用户管理（管理员专属）
// ============================================================
function toggleUserMgmt() {
    const panel   = document.getElementById('userMgmtPanel');
    const visible = panel.style.display === 'block';
    panel.style.display = visible ? 'none' : 'block';
    if (!visible) loadUsers();
}

async function loadUsers() {
    try {
        const res = await fetch('/api/meetings/users', { headers: authHeaders() });
        if (!res.ok) return;
        renderUserList(await res.json());
    } catch (e) { /* ignore */ }
}

function renderUserList(users) {
    const tbody = document.getElementById('userList');
    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-300">暂无用户</td></tr>';
        return;
    }
    tbody.innerHTML = users.map(u => `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-3 font-medium text-gray-700">${esc(u.username)}</td>
            <td class="p-3 text-center">
                <span class="px-2 py-0.5 rounded-full text-xs font-bold ${u.role==='admin'?'bg-red-100 text-red-600':'bg-blue-50 text-blue-600'}">
                    ${u.role==='admin'?'管理员':'普通用户'}
                </span>
            </td>
            <td class="p-3 text-center text-gray-400 text-xs">${(u.created_at||'').replace('T',' ').slice(0,16)}</td>
            <td class="p-3 text-center">
                ${u.username !== authUsername
                    ? `<button onclick="deleteUser(${u.id},'${esc(u.username)}')" class="text-red-400 underline text-xs hover:text-red-600">删除</button>`
                    : '<span class="text-gray-300 text-xs">（当前账户）</span>'}
            </td>
        </tr>`
    ).join('');
}

async function createUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const role     = document.getElementById('newRole').value;
    if (!username || !password) { showUserMsg('⚠️ 用户名和密码不能为空','text-red-500'); return; }
    try {
        const res  = await fetch('/api/meetings/users', {
            method: 'POST', headers: authHeaders(),
            body: JSON.stringify({ username, password, role })
        });
        const data = await res.json();
        if (res.ok) {
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
            showUserMsg('✅ 用户创建成功','text-green-600');
            loadUsers();
        } else {
            showUserMsg('❌ ' + (data.error || '创建失败'),'text-red-500');
        }
    } catch (e) { showUserMsg('❌ 网络错误','text-red-500'); }
}

async function deleteUser(id, username) {
    if (!confirm(`确定删除用户「${username}」？该用户的会议数据将保留。`)) return;
    try {
        const res = await fetch(`/api/meetings/users/${id}`, { method:'DELETE', headers: authHeaders() });
        if (res.ok) { showUserMsg('✅ 用户已删除','text-green-600'); loadUsers(); }
        else          showUserMsg('❌ 删除失败','text-red-500');
    } catch (e) { showUserMsg('❌ 网络错误','text-red-500'); }
}

function showUserMsg(text, cls) {
    const el = document.getElementById('userMgmtMsg');
    el.textContent = text;
    el.className   = `text-sm mt-3 ${cls}`;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 3000);
}
</script>
</body>
</html>
