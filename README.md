# bbf-asistan — Proje ve Araç Başlatıcı Portalı

Sade, hızlı ve erişilebilir tek sayfalık bir bağlantı portalı. Başta [SınavTeX](https://dgknrsln.github.io/sinavtex/) olmak üzere web projelerinize tek noktadan erişim sağlar.

---

## 🚀 Entegre Araçlar

1. **[SınavTeX](https://dgknrsln.github.io/sinavtex/)**: Akıllı Sınav Hazırlama, Soru Bankası ve LaTeX/PDF Dizgi Otomasyonu.
2. **[Speech to Grade](https://alpaslantavukcu.github.io/speech_to_grade/)**: Ses Tanıma Destekli Akıllı Notlandırma ve Değerlendirme Asistanı.
3. **[Seating Plan Generator](https://github.com/alpaslantavukcu/seating_plan_generator)**: Kelebek Sistemi & Otomatik Sınav Oturma Planı Dağıtıcısı.

---

## ✨ Özellikler

- **Sade tasarım**: Tek vurgu rengi, düz kartlar, sistem fontu; harici font veya kütüphane yok.
- **Erişilebilir**: Yüksek kontrast, klavye ile gezinme ve görünür odak çerçevesi, ekran okuyucu etiketleri.
- **Otomatik koyu tema**: İşletim sistemi tercihine göre açık/koyu görünüm.
- **Responsive**: Telefon, tablet ve masaüstünde uyumlu.

---

## 🛠️ Nasıl Çalıştırılır?

Herhangi bir statik web sunucusu ile veya doğrudan tarayıcıda açabilirsiniz:

### Seçenek 1: Python ile Yerel Sunucu
```bash
python3 -m http.server 3000
```
Ardından tarayıcınızda `http://localhost:3000` adresine gidin.

### Seçenek 2: Node / npx (serve / live-server)
```bash
npx serve .
```

### Seçenek 3: Doğrudan `index.html` dosyasını çift tıklayarak tarayıcınızda açın.
