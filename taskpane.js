async function sendToGPT() {
  const prompt = document.getElementById("prompt").value;

  const response = await fetch("https://excel-ai-server.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();

  if (!data.result) {
    alert("API lỗi hoặc chưa có OPENAI_API_KEY");
    return;
  }

  await Excel.run(async (context) => {
  const range = context.workbook.getSelectedRange();

  const rows = data.result
    .trim()
    .split("\n")
    .map(row => row.split(","));

  range.getResizedRange(rows.length - 1, rows[0].length - 1).values = rows;

  await context.sync();
});
