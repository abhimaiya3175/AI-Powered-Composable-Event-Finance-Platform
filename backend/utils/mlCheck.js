const axios = require("axios");

async function mlAnomalyCheck(expenses, totalBudget, retries = 2) {
    if (!expenses || expenses.length === 0) {
        return { anomaly_detected: false, anomaly_score: 0, reason: "No expenses provided" };
    }

    try {
        const payload = {
            expenses: expenses.map(e => ({
                amount: e.amount,
                budgetRatio: totalBudget > 0 ? e.amount / totalBudget : 0,
                timeGap: 1, // Placeholder as per instructions
                categoryFrequency: 1, // Placeholder
                hasReceipt: e.receiptUrl ? 1 : 0
            }))
        };

        const apiUrl = process.env.HF_API_URL || "https://abhimaiya-event-anamoly-detecter.hf.space/predict";

        // Using the user's Hugging Face Space URL with a 5-second timeout
        const res = await axios.post(apiUrl, payload, {
            timeout: 5000
        });

        return {
            anomaly_detected: res.data.anomaly_detected || false,
            anomaly_score: res.data.anomaly_score || 0.0,
            reason: res.data.reason || "",
            model_used: res.data.model_used || "",
            confidence: res.data.confidence || 0.0
        };
    } catch (error) {
        console.error(`ML API Error: ${error.message}`);
        
        if (retries > 0) {
            console.log(`Retrying ML Anomaly Check... (${retries} attempts left)`);
            return mlAnomalyCheck(expenses, totalBudget, retries - 1);
        }

        // Graceful fallback if the Hugging Face service fails/timeouts
        return { 
            anomaly_detected: false, 
            anomaly_score: 0.0, 
            reason: "ML Service temporarily unavailable",
            model_used: "Fallback Error Handler",
            confidence: 0.0,
            error: true 
        };
    }
}

module.exports = mlAnomalyCheck;
