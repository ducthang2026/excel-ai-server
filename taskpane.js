async function sendToGPT() {
  const prompt = document.getElementById("prompt").value;

  const response = await fetch("https://excel-ai-server.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();

  if (!data.result) {
    alert("Lỗi API hoặc thiếu OPENAI_API_KEY");
    return;
  }

  // Tách CSV thành mảng 2 chiều
  const rows = data.result
    .split("\n")
    .map(row => row.split(","));

  await Excel.run(async (context) => {

    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const startCell = sheet.getSelectedRange();

    const rowCount = rows.length;
    const colCount = rows[0].length;

    const targetRange = startCell.getResizedRange(rowCount - 1, colCount - 1);
    targetRange.values = rows;

    // Làm header đậm
    const headerRange = targetRange.getRow(0);
    headerRange.format.font.bold = true;

    // Auto fit
    targetRange.format.autofitColumns();

    await context.sync();
  });
}
