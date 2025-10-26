import React, { useState, useEffect } from 'react';

const GameHubDesktop: React.FC = () => {
  const [balance, setBalance] = useState(9692043.00);
  const [dailyFlecenium, setDailyFlecenium] = useState(9692043.00);
  const [monthlyLimit, setMonthlyLimit] = useState(50000000.00);
  const [isOnline, setIsOnline] = useState(true);
  const [appVersion, setAppVersion] = useState('1.0.0');

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);
    
    // Listen for online/offline events
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
    
    // Get app version from Electron
    if ((window as any).electronAPI) {
      (window as any).electronAPI.getAppVersion().then((version: string) => {
        setAppVersion(version);
      });
    }

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  const menuItems = [
    { icon: '💰', label: 'Deposit', color: 'from-green-500 to-emerald-500' },
    { icon: '📤', label: 'Withdraw', color: 'from-red-500 to-pink-500' },
    { icon: '🔄', label: 'Internal', color: 'from-blue-500 to-cyan-500' },
    { icon: '👑', label: 'Membership', color: 'from-yellow-500 to-amber-500' },
    { icon: '📲', label: 'Transfer', color: 'from-purple-500 to-indigo-500' },
    { icon: '⬆️', label: 'Upgrade', color: 'from-orange-500 to-red-500' },
  ];

  const quickActions = [
    { label: 'Family #1', value: 'USDT', color: 'text-cyan-400' },
    { label: 'Service', value: 'Annual Yield', color: 'text-green-400' },
    { label: '9 cx*** recharge', value: 'Participate Now', color: 'text-yellow-400' },
  ];

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleWindowControl = (action: string) => {
    if ((window as any).electronAPI) {
      (window as any).electronAPI[action]();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Custom Title Bar */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 drag-region">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2 no-drag">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CRYPBYU
            </span>
            <span className="text-gray-400 text-sm">v{appVersion}</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              GAMEHUB TOKEN
            </h1>
          </div>
          
          <div className="flex items-center space-x-1 no-drag">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <button 
              onClick={() => handleWindowControl('minimizeWindow')}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
            >
              <span className="text-lg">−</span>
            </button>
            <button 
              onClick={() => handleWindowControl('maximizeWindow')}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
            >
              <span className="text-lg">□</span>
            </button>
            <button 
              onClick={() => handleWindowControl('closeWindow')}
              className="w-8 h-8 flex items-center justify-center hover:bg-red-500 rounded transition-colors"
            >
              <span className="text-lg">×</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* User Greeting */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light mb-2">Hi, Khalil 👋</h2>
          <p className="text-gray-300">Welcome to GameHub Desktop</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <h3 className="text-gray-300 text-sm mb-2">Available Balance</h3>
            <div className="text-3xl font-bold text-cyan-400">
              {formatCurrency(balance)} USDT
            </div>
            <div className="text-green-400 text-xs mt-2">↑ +2.5% today</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300">
            <h3 className="text-gray-300 text-sm mb-2">Daily Flecenium</h3>
            <div className="text-3xl font-bold text-green-400">
              {formatCurrency(dailyFlecenium)} USDT
            </div>
            <div className="text-cyan-400 text-xs mt-2">🔄 Updates daily</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300">
            <h3 className="text-gray-300 text-sm mb-2">Monthly Receiving Limit</h3>
            <div className="text-3xl font-bold text-yellow-400">
              {formatCurrency(monthlyLimit)} USDT
            </div>
            <div className="text-gray-400 text-xs mt-2">Resets in 15 days</div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200 group"
            >
              <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <div className="text-sm font-medium">{item.label}</div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="text-gray-300 text-sm mb-2">{action.label}</div>
              <div className={`text-xl font-semibold ${action.color}`}>
                {action.value}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Status Bar */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>GameHub Token Desktop v{appVersion} • {isOnline ? 'Online' : 'Offline'} • Secure Crypto Gaming</p>
        </div>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #1e1b4b 0%, #1e40af 50%, #3730a3 100%);
          user-select: none;
        }
        
        .drag-region {
          -webkit-app-region: drag;
        }
        
        .no-drag {
          -webkit-app-region: no-drag;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default GameHubDesktop;