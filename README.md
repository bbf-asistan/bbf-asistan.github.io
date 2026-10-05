# bbf-asistan

Bölüm içi sınav, gözetmenlik, laboratuvar ve asistanlık araçlarına tek bir noktadan hızlı ve pratik erişim sağlayan hafif, modern ve erişilebilir başlangıç sayfası (portal/landing page).

🌐 **Canlı Sürüm:** [bbf-asistan.github.io](https://bbf-asistan.github.io)

---

## 📌 İçerik ve Bağlantılar

### 🛠️ Araçlar
- **[SınavTeX](https://bbf-asistan.github.io/sinavtex/)**: Otomatik LaTeX ve PDF formatında sınav kağıdı oluşturma aracı.
- **[Speech to Grade](https://alpaslantavukcu.github.io/speech_to_grade/)**: Ses tanıma ile sınav notlarını hızlı ve hatasız girme yardımcısı.
- **[Seating Plan Generator](https://github.com/alpaslantavukcu/seating_plan_generator)**: Sınavlar için otomatik derslik ve oturma düzeni oluşturucu.

### 🔗 Bölüm Sistemleri & Dahili Bağlantılar
- **Gözetmenlik Sistemi**: Sınav gözetmenlik görevleri ve iş yükü dağıtım sistemi.
- **Lab Sistemi**: Laboratuvar ve toplantı odası rezervasyon yönetimi.
- **Yazıcı Erişimi**: Dahili ağdaki yazıcı adresini tek tıkla panoya kopyalama desteği.

---

## ✨ Teknik Özellikler

- **Sıfır Bağımlılık (Zero-Dependency):** Saf HTML5, modern CSS3 ve Vanilla JavaScript; derleme (build) adımı gerektirmez.
- **Otomatik Tema (Light/Dark Mode):** Sistem tercihlerine göre otomatik uyum sağlayan (`prefers-color-scheme`) şık renk paleti.
- **Erişilebilirlik (A11y):**
  - Klavye kullanıcıları için doğrudan içeriğe geçiş (`Skip to content`) bağlantısı.
  - Ekran okuyucu bildirimleri (`aria-live="polite"`).
  - Yüksek kontrast ve hareket hassasiyeti (`prefers-reduced-motion`) desteği.
- **Pano Entegrasyonu:** Modern `navigator.clipboard` API desteği ve yerel (`file://` / düz HTTP) ortamlar için geriye dönük fallback mekanizması.
- **Duyarlı (Responsive) Tasarım:** Mobil, tablet ve masaüstü ekranlarda kusursuz ızgara (CSS Grid) görünümü.

---

## 🚀 Yerel Geliştirme (Local Development)

Proje tamamen statik dosyalardan oluştuğu için herhangi bir derleme aracına ihtiyaç duymaz.

```bash
# Depoyu klonlayın
git clone https://github.com/bbf-asistan/bbf-asistan.github.io.git
cd bbf-asistan.github.io

# Herhangi bir yerel sunucu ile çalıştırın:
# Python 3 ile:
python3 -m http.server 8000

# veya Node.js / npx ile:
npx serve .
```

Ardından tarayıcınızda `http://localhost:8000` adresini açabilirsiniz.
