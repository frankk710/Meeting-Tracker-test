<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>会议保障排期表 - 时间优化版</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📅</text></svg>">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <style>
        /* 1. 基础布局与阴影 */
        .table-container {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            background: white;
        }
        table { border-collapse: collapse; width: 100%; table-layout: fixed; }
        
        thead th {
            background-color: #f9fafb;
            border-bottom: 2px solid #eef2f7;
            color: #374151;
            font-weight: 700;
            padding: 12px 4px !important;
            font-size: 13px;
        }

        tbody td {
            border-bottom: 1px solid #f3f4f6;
            padding: 10px 4px !important;
            vertical-align: middle;
            color: #4b5563;
            word-wrap: break-word;
        }

        /* 2. 关键列宽控制 (固定时间列) */
        .col-id { width: 45px; }
        .col-title { width: auto; min-width: 160px; } 
        .col-time { width: 145px; } /* 固定时间列宽度 */
        .col-loc { width: 90px; }
        .col-type { width: 85px; }
        .col-dept { width: 100px; }
        .col-notes { width: 220px; } /* 限制备注，腾出空间 */
        .col-action { width: 80px; }

        /* 3. 文本处理 */
        .tag-nowrap { white-space: nowrap; display: inline-flex; }
        .notes-text { font-size: 11px !important; line-height: 1.4; color: #6b7280; }
        
        #mainContent { display: none; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    </style>
</head>
<body class="bg-gray-50 p-4 md:p-8">

    <div id="loginOverlay" class="fixed inset-0 flex items-center justify-center z-[999] overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-400"></div>
        <div class="relative bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl w-[380px] text-center">
            <h2 class="text-2xl font-black mb-6 text-gray-800">系统身份验证</h2>
            <input type="password" id="webPassInput" placeholder="请输入访问密码" onkeypress="if(event.keyCode==13) checkLogin()" class="w-full border p-4 rounded-2xl text-center mb-4 outline-none focus:ring-2 focus:ring-blue-400 transition-all">
            <button onclick="checkLogin()" class="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">进入系统</button>
            <p id="loginError" class="text-red-500 mt-4 text-sm hidden">⚠️ 密码错误</p>
        </div>
    </div>

    <div id="mainContent">
        <div class="max-w-[1600px] mx-auto">
            <div class="flex justify-between items-end mb-8">
                <div>
                    <h1 class="text-2xl font-black text-gray-800 flex items-center gap-2">📝 会议保障排期表</h1>
                    <p class="text-gray-400 text-sm mt-1">时间列已锁定宽度，分行显示开始与结束</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="exportToExcel()" class="bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-600 transition-all">导出 Excel</button>
                    <button onclick="logout()" class="text-gray-400 hover:text-red-500 text-sm font-medium">退出登录</button>
                </div>
            </div>

            <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
                <form id="addMeetingForm" class="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <input type="hidden" id="edit_id" value="">
                    
                    <input type="text" id="title" placeholder="会议名称" required class="md:col-span-4 border p-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100">
                    
                    <div class="md:col-span-5 flex items-center gap-2 bg-gray-50 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-100">
                        <div class="flex-1 flex flex-col py-1">
                            <span class="text-[9px] text-blue-500 font-bold ml-1">开始时间</span>
                            <input type="datetime-local" id="meeting_time" required class="bg-transparent text-sm outline-none">
                        </div>
                        <div class="w-[1px] h-6 bg-gray-300"></div>
                        <div class="flex-1 flex flex-col py-1">
                            <span class="text-[9px] text-pink-500 font-bold ml-1">结束时间</span>
                            <input type="datetime-local" id="meeting_end_time" required class="bg-transparent text-sm outline-none">
                        </div>
                    </div>

                    <select id="location" required class="md:col-span-3 border p-3 rounded-xl bg-gray-50 outline-none">
                        <option value="" disabled selected>选择会议地点</option>
                        <option value="会商室">会商室</option>
                        <option value="值班室">值班室</option>
                        <option value="指挥中心">指挥中心</option>
                        <option value="西会议室">西会议室</option>
                    </select>

                    <select id="meeting_type" class="md:col-span-2 border p-3 rounded-xl bg-gray-50 text-sm">
                        <option value="本地会">本地会</option>
                        <option value="视频会">视频会</option>
                        <option value="调度会">调度会</option>
                        <option value="参观接待">参观接待</option>
                    </select>

                    <input type="text" id="department" placeholder="主办科室" class="md:col-span-2 border p-3 rounded-xl bg-gray-50 text-sm">
                    <input type="text" id="leader" placeholder="参会领导" class="md:col-span-2 border p-3 rounded-xl bg-gray-50 text-sm">
                    <input type="text" id="notes" placeholder="保障要求/备注" class="md:col-span-4 border p-3 rounded-xl bg-gray-50 text-sm outline-none">
                    
                    <button type="submit" id="submitBtn" class="md:col-span-2 bg-blue-600 text-white p-3 rounded-xl font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all">保存排期</button>
                </form>
            </div>

            <div class="table-container">
                <div class="overflow-x-auto">
                    <table id="meetingTableMain">
                        <thead>
                            <tr>
                                <th class="col-id">序号</th>
                                <th class="col-title text-left pl-4">会议名称</th>
                                <th class="col-time">会议时间(起/止)</th>
                                <th class="col-loc">地点</th>
                                <th class="col-type">类型</th>
                                <th class="col-dept">科室</th>
                                <th class="col-notes text-left pl-4">备注要求</th>
                                <th class="col-action no-export">操作</th>
                            </tr>
                        </thead>
                        <tbody id="meetingList"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        let meetingDataList = [];
        let authToken = sessionStorage.getItem('meeting_access_token');

        window.onload = () => { if (authToken) showSystem(); };

        async function checkLogin() {
            const pwd = document.getElementById('webPassInput').value;
            const res = await fetch('/api/meetings', { headers: { 'X-Web-Password': pwd } });
            if (res.ok) { sessionStorage.setItem('meeting_access_token', pwd); authToken = pwd; showSystem(); }
            else { document.getElementById('loginError').classList.remove('hidden'); }
        }

        function showSystem() {
            document.getElementById('loginOverlay').classList.add('hidden');
            document.getElementById('mainContent').style.display = 'block';
            loadMeetings();
        }

        function logout() { sessionStorage.removeItem('meeting_access_token'); location.reload(); }

        async function loadMeetings() {
            try {
                const res = await fetch('/api/meetings', { headers: { 'X-Web-Password': authToken } });
                if (!res.ok) { logout(); return; }
                meetingDataList = await res.json();
                renderTable();
            } catch (e) { console.error(e); }
        }

        function renderTable() {
            const tbody = document.getElementById('meetingList');
            tbody.innerHTML = '';
            const todayStr = new Date().toISOString().split('T')[0];

            meetingDataList.forEach((m, index) => {
                const isFuture = m.meeting_time.split('T')[0] >= todayStr;
                const rowClass = isFuture ? 'bg-blue-50/50' : 'opacity-60 grayscale-[0.3]';
                
                // 时间解析与分行
                const sDate = m.meeting_time.split('T')[0];
                const sTime = m.meeting_time.split('T')[1];
                const eTime = (m.meeting_end_time || '').split('T')[1] || '--:--';

                tbody.innerHTML += `
                    <tr class="hover:bg-blue-50 transition-colors ${rowClass}">
                        <td class="text-center font-mono text-[10px] text-gray-400">${index + 1}</td>
                        <td class="col-title pl-4 py-3 font-bold text-sm text-gray-800">${m.title}</td>
                        <td class="col-time text-center">
                            <div class="text-[10px] text-gray-400 mb-1">${sDate}</div>
                            <div class="flex flex-col gap-1">
                                <div class="text-[11px] font-bold text-blue-600 flex items-center justify-center gap-1">
                                    <span class="bg-blue-100 px-1 rounded text-[9px]">始</span>${sTime}
                                </div>
                                <div class="text-[11px] font-bold text-pink-500 flex items-center justify-center gap-1">
                                    <span class="bg-pink-100 px-1 rounded text-[9px]">终</span>${eTime}
                                </div>
                            </div>
                        </td>
                        <td class="col-loc text-center text-sm font-medium text-gray-700">${m.location}</td>
                        <td class="col-type text-center">
                            <span class="tag-nowrap px-2 py-0.5 rounded-md border border-gray-200 bg-white text-[10px] font-bold italic">
                                ${m.meeting_type}
                            </span>
                        </td>
                        <td class="col-dept text-center text-xs text-gray-500">${m.department || '-'}</td>
                        <td class="col-notes pl-4 notes-text">${m.notes || '-'}</td>
                        <td class="col-action no-export text-center">
                            <div class="flex flex-col gap-1">
                                <button onclick="editMeeting(${m.id})" class="text-blue-500 hover:underline text-[11px] font-bold">修改</button>
                                <button onclick="deleteMeeting(${m.id})" class="text-red-300 hover:text-red-500 text-[11px]">删除</button>
                            </div>
                        </td>
                    </tr>`;
            });
        }

        document.getElementById('addMeetingForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const editId = document.getElementById('edit_id').value;
            const data = {
                id: editId ? Number(editId) : undefined,
                title: document.getElementById('title').value,
                meeting_time: document.getElementById('meeting_time').value,
                meeting_end_time: document.getElementById('meeting_end_time').value,
                location: document.getElementById('location').value,
                meeting_type: document.getElementById('meeting_type').value,
                department: document.getElementById('department').value,
                leader: document.getElementById('leader').value,
                notes: document.getElementById('notes').value,
                status: '市级' // 默认占位
            };
            await fetch('/api/meetings', {
                method: editId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Web-Password': authToken },
                body: JSON.stringify(data)
            });
            resetForm(); loadMeetings();
        });

        function editMeeting(id) {
            const m = meetingDataList.find(i => i.id === id);
            document.getElementById('edit_id').value = m.id;
            document.getElementById('title').value = m.title;
            document.getElementById('meeting_time').value = m.meeting_time;
            document.getElementById('meeting_end_time').value = m.meeting_end_time || '';
            document.getElementById('location').value = m.location;
            document.getElementById('meeting_type').value = m.meeting_type;
            document.getElementById('department').value = m.department;
            document.getElementById('leader').value = m.leader;
            document.getElementById('notes').value = m.notes;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        async function deleteMeeting(id) {
            const pwd = prompt("删除确认码："); if (!pwd) return;
            const res = await fetch(`/api/meetings?id=${id}`, {
                method: 'DELETE',
                headers: { 'X-Admin-Password': pwd, 'X-Web-Password': authToken }
            });
            if (res.ok) loadMeetings();
        }

        function resetForm() {
            document.getElementById('addMeetingForm').reset();
            document.getElementById('edit_id').value = '';
        }

        function exportToExcel() {
            const table = document.getElementById('meetingTableMain');
            const noExportItems = document.querySelectorAll('.no-export');
            noExportItems.forEach(el => el.style.display = 'none');
            const wb = XLSX.utils.table_to_book(table, { sheet: "会议保障" });
            noExportItems.forEach(el => el.style.display = '');
            XLSX.writeFile(wb, `会议排期表_${new Date().toLocaleDateString()}.xlsx`);
        }
    </script>
</body>
</html>
