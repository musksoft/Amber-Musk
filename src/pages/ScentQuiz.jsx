import { useState, useEffect } from "react";

const questions = [
  {
    question: "What's your preferred scent intensity?",
    options: [
      { text: "Light and fresh", family: ["Fresh", "Citrus"], image: "/fresh.png" },
      { text: "Moderate and balanced", family: ["Floral", "Woody"], image: "/moderate.png" },
      { text: "Bold and intense", family: ["Oriental", "Spicy"], image: "/bold.png" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Beach and ocean", family: ["Aquatic", "Fresh"], image: "/beach.png" },
      { text: "Garden and flowers", family: ["Floral"], image: "/garden.png" },
      { text: "Forest and woods", family: ["Woody"], image: "/forset.png" },
      { text: "Exotic bazaar", family: ["Oriental", "Spicy"], image: "/bazaar.png" },
    ],
  },
  {
    question: "When do you wear fragrance?",
    options: [
      { text: "Daily", family: ["Fresh", "Citrus"], image: "/daily.png" },
      { text: "Evenings", family: ["Woody", "Oriental"], image: "/sunset.png" },
      { text: "Special occasions", family: ["Gourmand"], image: "/occasion.png" },
      { text: "All the time", family: ["Floral", "Fresh"], image: "/all.png" },
    ],
  },
  {
    question: "Pick a scent vibe:",
    options: [
      { text: "Citrus & fruity", family: ["Citrus"], image: "/citrus.png" },
      { text: "Sweet & vanilla", family: ["Gourmand"], image: "/icecream.png" },
      { text: "Herbal & green", family: ["Fresh", "Woody"], image: "/herbal.png" },
      { text: "Warm & spicy", family: ["Spicy", "Oriental"], image: "/spicy.png" },
    ],
  },
  {
    question: "Your style?",
    options: [
      { text: "Classic", family: ["Floral", "Powdery"], image: "/cd.png" },
      { text: "Trendy", family: ["Citrus", "Gourmand"], image: "/tech.png" },
      { text: "Bold", family: ["Spicy", "Oriental"], image: "/sport.png" },
      { text: "Minimal", family: ["Fresh", "Woody"], image: "/classic.png" },
    ],
  },
];

const perfumes = [
  {
    name: "Ocean Breeze",
    family: ["Fresh", "Aquatic"],
    image: "./img2.png",
  },
  {
    name: "Rose Elegance",
    family: ["Floral"],
    image:
      "/royal.png",
  },
  {
    name: "Midnight Spice",
    family: ["Spicy", "Oriental"],
    image:
      "/spice.png",
  },
  {
    name: "Vanilla Dream",
    family: ["Gourmand"],
    image:
      "/vanilla.png",
  },
  {
    name: "More Perfume 1",
    family: ["Floral", "Fresh"],
    image:
      "/pink.png",
  },
  {
    name: "More Perfume 2",
    family: ["Woody"],
    image:
      "/circle.png",
  },
];

export default function ScentQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const progress = ((step + 1) / questions.length) * 100;

  useEffect(() => {
    setSelected(answers[step] ?? null);
  }, [step, answers]);

  const handleNext = () => {
    if (selected === null) return;

    const newAnswers = [...answers];
    newAnswers[step] = selected;
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const calculateResult = (answers) => {
    const count = {};

    answers.forEach((ans, i) => {
      questions[i].options[ans].family.forEach((f) => {
        count[f] = (count[f] || 0) + 1;
      });
    });

    const top = Object.keys(count)
      .sort((a, b) => count[b] - count[a])
      .slice(0, 3);

    const recs = perfumes.filter((p) =>
      p.family.some((f) => top.includes(f))
    );

    setResult({ top, recs });
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-amber-50 border border-amber-200 rounded-3xl shadow-xl p-6 md:p-10">
          <h2 className="text-2xl font-semibold text-center mb-6 text-amber-900">
            Your Signature Scent ✨
          </h2>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {result.top.map((f) => (
              <span
                key={f}
                className="px-4 py-1 rounded-full bg-amber-600 text-white text-sm"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {result.recs.map((p, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-amber-900">{p.name}</h3>
                  <p className="text-sm text-amber-700">
                    {p.family.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setStep(0);
              setAnswers([]);
              setResult(null);
            }}
            className="mt-8 w-full py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-amber-50 border border-amber-200 rounded-3xl shadow-xl p-6 md:p-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-amber-900">
            Find Your Signature Scent
          </h1>
          <p className="text-amber-700 text-sm">
            Question {step + 1} of {questions.length}
          </p>
        </div>

        <div className="w-full bg-amber-200 h-2 rounded-full mb-6">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-700 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-lg md:text-xl font-medium mb-4 text-center text-amber-900">
          {questions[step].question}
        </h2>

        <div className="grid gap-3">
        {questions[step].options.map((opt, i) => (
  <button
    key={i}
    onClick={() => setSelected(i)}
    className={`rounded-xl border overflow-hidden transition text-left
      ${
        selected === i
          ? "border-amber-700 ring-2 ring-amber-400"
          : "border-amber-200 hover:border-amber-400"
      }`}
  >
    {/* IMAGE (top) */}
    <img
      src={opt.image}
      alt={opt.text}
      className="w-full h-24 object-cover"
    />

    {/* TEXT BOX (bottom) */}
    <div
      className={`p-3 ${
        selected === i
          ? "bg-amber-700 text-white"
          : "bg-amber-50 text-amber-900"
      }`}
    >
      <span className="font-medium tracking-wide">
        {opt.text}
      </span>
    </div>
  </button>
))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="px-4 py-2 text-sm text-amber-700 hover:text-amber-900 disabled:opacity-30"
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`px-6 py-2 rounded-xl text-white transition
              ${
                selected === null
                  ? "bg-amber-200 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700 shadow-md"
              }`}
          >
            {step === questions.length - 1 ? "See Result" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}