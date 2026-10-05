# bbf-asistan

Bölüm araçlarına, sınav hazırlama sistemlerine ve dahili sunucu servislerine tek bir noktadan hızlı ve pratik erişim sağlayan merkezi web portalı.

---

## 🚀 Entegre Araçlar

- **[SınavTeX](https://dgknrsln.github.io/sinavtex/)**: Otomatik LaTeX/PDF sınav oluşturma ve soru dizgi aracı.
- **[Speech to Grade](https://alpaslantavukcu.github.io/speech_to_grade/)**: Ses tanıma destekli notlandırma ve değerlendirme asistanı.
- **[Seating Plan Generator](https://github.com/alpaslantavukcu/seating_plan_generator)**: Otomatik sınav oturma planı ve kelebek düzeni oluşturucu.

---

## 🔗 Dahili Bağlantılar ve Servisler

- **[Gözetmenlik Sistemi](https://160.75.52.83)**: Sınav gözetmenlik görevleri ve yük dağılım paneli.
- **[Lab Sistemi](https://160.75.52.83/lab/)**: Laboratuvar ve toplantı salonu rezervasyon sistemi.
- **Yazıcı**: Tek tıkla panoya kopyalanabilir dahili yazıcı adresi (`https://160.75.52.13`).

---

## ✨ Özellikler

- ⚡ **Hızlı ve Hafif**: Sıfır dış bağımlılık, yalın HTML5, CSS3 ve Vanilla JavaScript mimarisi.
- 🌓 **Otomatik Açık / Koyu Tema**: İşletim sistemi tercihine uyumlu (`prefers-color-scheme`) minimalist düz kart tasarımı.
- 🎨 **Çift Tema Desteği (Dinamik Geçiş)**:
  - **Varsayılan Tema**: Temiz, yüksek okunabilirlikli ve odaklanmış arayüz.
  - **Zengin Tema (Glassmorphism & Glow)**: Canlı degrade ışıklar, cam efekti, modern tipografi ve bildirim pencereleri.
- 📋 **Akıllı Pano Entegrasyonu**: Ağ adreslerini tek tıkla kopyalama ve anlık geri bildirim bildirimleri (Toast).

---

## ⌨️ Klavye Kısayolları

| Kısayol | İşlem |
| :--- | :--- |
| `⌘ + Shift + O + P` *(macOS)*<br>`Ctrl + Shift + O + P` *(Windows/Linux)* | **Temalar Arası Geçiş** (Varsayılan ⇄ Zengin Tema) |

> *Seçilen tema tercihi tarayıcı yerel hafızasında (`localStorage`) saklanır ve sayfa yenilendiğinde hatırlanır.*

---

## 🛠️ Yerel Olarak Çalıştırma

Sayfa tamamen statiktir. Doğrudan tarayıcınızda açabilir veya yerel bir sunucu başlatabilirsiniz:

### 1. Python ile Yerel Sunucu
```bash
python3 -m http.server 3000
```
Tarayıcınızda `http://localhost:3000` adresine gidin.

### 2. Node.js / npx ile
```bash
npx serve .
```

### 3. Doğrudan Çalıştırma
`index.html` dosyasına çift tıklayarak tarayıcınızda doğrudan açabilirsiniz.

---

## 📄 Lisans

Bu proje açık kaynaklıdır ve bölüm içi kullanım ile akademik üretkenliği artırmak amacıyla geliştirilmiştir.
