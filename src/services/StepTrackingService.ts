
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

  private constructor() {
    this.loadStepData();
  }

  public static getInstance(): StepTrackingService {
    if (!StepTrackingService.instance) {
      StepTrackingService.instance = new StepTrackingService();
    }
    return StepTrackingService.instance;
  }

  public startTracking(): void {
    // For now, we'll always use simulation
    // Later, this will check if real sensors are available
    this.startSimulation();
  }

  public stopTracking(): void {
    if (this.isUsingRealSensor) {
      // This will be used later for removing real sensor listeners
      this.isUsingRealSensor = false;
    } else {
      this.stopSimulation();
    }
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
