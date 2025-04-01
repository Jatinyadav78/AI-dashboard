import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsDisplay from './components/ResultsDisplay';
import { BarChart2, Settings } from 'lucide-react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function Dashboard() {
  const [showSettings, setShowSettings] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <header className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-blue-500" />
                <h1 className={`text-xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Gen AI Analytics Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-full ${
                    mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition-colors`}
                  title="Settings"
                >
                  <Settings className={`h-5 w-5 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <QueryInput mode={mode} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ResultsDisplay mode={mode} />
              </div>
              <div>
                <QueryHistory mode={mode} />
              </div>
            </div>
          </div>
        </main>

        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full mx-4`}>
              <h2 className={`text-xl font-semibold mb-4 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Dashboard Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={`flex items-center space-x-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input type="checkbox" className="rounded text-blue-500" />
                    <span>Show query suggestions</span>
                  </label>
                </div>
                <div>
                  <label className={`flex items-center space-x-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input type="checkbox" className="rounded text-blue-500" defaultChecked />
                    <span>Auto-refresh data</span>
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;