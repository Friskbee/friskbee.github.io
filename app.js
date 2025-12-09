fetch("data_ordered.json")
  .then(res => res.json())
  .then(data => {

    const table = document.getElementById("score-table");

    // Tabelle Header
    table.innerHTML = `<tr><th>Score</th></tr>`;

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.Score}</td>`;
      table.appendChild(row);

      row.addEventListener("click", () => {
        // Prüfen, ob Detail schon da ist
        if (row.nextElementSibling && row.nextElementSibling.classList.contains("detail-row")) {
          row.nextElementSibling.remove();
          return;
        }

        // Vorherige offene Detail-Row schließen
        const openDetail = table.querySelector(".detail-row");
        if (openDetail) openDetail.remove();

        // Detail-Row erstellen
        const detailRow = document.createElement("tr");
        detailRow.classList.add("detail-row");
        const detailCell = document.createElement("td");
        detailCell.colSpan = 1; // Spaltenanzahl der Tabelle
        detailCell.innerHTML = `
          <table>
            ${Object.keys(item).filter(k => k !== "Score").map(k => `
              <tr><th>${k}</th><td>${item[k]}</td></tr>
            `).join('')}
          </table>
        `;
        detailRow.appendChild(detailCell);
        row.insertAdjacentElement("afterend", detailRow);
      });
    });

    // Suche
    const input = document.getElementById("search");
    input.addEventListener("input", () => {
      const filter = input.value.toLowerCase();
      Array.from(table.querySelectorAll("tr")).forEach((tr, idx) => {
        if (idx === 0) return; // Header
        const score = tr.firstChild.textContent.toLowerCase();
        tr.style.display = score.includes(filter) ? "" : "none";
        // Offene Detail-Row entfernen, wenn Score ausgeblendet
        if (tr.nextElementSibling && tr.nextElementSibling.classList.contains("detail-row")) {
          tr.nextElementSibling.remove();
        }
      });
    });

  })
  .catch(err => console.error(err));
// Modal öffnen / schließen
const modal = document.getElementById("howToModal");
const btn = document.getElementById("howToBtn");
const span = modal.querySelector(".close");

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

