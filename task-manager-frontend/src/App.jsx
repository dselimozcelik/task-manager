import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" data-theme={theme}>
      <div className="navbar bg-base-300 rounded-box mb-8">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DaisyUI Test</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Tailwind CSS ve DaisyUI Test</h2>
          <p>Bu kart, Tailwind CSS ve DaisyUI'ın düzgün çalıştığını test etmek için oluşturulmuştur.</p>
          
          <div className="divider">Bileşen Örnekleri</div>
          
          <div className="flex flex-col gap-4">
            {/* Buton Örnekleri */}
            <div className="flex flex-wrap gap-2">
              <button className="btn">Normal</button>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-accent">Accent</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-link">Link</button>
            </div>
            
            {/* Badge Örnekleri */}
            <div className="flex flex-wrap gap-2">
              <div className="badge">Badge</div>
              <div className="badge badge-primary">Primary</div>
              <div className="badge badge-secondary">Secondary</div>
              <div className="badge badge-accent">Accent</div>
              <div className="badge badge-outline">Outline</div>
            </div>
            
            {/* Alert Örnekleri */}
            <div className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Bilgi: DaisyUI başarıyla yüklendi!</span>
            </div>
            
            {/* Sayaç */}
            <div className="flex items-center justify-center gap-4">
              <button className="btn btn-circle" onClick={() => setCount(count - 1)}>-</button>
              <span className="text-2xl">{count}</span>
              <button className="btn btn-circle" onClick={() => setCount(count + 1)}>+</button>
            </div>
            
            {/* Progress Bar */}
            <progress className="progress progress-primary w-full" value={count} max="10"></progress>
            
            {/* Toggle */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Hatırla beni</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="join">
          <button className="btn join-item">Önceki</button>
          <button className="btn join-item btn-active">1</button>
          <button className="btn join-item">2</button>
          <button className="btn join-item">3</button>
          <button className="btn join-item">Sonraki</button>
        </div>
      </div>
      
      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8 rounded-box">
        <div>
          <p>Copyright © 2023 - Tailwind CSS ve DaisyUI Test Uygulaması</p>
        </div>
      </footer>
    </div>
  )
}

export default App
