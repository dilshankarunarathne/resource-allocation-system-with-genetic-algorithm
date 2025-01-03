class GeneticAlgorithm {
  constructor(populationSize, mutationRate, generations) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.generations = generations;
    this.population = [];
  }

  initializePopulation(batches, halls, lecturers) {
    this.batches = batches;
    this.halls = halls;
    this.lecturers = lecturers;
    this.population = [];
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
    for (const batch in timetable) {
      for (const day of timetable[batch]) {
        for (const slot of day) {
          const hall = this.halls.find(h => h.name === slot.hall);
          if (hall) {
            const hallCapacity = hall.capacity;
            const batchSize = this.batches.find(b => b.name === batch).size;
            if (hallCapacity >= batchSize) fitness++;
          }
          const lecturer = this.lecturers.find(l => l.name === slot.lecturer);
          if (lecturer) {
            const lecturerCourses = lecturer.courses;
            if (lecturerCourses.includes(slot.course)) fitness++;
          }
        }
      }
    }
    return fitness;
  }

  selection() {
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

module.exports = GeneticAlgorithm;
