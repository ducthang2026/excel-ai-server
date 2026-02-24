async function sendToGPT() {
    const prompt = document.getElementById("prompt").value;

    const response = await fetch("https://https://excel-ai-server.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.values = [[data.result]];
        await context.sync();
    });
}
