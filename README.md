# Güvenli ve İlişkisel Görev Yönetim Paneli

Bu proje, ASP.NET Core Web API ve Microsoft SQL Server mimarisi üzerine inşa edilmiş, Rol Tabanlı Yetkilendirme (RBAC), Çoklu Sayfa (Multi-page) ayrımı ve gelişmiş siber güvenlik (SQL Injection & XSS) standartlarına sahip görev yönetim sistemidir.

## Proje Mimarisi ve Dosya Yapısı

Uygulama, ön yüz ve arka yüz bileşenlerinin tamamen ayrıldığı (Decoupled) bir yapıda geliştirilmiştir:
- **Backend:** ASP.NET Core Web API ve Entity Framework Core ilişkisel veri eşleştirmesi.
- **Frontend:** wwwroot klasörü altında yapılandırılmış, birbirine doğrudan erişimi engellenmiş müstakil HTML ve JavaScript modülleri (index.html, login.html, register.html, users.html, categories.html, profile.html).
- **Veritabanı:** SQL Server üzerinde `users`, `categories` ve `tasks` tabloları arasında Foreign Key kısıtlamaları ile kurulmuş ilişkisel yapı.

## Güvenlik Analizi ve Alınan Önlemler

### 1. Kimlik Doğrulama ve Rol Tabanlı Yetkilendirme (Authentication & RBAC)
- **Doğrudan Bağlantı Engeli (Auth Guard):** Sayfaların en tepesine yerleştirilen JavaScript kontrol blokları sayesinde, sisteme giriş yapmamış kullanıcıların URL yazarak içeri sızması tarayıcı düzeyinde kesin olarak engellenmiştir.
- **Dinamik Yetkilendirme Paneli:** `User` rolündeki standart kullanıcılar sisteme giriş yaptığında kullanıcı ekleme ve kategori yönetimi butonları DOM üzerinden kaldırılır. Kullanıcılar yalnızca kendilerine atanan görevleri görebilir ve yalnızca kendileri adına görev ekleyebilirler. `Admin` rolü ise tüm alt yönetim panellerine tam erişim ve rol değiştirme hakkına sahiptir.
- **Kayıt Güvenliği:** Yeni kullanıcı kayıt ekranında admin rol seçimi engellenmiş, tüm kayıtlar varsayılan olarak `User` yetkisiyle sınırlandırılmıştır.

### 2. Siber Saldırı Korumaları
- **SQL Injection Koruması:** Veritabanı sorguları oluşturulurken ham SQL metin birleştirmeleri yerine tamamen Entity Framework Core (LINQ) mekanizması kullanılmıştır. Bu yapı sorguları parametrik olarak SQL Server'a ilettiği için dışarıdan gelebilecek zararlı SQL komutlarını tamamen etkisiz hale getirir.
- **XSS (Cross-Site Scripting) Koruması:** Kullanıcıların veri alanlarına zararlı  kodlar enjekte ederek diğer kullanıcıların tarayıcılarını sabote etmesini önlemek amacıyla frontend mimarisine `escapeHtml` fonksiyonu entegre edilmiştir. Girdiler görsel entitylere dönüştürülerek güvenli hale getirilir.

## Sistem Kurulum Kılavuzu

### Gereksinimler
- .NET 10.0 SDK veya üzeri
- Microsoft SQL Server & SQL Server Management Studio (SSMS)

### Veritabanı Yapılandırması
SQL Server üzerinde `TaskManagementDB` adında bir veritabanı oluşturduktan sonra aşağıdaki sorguları SSMS üzerinde çalıştırarak tabloları hazır hale getirin:

```sql
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description NVARCHAR(MAX) NULL,
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    email VARCHAR(100) NULL,
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE tasks (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description NVARCHAR(MAX) NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    user_id INT NOT NULL,
    category_id INT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_tasks_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK_tasks_categories FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);