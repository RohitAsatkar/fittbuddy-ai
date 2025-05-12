
export interface StepData {
  count: number;
  date: string; // ISO date string format YYYY-MM-DD
  goal: number;
}

type StepListener = (steps: number) => void;

export class StepTrackingService {
  private static instance: StepTrackingService;
  private stepCount: number = 0;
  private dailyGoal: number = 10000; // Default daily goal
  private simulationInterval: number | null = null;
  private stepListeners: Array<StepListener> = [];
  private isUsingRealSensor: boolean = false;
  private accelerometerWatchId: string | null = null;
  private lastAcceleration: { x: number, y: number, z: number } | null = null;
  private stepThreshold: number = 10; // Adjust based on testing
  private lastStepTime: number = 0;
  private stepCooldown: number = 300; // ms between potential steps

  private constructor() {
    this.loadStepData();
  }

  public static getInstance(): StepTrackingService {
    if (!StepTrackingService.instance) {
      StepTrackingService.instance = new StepTrackingService();
    }
    return StepTrackingService.instance;
  }

  public async startTracking(): Promise<void> {
    try {
      // Check if we're running in a Capacitor environment (mobile device)
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        await this.startDeviceSensors();
      } else {
        // Fall back to simulation if not on a device or sensors unavailable
        console.log("Using step simulation (not on mobile device)");
        this.startSimulation();
      }
    } catch (error) {
      console.error("Failed to start device sensors:", error);
      console.log("Falling back to step simulation mode");
      this.startSimulation();
    }
  }

  public stopTracking(): void {
    if (this.isUsingRealSensor) {
      this.stopDeviceSensors();
    } else {
      this.stopSimulation();
    }
  }

  private async startDeviceSensors(): Promise<void> {
    try {
      // This is where we would initialize device motion sensors
      // For now, we'll use a basic approach that just uses the Capacitor API
      // but can be extended later with other plugins
      
      const motion = window.Capacitor?.Plugins?.Motion;
      
      if (!motion) {
        throw new Error("Motion plugin not available");
      }
      
      // Start the accelerometer
      await motion.addListener('accel', (event: any) => {
        this.processAccelerometerData(event.acceleration);
      });
      
      this.isUsingRealSensor = true;
      console.log('Device motion sensors activated');
    } catch (error) {
      console.error("Error starting device sensors:", error);
      throw error;
    }
  }

  private stopDeviceSensors(): void {
    try {
      // Remove device motion listeners
      if (window.Capacitor?.Plugins?.Motion) {
        window.Capacitor.Plugins.Motion.removeAllListeners();
      }
      
      this.isUsingRealSensor = false;
      console.log('Device motion sensors deactivated');
    } catch (error) {
      console.error("Error stopping device sensors:", error);
    }
  }

  private processAccelerometerData(acceleration: { x: number, y: number, z: number }): void {
    const now = Date.now();
    
    // Skip if we're still in the cooldown period between steps
    if (now - this.lastStepTime < this.stepCooldown) {
      return;
    }
    
    if (this.lastAcceleration) {
      // Calculate the magnitude of change in acceleration
      const deltaX = Math.abs(acceleration.x - this.lastAcceleration.x);
      const deltaY = Math.abs(acceleration.y - this.lastAcceleration.y);
      const deltaZ = Math.abs(acceleration.z - this.lastAcceleration.z);
      
      // Calculate total magnitude (simplified approach)
      const magnitudeChange = Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);
      
      // Detect step based on acceleration pattern
      if (magnitudeChange > this.stepThreshold) {
        this.lastStepTime = now;
        this.addSteps(1);
      }
    }
    
    this.lastAcceleration = acceleration;
  }

  public startSimulation(): void {
    if (this.simulationInterval) {
      return; // Already running
    }
    
    // Enhanced simulation to be more realistic
    // Simulate step increments with variable timing to feel more natural
    this.simulationInterval = window.setInterval(() => {
      // More realistic step counting simulation:
      // - Sometimes adds multiple steps (like when walking)
      // - Sometimes adds nothing (like when standing still)
      // - Variation in the timing
      const activity = Math.random();
      let stepsToAdd = 0;
      
      if (activity > 0.7) { // Active movement
        stepsToAdd = Math.floor(Math.random() * 5) + 1; // 1-5 steps
      } else if (activity > 0.4) { // Light movement
        stepsToAdd = Math.floor(Math.random() * 2) + 1; // 1-2 steps
      } // else no steps (standing still)
      
      if (stepsToAdd > 0) {
        this.stepCount += stepsToAdd;
        this.saveStepData();
        this.notifyListeners();
      }
    }, Math.floor(Math.random() * 1500) + 500); // Random interval between 0.5-2s
    
    console.log('Step tracking started (simulation mode)');
  }

  public stopSimulation(): void {
    if (this.simulationInterval) {
      window.clearInterval(this.simulationInterval);
      this.simulationInterval = null;
      console.log('Step tracking stopped');
    }
  }

  public getSteps(): number {
    return this.stepCount;
  }

  public addSteps(steps: number): void {
    this.stepCount += steps;
    this.saveStepData();
    this.notifyListeners();
  }

  public resetSteps(): void {
    this.stepCount = 0;
    this.saveStepData();
    this.notifyListeners();
  }

  public setDailyGoal(goal: number): void {
    this.dailyGoal = goal;
    this.saveStepData();
    this.notifyListeners();
  }

  public getDailyGoal(): number {
    return this.dailyGoal;
  }

  public addStepListener(listener: StepListener): () => void {
    this.stepListeners.push(listener);
    
    // Return function to remove listener
    return () => {
      const index = this.stepListeners.indexOf(listener);
      if (index !== -1) {
        this.stepListeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.stepListeners.forEach(listener => listener(this.stepCount));
  }

  public loadStepData(): StepData {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const savedData = localStorage.getItem(`steps_${today}`);
    
    if (savedData) {
      const data = JSON.parse(savedData);
      this.stepCount = data.count;
      this.dailyGoal = data.goal;
      return data;
    }
    
    return {
      count: this.stepCount,
      date: today,
      goal: this.dailyGoal
    };
  }

  public saveStepData(): void {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const data: StepData = {
      count: this.stepCount,
      date: today,
      goal: this.dailyGoal
    };
    
    localStorage.setItem(`steps_${today}`, JSON.stringify(data));
  }

  public getStepHistory(days: number = 7): StepData[] {
    const history: StepData[] = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const savedData = localStorage.getItem(`steps_${dateStr}`);
      if (savedData) {
        history.push(JSON.parse(savedData));
      } else {
        history.push({
          count: 0,
          date: dateStr,
          goal: this.dailyGoal
        });
      }
    }
    
    return history.reverse(); // Return with oldest first
  }
}

// Add a declaration to make TypeScript happy with window.Capacitor
declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform: () => boolean;
      Plugins?: {
        Motion?: {
          addListener: (event: string, callback: (data: any) => void) => Promise<void>;
          removeAllListeners: () => Promise<void>;
        };
      };
    };
  }
}
