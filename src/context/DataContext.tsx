import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PurifierDevice,
  FilterStage,
  Alert,
  NeighborhoodWard,
  ReplacementRecord,
  SimulationConfig,
  DemoStep,
} from '../types';
import { dataStore } from '../services/dataService';
import { VerificationCheckResult } from '../services/modelEngine';
import { DEMO_STEPS } from '../services/demoScript';

export interface DataContextValue {
  devices: PurifierDevice[];
  activeDevice: PurifierDevice;
  activeDeviceId: string;
  alerts: Alert[];
  wards: NeighborhoodWard[];
  replacements: ReplacementRecord[];
  simulationConfig: SimulationConfig;
  currentRoute: string;
  isVideoMode: boolean;
  isPresenterMode: boolean;
  demoState: {
    isRunning: boolean;
    isPaused: boolean;
    currentStepIndex: number;
    currentStep: DemoStep;
    totalSteps: number;
    speakerNotesOpen: boolean;
  };
  navigateTo: (route: string) => void;
  setActiveDevice: (deviceId: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  updateSimulationConfig: (config: Partial<SimulationConfig>) => void;
  executeReplacement: (stageId: string, flushLiters: number, forceDefect?: boolean) => VerificationCheckResult;
  resetToSeedState: () => void;
  startDemo: () => void;
  pauseDemo: () => void;
  resumeDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  stopDemo: () => void;
  togglePresenterMode: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(() => dataStore.getState());
  
  // URL routing state
  const getInitialRoute = () => {
    const path = window.location.pathname;
    return path && path !== '' ? path : '/';
  };
  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  const isVideoMode = new URLSearchParams(window.location.search).get('video') === '1';
  const [isPresenterMode, setIsPresenterMode] = useState<boolean>(() => {
    return new URLSearchParams(window.location.search).get('presenter') === '1';
  });

  // Guided demo state
  const [demoState, setDemoState] = useState<{
    isRunning: boolean;
    isPaused: boolean;
    currentStepIndex: number;
    speakerNotesOpen: boolean;
  }>({
    isRunning: isVideoMode,
    isPaused: false,
    currentStepIndex: 0,
    speakerNotesOpen: isPresenterMode,
  });

  // Sync state from centralized dataStore
  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setState(dataStore.getState());
    });
    return unsubscribe;
  }, []);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((route: string) => {
    if (window.location.pathname !== route) {
      const url = new URL(window.location.href);
      url.pathname = route;
      window.history.pushState({}, '', url.toString());
      setCurrentRoute(route);
    }
  }, []);

  const togglePresenterMode = useCallback(() => {
    setIsPresenterMode(prev => !prev);
    setDemoState(prev => ({ ...prev, speakerNotesOpen: !prev.speakerNotesOpen }));
  }, []);

  // Demo automation timer
  useEffect(() => {
    if (!demoState.isRunning || demoState.isPaused) return;

    const currentStep = DEMO_STEPS[demoState.currentStepIndex];
    if (!currentStep) return;

    // Navigate to the step's designated route
    navigateTo(currentStep.route);

    // If video mode or running demo, progress after durationMs
    const timer = setTimeout(() => {
      setDemoState(prev => {
        if (prev.currentStepIndex < DEMO_STEPS.length - 1) {
          return { ...prev, currentStepIndex: prev.currentStepIndex + 1 };
        } else {
          // Finished all steps
          return { ...prev, isRunning: false };
        }
      });
    }, isVideoMode ? currentStep.durationMs : 14000);

    return () => clearTimeout(timer);
  }, [demoState.isRunning, demoState.isPaused, demoState.currentStepIndex, isVideoMode, navigateTo]);

  const startDemo = useCallback(() => {
    dataStore.resetToSeedState();
    setDemoState({
      isRunning: true,
      isPaused: false,
      currentStepIndex: 0,
      speakerNotesOpen: isPresenterMode,
    });
    navigateTo(DEMO_STEPS[0].route);
  }, [isPresenterMode, navigateTo]);

  const pauseDemo = useCallback(() => {
    setDemoState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeDemo = useCallback(() => {
    setDemoState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const nextDemoStep = useCallback(() => {
    setDemoState(prev => {
      const nextIdx = Math.min(DEMO_STEPS.length - 1, prev.currentStepIndex + 1);
      navigateTo(DEMO_STEPS[nextIdx].route);
      return { ...prev, currentStepIndex: nextIdx };
    });
  }, [navigateTo]);

  const prevDemoStep = useCallback(() => {
    setDemoState(prev => {
      const prevIdx = Math.max(0, prev.currentStepIndex - 1);
      navigateTo(DEMO_STEPS[prevIdx].route);
      return { ...prev, currentStepIndex: prevIdx };
    });
  }, [navigateTo]);

  const stopDemo = useCallback(() => {
    setDemoState(prev => ({ ...prev, isRunning: false, isPaused: false }));
  }, []);

  const value: DataContextValue = {
    devices: state.devices,
    activeDevice: state.activeDevice,
    activeDeviceId: state.activeDeviceId,
    alerts: state.alerts,
    wards: state.wards,
    replacements: state.replacements,
    simulationConfig: state.simulationConfig,
    currentRoute,
    isVideoMode,
    isPresenterMode,
    demoState: {
      ...demoState,
      currentStep: DEMO_STEPS[demoState.currentStepIndex] || DEMO_STEPS[0],
      totalSteps: DEMO_STEPS.length,
    },
    navigateTo,
    setActiveDevice: (id) => dataStore.setActiveDevice(id),
    acknowledgeAlert: (id) => dataStore.acknowledgeAlert(id),
    resolveAlert: (id) => dataStore.resolveAlert(id),
    updateSimulationConfig: (cfg) => dataStore.updateSimulationConfig(cfg),
    executeReplacement: (stageId, flushLiters, defect) => dataStore.executeReplacement(stageId, flushLiters, defect),
    resetToSeedState: () => {
      dataStore.resetToSeedState();
      stopDemo();
    },
    startDemo,
    pauseDemo,
    resumeDemo,
    nextDemoStep,
    prevDemoStep,
    stopDemo,
    togglePresenterMode,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
