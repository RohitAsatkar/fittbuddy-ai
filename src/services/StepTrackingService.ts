
export interface StepData {
  count: number;
  date: string; // ISO date string format YYYY-MM-DD
  goal: number;
}

export class StepTrackingService {
  private static instance: StepTrackingService;
  private stepCount: number = 0;
  private dailyGoal: number = 10000; // Default daily goal
  private simulationInterval: number | null = null;
  private stepListeners: Array<(steps: number) => void> = [];

  private constructor() {
    this.loadStepData();
  }

  public static getInstance(): StepTrackingService {
    if (!StepTrackingService.instance) {
      StepTrackingService.instance = new StepTrackingService();
    }
    return StepTrackingService.instance;
  }

  public startSimulation(): void {
    if (this.simulationInterval) {
      return; // Already running
    }
    
    // Simulate step increments randomly between 1-3 steps every 2-5 seconds
    this.simulationInterval = window.setInterval(() => {
      const stepsToAdd = Math.floor(Math.random() * 3) + 1;
      this.stepCount += stepsToAdd;
      this.saveStepData();
      this.notifyListeners();
    }, Math.floor(Math.random() * 3000) + 2000);
    
    console.log('Step simulation started');
  }

  public stopSimulation(): void {
    if (this.simulationInterval) {
      window.clearInterval(this.simulationInterval);
      this.simulationInterval = null;
      console.log('Step simulation stopped');
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

  public addStepListener(listener: (steps: number) => void): () => void {
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
