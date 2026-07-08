const dict = {
    tr: {
        site_title: "GÖREV YÖNETİM SİSTEMİ",
        username: "Kullanıcı Adı",
        password: "Şifre",
        email: "E-posta",
        department: "Departman",
        role: "Sistem Yetki Rolü",
        login_btn: "Sisteme Giriş Yap",
        register_btn: "Yeni Hesap Oluştur",
        new_here: "Sistemde yeni misiniz? ",
        has_acc: "Zaten hesabınız var mı? ",
        logout: "Oturumu Kapat",
        btn_cats: "Kategorileri Yönet",
        btn_users: "Kullanıcıları Yönet",
        btn_prof: "Profil Ayarları",
        back: "Geri Dön",
        save: "Değişiklikleri Kaydet",
        cancel: "Vazgeç",
        pending: "Beklemede",
        completed: "Tamamlandı",
        failed: "Başarısız",
        score: "Değerlendirme Puanı",
        not_scored: "Puanlanmadı",
        title_label: "Görev Başlığı",
        assignee_label: "Sorumlu Personel",
        cat_label: "Kategori Seçimi",
        start_label: "Başlangıç Tarihi",
        end_label: "Bitiş Tarihi",
        desc_label: "Açıklama / Notlar",
        action_edit: "Düzenle",
        action_delete: "Sil",
        action_complete_upload: "✓ Tamamla (Resim Yükle)",
        action_score_btn: "Puanla",
        score_placeholder: "1-100 Puan",
        toggle_theme: "Temayı Değiştir",
        toggle_lang: "Dili Değiştir (TR/EN)",
        task_assignee: "Sorumlu",
        task_creator: "Görevi Veren",
        task_category: "Kategori",
        task_timeline: "Süreç",
        task_score: "Değerlendirme",
        task_note: "Personel Notu"
    },
    en: {
        site_title: "TASK MANAGEMENT SYSTEM",
        username: "Username",
        password: "Password",
        email: "E-mail",
        department: "Department",
        role: "System Role",
        login_btn: "Sign In To System",
        register_btn: "Create New Account",
        new_here: "New to the system? ",
        has_acc: "Already have an account? ",
        logout: "Log Out",
        btn_cats: "Manage Categories",
        btn_users: "Manage Users",
        btn_prof: "Profile Settings",
        back: "Go Back",
        save: "Save Changes",
        cancel: "Cancel",
        pending: "Pending",
        completed: "Completed",
        failed: "Failed",
        score: "Evaluation Score",
        not_scored: "Not Scored",
        title_label: "Task Title",
        assignee_label: "Responsible Staff",
        cat_label: "Category Selection",
        start_label: "Start Date",
        end_label: "End Date",
        desc_label: "Description / Notes",
        action_edit: "Edit",
        action_delete: "Delete",
        action_complete_upload: "✓ Complete (Upload Image)",
        action_score_btn: "Score",
        score_placeholder: "1-100 Score",
        toggle_theme: "Change Theme",
        toggle_lang: "Change Language (TR/EN)",
        task_assignee: "Responsible",
        task_creator: "Creator",
        task_category: "Category",
        task_timeline: "Timeline",
        task_score: "Evaluation",
        task_note: "Staff Note"
    }
};

function getLang() {
    return localStorage.getItem('lang') || 'tr';
}

function lang(key) {
    return dict[getLang()][key] || key;
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

function toggleLang() {
    const current = getLang();
    localStorage.setItem('lang', current === 'tr' ? 'en' : 'tr');
    location.reload();
}

function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-User-Id': localStorage.getItem('userId'),
        'X-User-Role': localStorage.getItem('userRole')
    };
}

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userDept');
    window.location.href = '/login.html';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function translateStaticElements() {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (dict[getLang()][key]) {
            el.textContent = dict[getLang()][key];
        }
    });
    document.querySelectorAll('[data-placeholder-key]').forEach(el => {
        const key = el.getAttribute('data-placeholder-key');
        if (dict[getLang()][key]) {
            el.setAttribute('placeholder', dict[getLang()][key]);
        }
    });
}

function injectGlobalToolbar() {
    const html = `
        <button class="toolbar-btn" onclick="toggleTheme()">${lang('toggle_theme')}</button>
        <button class="toolbar-btn" onclick="toggleLang()">${lang('toggle_lang')}</button>
    `;
    const target = document.getElementById('headerRightActions');
    if (target) {
        target.innerHTML = html;
        const path = window.location.pathname;
        if (path.includes('index.html')) {
            target.innerHTML += `<button class="toolbar-btn abort-btn" onclick="logout()">${lang('logout')}</button>`;
        } else if (path.includes('categories.html') || path.includes('users.html') || path.includes('profile.html')) {
            target.innerHTML += `<button class="toolbar-btn" onclick="window.location.href='/index.html'">${lang('back')}</button>`;
        }
    } else {
        const div = document.createElement('div');
        div.className = 'global-toolbar';
        div.innerHTML = html;
        document.body.appendChild(div);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
    injectGlobalToolbar();
    translateStaticElements();
});