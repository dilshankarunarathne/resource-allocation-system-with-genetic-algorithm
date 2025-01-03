class GeneticAlgorithm {
  constructor(batches, halls, lecturers, populationSize, mutationRate, generations) {
    this.batches = batches;
    this.halls = halls;
    this.lecturers = lecturers;
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.generations = generations;
    this.population = [];
  }

  initializePopulation() {
    // Generate initial population
    for (let i = 0; i < this.populationSize; i++) {
      const timetable = this.generateRandomTimetable();
      this.population.push(timetable);
    }
  }

  generateRandomTimetable() {
    const timetable = {};
    for (const batch of this.batches) {
      timetable[batch.name] = [];
      for (let day = 0; day < 5; day++) {
        const daySchedule = [];
        for (let slot = 0; slot < 8; slot++) {
          const course = batch.courses[Math.floor(Math.random() * batch.courses.length)];
          const hall = this.halls[Math.floor(Math.random() * this.halls.length)];
          const lecturer = this.lecturers[Math.floor(Math.random() * this.lecturers.length)];
          daySchedule.push({ course, hall, lecturer });
        }
        timetable[batch.name].push(daySchedule);
      }
    }
    return timetable;
  }

  fitnessFunction(timetable) {
    let fitness = 0;
    // Evaluate fitness based on constraints
    for (const batch in timetable) {
      for (const day of timetable[batch]) {
        for (const slot of day) {
          // Check hall capacity
          const hallCapacity = this.halls.find(h => h.name === slot.hall).capacity;
          const batchSize = this.batches.find(b => b.name === batch).size;
          if (hallCapacity >= batchSize) fitness++;

          // Check lecturer availability
          const lecturerCourses = this.lecturers.find(l => l.name === slot.lecturer).courses;
          if (lecturerCourses.includes(slot.course)) fitness++;
        }
      }
    }
    return fitness;
  }

  selection() {
    // Select the best solutions
    this.population.sort((a, b) => this.fitnessFunction(b) - this.fitnessFunction(a));
    return this.population.slice(0, this.populationSize / 2);
  }

  crossover(parent1, parent2) {
    const offspring = {};
    for (const batch in parent1) {
      offspring[batch] = [];
      for (let day = 0; day < 5; day++) {
        const daySchedule = [];
        for (let slot = 0; slot < 8; slot++) {
          const gene = Math.random() > 0.5 ? parent1[batch][day][slot] : parent2[batch][day][slot];
          daySchedule.push(gene);
        }
        offspring[batch].push(daySchedule);
      }
    }
    return offspring;
  }

  mutate(timetable) {
    for (const batch in timetable) {
      for (const day of timetable[batch]) {
        for (const slot of day) {
          if (Math.random() < this.mutationRate) {
            const batchCourses = this.batches.find(b => b.name === batch).courses;
            const course = batchCourses[Math.floor(Math.random() * batchCourses.length)];
            const hall = this.halls[Math.floor(Math.random() * this.halls.length)];
            const lecturer = this.lecturers[Math.floor(Math.random() * this.lecturers.length)];
            slot.course = course;
            slot.hall = hall;
            slot.lecturer = lecturer;
          }
        }
      }
    }
  }

  run() {
    this.initializePopulation();
    for (let generation = 0; generation < this.generations; generation++) {
      const selected = this.selection();
      const newPopulation = [];
      while (newPopulation.length < this.populationSize) {
        const parent1 = selected[Math.floor(Math.random() * selected.length)];
        const parent2 = selected[Math.floor(Math.random() * selected.length)];
        const offspring = this.crossover(parent1, parent2);
        this.mutate(offspring);
        newPopulation.push(offspring);
      }
      this.population = newPopulation;
    }
    return this.population[0];
  }
}

// Example usage
const batches = [
  { name: '2019', size: 77, courses: ['CS2113', 'CS3211', 'EO1205'] },
  { name: '2020', size: 80, courses: ['CS1101', 'CS2202', 'CS3303'] },
  { name: '2021', size: 85, courses: ['CS2113', 'CS2202', 'CS3303'] }
];

const halls = [
  { name: 'scala hall', capacity: 70 },
  { name: 'python hall', capacity: 100 },
  { name: 'java hall', capacity: 50 }
];

const lecturers = [
  { name: 'Mr Sam', courses: ['CS2113', 'CS3211'] },
  { name: 'Ms Jones', courses: ['EO1205', 'CS1101'] },
  { name: 'Dr Smith', courses: ['CS2202', 'CS3303'] }
];

const ga = new GeneticAlgorithm(batches, halls, lecturers, 100, 0.01, 1000);
const bestTimetable = ga.run();
console.log(bestTimetable);
