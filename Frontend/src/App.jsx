import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import "prismjs/components/prism-javascript"; // Ensure JavaScript syntax highlighting works
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";

export default function App() {
  const [originalCode, setOriginalCode] = useState(
    `function sum() {\n  return 1 + 1;\n}`
  );
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, [originalCode, review]); // Re-highlight when code changes

  const reviewCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        prompt: originalCode,
      });
      setReview(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl h-full">
        {/* Left: Original Code Editor */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg w-full h-full flex flex-col">
          <h2 className="text-white text-lg font-semibold mb-2">
            Original Code
          </h2>
          <div className="flex-1 border border-gray-600 rounded-md overflow-hidden">
            <Editor
              value={originalCode}
              onValueChange={setOriginalCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              className="bg-gray-900 text-white h-full"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            className="mt-3 bg-blue-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-blue-600"
          >
            Review Code
          </button>
        </div>

        {/* Right: Reviewed Code */}
        <div className="bg-gray-700 p-6 shadow-lg rounded-lg w-full h-full flex flex-col">
          <h2 className="text-white text-lg font-semibold mb-2">
            Reviewed Code
          </h2>
          <div className="flex-1 bg-gray-800 p-4 rounded-md border border-gray-600 overflow-auto">
            <pre>
              <code className="language-javascript">
                <Markdown>
                  {review || "// AI-reviewed code will appear here..."}
                </Markdown>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
