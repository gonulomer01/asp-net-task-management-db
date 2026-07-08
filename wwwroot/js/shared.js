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
        btn_home: "Ana Menü",
        btn_cats: "Kategorileri Yönet",
        btn_users: "Personelleri Yönet",
        btn_depts: "Departmanları Yönet",
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
        action_complete_upload: "Dosya Yükle ve Teslim Et",
        action_score_btn: "Puanla",
        score_placeholder: "1-100 Puan",
        toggle_theme: "Temayı Değiştir",
        toggle_lang: "Dili Değiştir (TR/EN)",
        task_assignee: "Sorumlu Personel",
        task_creator: "Görevi Tanımlayan",
        task_category: "Görev Kategorisi",
        task_timeline: "Geçerlilik Süreci",
        task_score: "Değerlendirme Notu",
        task_note: "Personel Tamamlama Notu",
        profile_header: "KİŞİSEL PROFİL AYARLARI",
        profile_form_title: "BİLGİLERİMİ GÜNCELLE",
        users_header: "SİSTEM PERSONEL KONTROLÜ",
        users_form_title: "PERSONEL KAYDI / GÜNCELLEME",
        users_list_title: "AKTİF PERSONEL LİSTESİ",
        categories_header: "KATEGORİ KONTROL PANELİ",
        categories_form_title: "YENİ KATEGORİ EKLE",
        categories_list_title: "MEVCUT KATEGORİLER",
        departments_header: "DEPARTMAN KONTROL PANELİ",
        departments_form_title: "YENİ DEPARTMAN EKLE",
        departments_list_title: "MEVCUT DEPARTMANLAR",
        cat_name_label: "KATEGORİ ADI *",
        cat_desc_label: "AÇIKLAMA / DETAY",
        dept_name_label: "DEPARTMAN ADI *",
        text_mail: "Mail",
        text_dept: "Departman",
        text_role: "Rol",
        text_none: "Yok",
        role_admin: "Yönetici",
        role_user: "Personel",
        download_file: "Dosyayı İndir",
        download_note: "Notu İndir (TXT)",
        action_view_proof: "Kanıtı İncele (Popup)",
        task_note_placeholder: "Görev teslim/tamamlama notu yazın...",
        LAST_ADMIN_ERROR: "Sistemde kalan son yönetici silinemez! Son yöneticiyi silebilmek için lütfen önce yeni bir yönetici ekleyin.",
        DATE_RANGE_INVALID: "Bitiş tarihi, başlangıç tarihinden daha eski veya aynı olamaz! Görev atama işlemi iptal edildi.",
        BOTH_DATES_FUTURE: "İki tarih de ileri bir tarih olamaz! Görevin şu an aktif olarak başlaması gerekir.",
        BOTH_DATES_PAST: "İki tarih de geçmiş bir tarih olamaz! Görevin bitiş tarihi çoktan dolmuş.",
        DATE_YEAR_ABSURD: "Geçersiz veya absürt bir yıl girdiniz! Görev takvimi yılları 2025 ile 2035 arasında sınırlandırılmalıdır.",
        CATEGORY_IN_USE: "Bu kategoriye atanmış aktif görevler bulunmaktadır! Veri kaybını önlemek için kategori silme işlemi engellendi.",
        DEPARTMENT_IN_USE: "Bu departmana kayıtlı personel bulunmaktadır! Veri kaybını önlemek için departman silme işlemi engellendi."
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
        btn_home: "Main Menu",
        btn_cats: "Manage Categories",
        btn_users: "Manage Staff",
        btn_depts: "Manage Departments",
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
        action_complete_upload: "Upload File & Submit",
        action_score_btn: "Score",
        score_placeholder: "1-100 Score",
        toggle_theme: "Change Theme",
        toggle_lang: "Change Language (TR/EN)",
        task_assignee: "Responsible Staff",
        task_creator: "Assigned By",
        task_category: "Task Category",
        task_timeline: "Validity Timeline",
        task_score: "Evaluation Score",
        task_note: "Staff Completion Note",
        profile_header: "PERSONAL PROFILE SETTINGS",
        profile_form_title: "UPDATE MY INFORMATION",
        users_header: "SYSTEM STAFF CONTROL",
        users_form_title: "STAFF REGISTRATION / UPDATE",
        users_list_title: "ACTIVE STAFF LIST",
        categories_header: "CATEGORY CONTROL PANEL",
        categories_form_title: "ADD NEW CATEGORY",
        categories_list_title: "CURRENT CATEGORIES",
        departments_header: "DEPARTMENT CONTROL PANEL",
        departments_form_title: "ADD NEW DEPARTMENT",
        departments_list_title: "CURRENT DEPARTMENTS",
        cat_name_label: "CATEGORY NAME *",
        cat_desc_label: "DESCRIPTION / DETAIL",
        dept_name_label: "DEPARTMENT NAME *",
        text_mail: "Mail",
        text_dept: "Department",
        text_role: "Role",
        text_none: "None",
        role_admin: "Administrator",
        role_user: "Staff",
        download_file: "Download File",
        download_note: "Download Note (TXT)",
        action_view_proof: "View Proof (Popup)",
        task_note_placeholder: "Write task submission/completion note...",
        LAST_ADMIN_ERROR: "The last remaining admin cannot be deleted! To delete the last admin, please add a new admin first.",
        DATE_RANGE_INVALID: "The end date cannot be earlier than or equal to the start date! Task creation rejected.",
        BOTH_DATES_FUTURE: "Both dates cannot be in the future! The task must be active right now.",
        BOTH_DATES_PAST: "Both dates cannot be in the past! The task end date has already expired.",
        DATE_YEAR_ABSURD: "You entered an invalid or absurd year! Task calendar years must be restricted between 2025 and 2035.",
        CATEGORY_IN_USE: "There are active tasks assigned to this category! Category deletion blocked to prevent data loss.",
        DEPARTMENT_IN_USE: "There are staff members registered to this department! Department deletion blocked to prevent data loss."
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

function cleanDeptKey(dept) {
    return 'text_none';
}

function showImageModal(src) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.onclick = () => backdrop.remove();
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.onclick = (e) => e.stopPropagation();
    content.innerHTML = `
        <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        <img src="${src}" style="width:100%; height:auto; border-radius:12px; display:block; max-height:80vh; object-fit:contain;">
    `;
    backdrop.appendChild(content);
    document.body.appendChild(backdrop);
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
        } else if (path.includes('categories.html') || path.includes('users.html') || path.includes('departments.html') || path.includes('profile.html')) {
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