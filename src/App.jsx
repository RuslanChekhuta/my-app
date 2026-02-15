import { useState } from "react";
import "./App.css";
import Step1RefFocus from "./practice23/Step1RefFocus";
import Step2NumberTracker from "./practice23/Step2NumberTracker";
import Step3CustomVideoPlayer from "./practice23/Step3CustomVideoPlayer";
import Step4RefComponentEffect from "./practice23/Step4RefComponentEffect";
import Step5UserGreeting from "./practice23/Step5UserGreeting";
import Step6AdvancedAudioPlayer from "./practice23/Step6AdvancedAudioPlayer";

function App() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <main className="app">
      <h1>Практика урока 2.3: useRef</h1>

      <ol className="checklist">
        <li>Шаг 1: Фокус на input через ref</li>
        <li>Шаг 2: Хранение previous value через ref</li>
        <li>Шаг 3: Кастомный видеоплеер (play/pause)</li>
        <li>Шаг 4: Фокус + CSS-эффект floating label</li>
        <li>Шаг 5: Отслеживание previous props</li>
        <li>Шаг 6: AdvancedAudioPlayer и cleanup слушателей</li>
      </ol>

      <div className="step-buttons">
        <button onClick={() => setActiveStep(1)}>Шаг 1</button>
        <button onClick={() => setActiveStep(2)}>Шаг 2</button>
        <button onClick={() => setActiveStep(3)}>Шаг 3</button>
        <button onClick={() => setActiveStep(4)}>Шаг 4</button>
        <button onClick={() => setActiveStep(5)}>Шаг 5</button>
        <button onClick={() => setActiveStep(6)}>Шаг 6</button>
      </div>

      <section className="panel">
        {activeStep === 1 && <Step1RefFocus />}
        {activeStep === 2 && <Step2NumberTracker />}
        {activeStep === 3 && <Step3CustomVideoPlayer />}
        {activeStep === 4 && <Step4RefComponentEffect />}
        {activeStep === 5 && <Step5UserGreeting />}
        {activeStep === 6 && <Step6AdvancedAudioPlayer />}
      </section>
    </main>
  );
}

export default App;
