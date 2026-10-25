import React from 'react';
import { useData } from './context/DataContext';
import { AppShell } from './components/AppShell';
import { DashboardView } from './views/DashboardView';
import { DeviceView } from './views/DeviceView';
import { PrognosticsView } from './views/PrognosticsView';
import { AlertsView } from './views/AlertsView';
import { MapView } from './views/MapView';
import { ReplacementView } from './views/ReplacementView';
import { ArchitectureView } from './views/ArchitectureView';
import { FeasibilityView } from './views/FeasibilityView';
import { EvaluatorView } from './views/EvaluatorView';

export const AppContent: React.FC = () => {
  const { currentRoute } = useData();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case '/':
        return <DashboardView />;
      case '/device':
        return <DeviceView />;
      case '/prognostics':
        return <PrognosticsView />;
      case '/alerts':
        return <AlertsView />;
      case '/map':
        return <MapView />;
      case '/replace':
        return <ReplacementView />;
      case '/architecture':
        return <ArchitectureView />;
      case '/feasibility':
        return <FeasibilityView />;
      case '/evaluate':
        return <EvaluatorView />;
      default:
        return <DashboardView />;
    }
  };

  return <AppShell>{renderCurrentView()}</AppShell>;
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
