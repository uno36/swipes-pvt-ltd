import { useState } from "react";
import type { PrimaryColor, Theme } from "../types";

interface HealthAssistantProps {
  theme: Theme;
  primaryColor: PrimaryColor;
}

const HealthAssistant: React.FC<HealthAssistantProps> = ({
  theme,
  primaryColor,
}) => {
  const [healthQuery, setHealthQuery] = useState<string>("");
  const [healthResponse, setHealthResponse] = useState<string>("");
  const [isHealthGenerating, setIsHealthGenerating] = useState<boolean>(false);
  const [healthError, setHealthError] = useState<string | null>(null);

  const primaryButtonBg =
    primaryColor === "blue" ? "bg-blue-600" : "bg-olive-600";
  const primaryButtonHoverBg =
    primaryColor === "blue" ? "hover:bg-blue-700" : "hover:bg-olive-700";
  const primaryFocusRingClass =
    primaryColor === "blue" ? "focus:ring-blue-500" : "focus:ring-olive-500";
  const responseBg = primaryColor === "blue" ? "bg-blue-50" : "bg-olive-50";
  const responseBorder =
    primaryColor === "blue" ? "border-blue-200" : "border-olive-200";
  const responseTitleColor =
    primaryColor === "blue" ? "text-blue-800" : "text-olive-800";

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
    <section
      className={`dark:bg-gray-700 rounded-xl shadow-lg p-8 mb-12 ${
        theme === "dark" ? "dark-mode-card" : "bg-white"
      }`}
    >
      <h3
        className={`dark:text-white text-3xl font-bold mb-6 text-center ${
          theme === "dark" ? "dark-mode-text" : "text-gray-900"
        }`}
      >
        Ask Our AI Health Assistant ✨
      </h3>
      <div className="max-w-2xl mx-auto">
        <textarea
          className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none ${primaryFocusRingClass} mb-4 resize-y min-h-[100px] ${
            theme === "dark" ? "dark-mode-input" : ""
          }`}
          placeholder="e.g., What are the benefits of Vitamin C? How can I improve my sleep?"
          value={healthQuery}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setHealthQuery(e.target.value)
          }
        ></textarea>
        <button
          onClick={handleGenerateHealthAdvice}
          disabled={isHealthGenerating}
          className={`w-full ${primaryButtonBg} text-white font-semibold py-3 px-8 rounded-lg shadow-md ${primaryButtonHoverBg} transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isHealthGenerating ? "Getting Advice..." : "Get Advice ✨"}
        </button>

        {healthError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {healthError}
          </div>
        )}

        {healthResponse && (
          <div
            className={`mt-6 p-4 ${responseBg} rounded-lg ${responseBorder}`}
          >
            <h4 className={`font-semibold ${responseTitleColor} mb-2`}>
              AI Assistant's Response:
            </h4>
            <p
              className={`whitespace-pre-wrap ${
                theme === "dark" ? "dark-mode-text" : "text-gray-700"
              }`}
            >
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
