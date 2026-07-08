# Melikgazi Belediyesi Kurumsal Görev Yönetim Sistemi

Bu proje, Melikgazi Belediyesi staj programı kapsamında geliştirilmiş, kurumsal standartlara ve modern yazılım mimarisi prensiplerine uygun bir **Görev ve Personel Takip Portalı** uygulamasıdır. Sistem, sunucu yükünü hafifleten ve gelecekteki mobil/kiosk genişlemelerine tam uyum sağlayan ayrık bir mimari felsefeyle inşa edilmiştir.

## 🏗️ Mimari Yapı ve Teknoloji Yığını

Uygulamada monolitik (bağımlı) MVC yapısı yerine, endüstri standardı olan **API-First (Decoupled) Mimari** benimsenmiştir:

- **Arka Plan (Backend):** .NET 10 Web API, Entity Framework Core, SQL Server ilişkisel veritabanı modeli. Sunucu sadece saf veri (JSON) servis eden bir RESTful mimari olarak kurgulanmıştır.
- **Ön Yüz (Frontend):** `wwwroot` dizini altında barındırılan statik HTML5, CSS Variables ve Vanilla JS (Saf JavaScript). Harici hiçbir kütüphaneye bağımlılık (Zero-Dependency) olmadan **Client-Side Rendering (İstemci Taraflı Çizim)** yapılmıştır.

## 🌟 Öne Çıkan Gelişmiş Özellikler

### 1. Kriptografik Veri Güvenliği (PBKDF2 & SHA256)
Kullanıcı şifreleri veritabanında kesinlikle düz metin (plain-text) olarak saklanmaz. Sistem, .NET'in yerel kriptografi kütüphanesini kullanarak her şifre için rastgele bir `Salt` (tuzlama) değeri üretir ve **PBKDF2 (100.000 iterasyon) + SHA256** algoritmalarıyla geri döndürülemez şekilde hash'leyerek veritabanına kaydeder.

### 2. Gelişmiş Görev Akışı ve Zaman Kısıtları (Business Logic)
- **Otomatik Zaman Aşımı Denetimi:** Beklemede (`Pending`) olan görevlerin bitiş tarihi şimdiki zamanı geçtiğinde, backend iş mantığı katmanı durumu otomatik olarak `Başarısız` (Failed) olarak günceller.
- **Zaman Sınırlandırmalı Kanıt Yükleme:** Görevi alan personel, görevi tamamlamak için bir görsel kanıt (Resim) ve tamamlama notu girmek zorundadır. Bu işlem sadece görevin başlangıç ve bitiş tarihleri arasında yapılabilir; süre sınırları dışındaki istekler backend tarafından reddedilir.
- **Yetkili Değerlendirme Skalası:** Görevi tamamlanan personel için sadece görevi tanımlayan amir (veya Admin) **1-100 arası** bir başarı puanlaması yapabilir. Puanlama sonrasında görevin durumu kararlı şekilde `Tamamlandı` olarak korunur.

### 3. Modüler Rol ve Departman Yönetimi
Sistemde `Admin` ve `User` olmak üzere iki temel yetki rolü bulunur. Personel tanımlanırken `Ar-Ge`, `Bilgi İşlem`, `İnsan Kaynakları` ve `Yönetim` gibi departmanlar seçilebilir. Admin olmayan kullanıcılar sadece kendilerine atanan ve kendilerinin oluşturduğu görev havuzunu görebilir ve yönetebilir.

### 4. Küresel Durum Yönetimi ve Hafızalı Yerelleştirme
- **Persistent Theme Engine:** Kullanıcının seçtiği açık/koyu mod ayarı tarayıcı hafızasında (`localStorage`) saklanır. Sayfa geçişlerinde veya oturum kapatıldığında anlık parlama yaşatmadan pürüzsüz çalışır.
- **Session-Agnostic Localization (TR/EN):** Uygulama hem statik elemanlarda hem de veritabanından dönen dinamik kart parametrelerinde tam dil desteğine (i18n) sahiptir. Seçilen dil oturum sonlandırılsa dahi hafızada kalır.

## 🎨 Tasarım Sistemi (UI/UX)

Görsel tasarım, jüri beklentilerini karşılayacak lüks ve ağırbaşlı bir mühendislik portalı çizgisindedir:
- **Asimetrik Bölünmüş Ekran (Split-Screen):** Giriş ve kayıt ekranlarında sol tarafta belediye kurumsal amblemini barındıran akışkan bir odak alanı, sağ tarafta ise minimalist oval kapsül girdiler yer alır.
- **Yüksek Kontrast ve Göz Sağlığı:** Açık modda keskin siyah kenarlıklar ve açık mavi tonlar hakimken; koyu modda gözü yormayan derin safir/gece laciverti (`#0b1120`) arka plan ile mat slate gri (`#475569`) kenarlıklar kontrastı sağlar.
- **Modüler Kart Yapısı:** Personel ve kategoriler düz çizgiler yerine, dışa taşması engellenmiş, yerleşik esnek kutular (`data-row-card`) halinde listelenir.

## 🗄️ Veritabanı Şeması (SQL)

Uygulamanın çalışması için gerekli SQL Server tablo yapısı şu şekildedir:

```sql
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'User',
    department VARCHAR(50) NOT NULL DEFAULT 'Genel',
    email VARCHAR(100) NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE()
);

CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description NVARCHAR(MAX) NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE()
);

CREATE TABLE tasks (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description NVARCHAR(MAX) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    user_id INT NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    category_id INT NULL FOREIGN KEY REFERENCES categories(id) ON DELETE SET NULL,
    start_date DATETIME2 NOT NULL DEFAULT GETDATE(),
    end_date DATETIME2 NOT NULL DEFAULT GETDATE(),
    completed_image_path NVARCHAR(MAX) NULL,
    completion_note NVARCHAR(MAX) NULL,
    admin_score INT NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE()
);