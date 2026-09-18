/* ============================================================
   Vyros Portfolyo — sekme geçişleri + e-posta kopyalama
   ============================================================ */

// ---------- Sekme geçişi ----------
// Menüdeki bir sekmeye tıklanınca ilgili panel fade animasyonuyla açılır.
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // Aktif sekmeyi güncelle
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      if (t === tab) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });

    // Panelleri değiştir (CSS'teki panel-fade animasyonu tetiklenir)
    panels.forEach((panel) => {
      const isTarget = panel.id === `panel-${target}`;
      panel.classList.remove("active");
      if (isTarget) {
        // Animasyonu yeniden başlatmak için reflow zorla
        void panel.offsetWidth;
        panel.classList.add("active");
      }
    });
  });
});

// ---------- E-posta kopyalama ----------
// "Kopyala" butonu adresi panoya yazar ve kısa süre "Kopyalandı" gösterir.
const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((btn) => {
  const label = btn.querySelector("span");
  const original = label.textContent;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.classList.add("copied");
      label.textContent = "Kopyalandı";
      setTimeout(() => {
        btn.classList.remove("copied");
        label.textContent = original;
      }, 1800);
    } catch {
      /* panoya erişilemiyorsa sessiz geç */
    }
  });
});
