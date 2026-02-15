import { useState } from "react";
import "./App.css";
import Step0StrictModeProbe from "./practice/Step0StrictModeProbe";
import Step1LifecycleDemo from "./practice/Step1LifecycleDemo";
import Step2CleanupInterval from "./practice/Step2CleanupInterval";
import Step3DataFetcher from "./practice/Step3DataFetcher";
import Step4WindowSize from "./practice/Step4WindowSize";
import Step5MouseTracker from "./practice/Step5MouseTracker";

function App() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="app">
      <h1>Практика урока 2.2: useEffect и очистка</h1>

      <ol className="checklist">
        <li>Шаг 0: Поведение эффекта в StrictMode</li>
        <li>Шаг 1: Жизненный цикл + clearInterval при размонтировании</li>
        <li>Шаг 2: Очистка перед повторным запуском эффекта (зависимость message)</li>
        <li>Шаг 3: Безопасный асинхронный запрос с cleanup</li>
        <li>Шаг 4: addEventListener / removeEventListener</li>
        <li>Шаг 5: Практика MouseTracker</li>
      </ol>

      <div className="step-buttons">
        <button onClick={() => setActiveStep(0)}>Шаг 0</button>
        <button onClick={() => setActiveStep(1)}>Шаг 1</button>
        <button onClick={() => setActiveStep(2)}>Шаг 2</button>
        <button onClick={() => setActiveStep(3)}>Шаг 3</button>
        <button onClick={() => setActiveStep(4)}>Шаг 4</button>
        <button onClick={() => setActiveStep(5)}>Шаг 5</button>
      </div>

      <section className="panel">
        {activeStep === 0 && <Step0StrictModeProbe />}
        {activeStep === 1 && <Step1LifecycleDemo />}
        {activeStep === 2 && <Step2CleanupInterval />}
        {activeStep === 3 && <Step3DataFetcher />}
        {activeStep === 4 && <Step4WindowSize />}
        {activeStep === 5 && <Step5MouseTracker />}
      </section>
    </main>
  );
}

export default App;
