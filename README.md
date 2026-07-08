# 🏛️ Melikgazi Belediyesi - Görev Yönetim Sistemi (Task Management System)

Bu proje, Melikgazi Belediyesi kurumsal kimliği ve ihtiyaçları doğrultusunda geliştirilmiş, rol bazlı yetkilendirme (RBAC), dinamik veri doğrulama kalkanları ve tam yerelleştirme (TR/EN) desteği barındıran kurumsal seviyede bir Görev Takip ve Yönetim Portalıdır (Enterprise SaaS Dashboard).

---

## 🛠️ Teknik Mimari & Teknolojik Yığın (Tech Stack)

### Arka Plan (Backend Katmanı)
*   **Mimarî Yapı:** .NET 10.0 Web API (RESTful Architecture)
*   **Veritabanı Katmanı:** Microsoft SQL Server (MSSQL)
*   **ORM Motoru:** Entity Framework Core (EF Core) - Code First & Fluent API Kontrolleri
*   **Güvenlik:** PBKDF2 (SHA256) Algoritması ile 100.000 iterasyonlu Tuzlanmış (Salting) Kriptografik Şifre Hasher

### Ön Yüz (Frontend Katmanı)
*   **Arayüz Tasarımı:** Kurumsal SaaS Standartlarında Pürüzsüz UI/UX (Microsoft Azure / Tailwind Esintili)
*   **Tema Motoru:** Dahili CSS Değişkenleri (CSS Variables) ile Senkronize Çalışan Göz Yormayan Açık / Koyu Mod (Light & Dark Theme)
*   **Dil Motoru:** İstemci Taraflı Asenkron Çok Dilli Dönüşüm Motoru (i18n Localization Engine - TR / EN)

---

## 🚀 Öne Çıkan Gelişmiş Özellikler & İş Kuralları (Business Rules)

### 1. Katı İlişkisel Veri Koruma Kalkanı (Cascade Protection)
*   **Görev Havuzu Emniyeti:** Herhangi bir aktif görev atamasına ev sahipliği yapan bir **Görev Kategorisi** sistemden silinmeye çalışıldığında backend veri koruma motoru işlemi durdurur ve veri kaybını önlemek adına silme isteğini reddeder.
*   **Personel Kadrosu Emniyeti:** Bir veya birden fazla personele atanmış olan kurumsal bir **Departman**, alt yönetim panelinden silinmeye çalışıldığında ilişkisel bütünlük denetlenir ve silme işlemi engellenerek kullanıcıya şık bir uyarı fırlatılır.

### 2. Siber Güvenlik & DOM Sızıntısı Önleme (Data Leak Fix)
*   **Şifre Hash Koruması:** Tarayıcıların "İncele" (Inspect Element) panellerinden veya JavaScript bellek modellerinden kullanıcı şifrelerinin siber saldırganlarca okunabilme riski kökten kapatılmıştır. Personel listeleme API servislerinde şifre alanları daha sunucudan çıkmadan tamamen temizlenir.
*   **Kör Düzenleme (Blind Password Update):** Bir personel düzenlenirken şifre kutusu tamamen boş gelir. Eğer yeni şifre yazılmazsa mevcut kriptolu şifre aynen korunur; yeni şifre yazılırsa otomatik olarak yeniden tuzlanıp hash'lenerek SQL Server'a gönderilir.
*   **Son Yönetici Koruması:** Sistemde kayıtlı olan son `Admin` (Yönetici) hesabının silinmesi, portalın sahipsiz kalmasını engellemek adına veritabanı seviyesinde bloke edilmiştir.

### 3. Çok Yönlü Dosya / Kanıt Teslim Mekanizması
*   **Akıllı TXT Okuyucu:** Personeller görevi tamamlarken metin alanına elle not yazabilecekleri gibi, sağ tarafta bulunan `+ TXT` butonuna basarak seçtikleri yerel `.txt` dosyasının içeriğini asenkron olarak metin kutusuna otomatik okutabilirler.
*   **İki Kanallı Bağımsız İndirme:** Görevi tanımlayan amir, personelin yüklediği ana kanıt dökümanını (Resim, PDF vb.) tek tıkla tarayıcı indirme tepsisini tetikleyerek indirebileceği gibi, personelin yazdığı tamamlama notunu da bağımsız bir butonla `.txt` formatında bilgisayarına indirebilir.
*   **Popup İnceleme Modalı:** Yüklenen kanıt resimleri yeni sekmede açılmak yerine, sayfa içi entegre modal popup katmanında gözü yormadan incelenebilir.

### 4. Zaman Sınırı ve Absürt Tarih Filtresi
*   **Yıl Sınırlandırması:** Tarih giriş alanlarında 5 veya 6 haneli absürt yılların girilmesi (Örn: 9999 yılı) hem istemci hem sunucu taraflı engellenmiştir. Proje takvimi yılları **2025 - 2035** arasında sınırlandırılmıştır.
*   **Mantıksal Tarih Sıralaması:** Bitiş tarihinin başlangıç tarihinden geride olması, iki tarihin de tamamen gelecekte veya tamamen geçmişte olması gibi mantık hatalarında görev ataması durdurulur ve görev hiç oluşturulmaz.

---

## 📁 Dosya Yapısı & Veri Akış Haritası

```text
TaskManagementAPI/
│
├── Controllers/
│   ├── AuthController.cs        # Giriş ve kayıt işlemlerini yöneten kapı
│   ├── UsersController.cs       # Şifre sızıntısı korumalı personel CRUD API'si
│   ├── CategoriesController.cs  # İlişkisel görev kontrollü kategori API'si
│   ├── DepartmentsController.cs # SQL Server bağlantılı departman CRUD API'si
│   └── TasksController.cs       # Tarih filtreli ve dosya yönetimli görev iş motoru
│
├── Models/
│   ├── User.cs                  # Kullanıcı veritabanı veri modeli
│   ├── Category.cs              # Kategori veritabanı veri modeli
│   ├── Department.cs            # Departman veritabanı veri modeli
│   └── TaskItem.cs              # Görev veritabanı veri modeli
│
├── Data/
│   └── AppDbContext.cs          # SQL Server Fluent API şema eşleştirme merkezi
│
└── wwwroot/                     # Ön yüz statik dökümanlar katmanı
    ├── css/style.css            # 8px kurumsal SaaS kavisli Açık/Koyu mod tasarım kodları
    ├── js/shared.js             # İki dilli (i18n) sözlük ve merkezi popup motoru
    ├── index.html               # Görev yönetim ana komuta merkezi
    ├── users.html               # Navigasyon gizlemeli personel kontrol paneli
    ├── departments.html         # Dinamik kurumsal departman yönetim paneli
    ├── categories.html          # Kategori ekleme ve düzenleme alanı
    └── login.html               # Bölünmüş şablon (Split-layout) giriş ekranı