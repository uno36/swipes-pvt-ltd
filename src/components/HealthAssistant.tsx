import { useState } from "react";

const HealthAssistant: React.FC = () => {
  const [healthQuery, setHealthQuery] = useState<string>("");
  const [healthResponse, setHealthResponse] = useState<string>("");
  const [isHealthGenerating, setIsHealthGenerating] = useState<boolean>(false);
  const [healthError, setHealthError] = useState<string | null>(null);

  const handleGenerateHealthAdvice = async () => {
    if (!healthQuery.trim()) {
      setHealthError("Please enter a question to get health advice.");
      return;
    }
    setIsHealthGenerating(true);
    setHealthError(null);
    setHealthResponse("");

    try {
      const chatHistory = [];
      const prompt = `Provide general information or advice related to the following health query: "${healthQuery}". Emphasize that this is not medical advice and a professional should be consulted for specific conditions. Keep the response concise and informative.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setHealthResponse(text);
      } else {
        setHealthError(
          "Failed to get a response from the AI assistant. Please try again."
        );
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      setHealthError(
        "Error connecting to the AI assistant. Please check your network and try again."
      );
      console.error("Error calling Gemini API for health advice:", err);
    } finally {
      setIsHealthGenerating(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Ask Our AI Health Assistant ✨
      </h3>
      <div className="max-w-2xl mx-auto">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-y min-h-[100px]"
          placeholder="e.g., What are the benefits of Vitamin C? How can I improve my sleep?"
          value={healthQuery}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setHealthQuery(e.target.value)
          }
        ></textarea>
        <button
          onClick={handleGenerateHealthAdvice}
          disabled={isHealthGenerating}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isHealthGenerating ? "Getting Advice..." : "Get Advice ✨"}
        </button>

        {healthError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {healthError}
          </div>
        )}

        {healthResponse && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">
              AI Assistant's Response:
            </h4>
            <p className="text-gray-700 whitespace-pre-wrap">
              {healthResponse}
            </p>
            <p className="text-xs text-gray-500 mt-3">
              <strong className="text-red-500">Disclaimer:</strong> This
              information is for general knowledge and informational purposes
              only, and does not constitute medical advice. Always consult with
              a qualified healthcare professional for any health concerns or
              before making any decisions related to your health or treatment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthAssistant;
