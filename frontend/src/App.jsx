import React, { useState } from 'react';
import RiskForm from './components/RiskForm';
import Dashboard from './components/Dashboard';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 pb-20">
      {/* Header */}
      <header className="py-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white"><path d="M12 2v20M2 12h20"/></svg>
             </div>
             <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
               WellnessAI
             </h1>
          </div>
          <nav>
            <a href="#" className="text-sm font-medium hover:text-indigo-400 transition">Assessment</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center container">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          Understand Your <span className="gradient-text">Digital Wellness</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 animate-fade-in" style={{animationDelay: '0.1s'}}>
          Analyze how your screen time habits impact your mental health. 
          Our AI-driven tool predicts wellness risks and offers personalized insights.
        </p>
      </section>

      {/* Main Content */}
      <main className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
          <RiskForm onPrediction={(data, inputData) => {
            setPrediction(data);
            setFormData(inputData);
          }} />
        </div>

        <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
          {prediction ? (
             <div className="space-y-6">
                <div className={`card ${
                  prediction.risk_category === 'High Risk' ? 'border-red-500/50 bg-red-500/10' : 
                  prediction.risk_category === 'Moderate Risk' ? 'border-yellow-500/50 bg-yellow-500/10' : 
                  'border-green-500/50 bg-green-500/10'
                }`}>
                  <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-4xl font-bold">{prediction.wellness_score}</span>
                    <span className="text-sm text-slate-400 mb-1">/ 100</span>
                  </div>
                  <p className="text-lg font-medium mb-2">{prediction.risk_category}</p>
                  <p className="text-sm text-slate-300">{prediction.message}</p>
                </div>
                
                <Dashboard data={formData} />
             </div>
          ) : (
             <div className="card h-full flex items-center justify-center min-h-[400px] border-dashed border-2 border-slate-700 bg-transparent">
               <div className="text-center text-slate-500">
                 <p className="mb-2">Fill out the assessment to see your analysis</p>
               </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
