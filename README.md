# Resource Allocation System using Genetic Algorithm

This project is a final year research work by a Bachelor of Computer Science student at the Department of Computer Science, Faculty of Applied Science, Trincomalee Campus, Eastern University of Sri Lanka.

[![Version](https://img.shields.io/badge/version-1.0-brightgreen.svg)](https://pypi.org/project/ad-topic-recommender/)
[![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-blue.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Overview

The "Resource Allocation System Using Genetic Algorithm" aims to solve the problem of scheduling resources across multiple batches within the Department of Computer Science. The system uses a genetic algorithm to generate optimal timetables that satisfy various constraints.

## Genetic Algorithm Implementation

The genetic algorithm is the core technique used in this project. It simulates evolution by iteratively generating, evaluating, and refining potential solutions.

### Key Steps

1. **Population Initialization**: Create an initial population of possible solutions.
2. **Fitness Function**: Define a fitness function to evaluate how well each solution meets the constraints.
3. **Selection**: Select the best-performing solutions for reproduction.
4. **Crossover**: Combine selected solutions to create new offspring.
5. **Mutation**: Introduce random changes to offspring to maintain diversity.
6. **Termination**: Define a termination condition, such as a maximum number of generations or a satisfactory fitness score.

### Example Code

```javascript
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
    // ...code to initialize population...
  }

  generateRandomTimetable() {
    // Generate a random timetable
    // ...code to generate random timetable...
  }

  fitnessFunction(timetable) {
    // Evaluate fitness of a timetable
    // ...code to calculate fitness...
  }

  selection() {
    // Select the best solutions
    // ...code for selection...
  }

  crossover(parent1, parent2) {
    // Combine parents to create offspring
    // ...code for crossover...
  }

  mutate(timetable) {
    // Introduce random changes
    // ...code for mutation...
  }

  run() {
    this.initializePopulation();
    for (let generation = 0; generation < this.generations; generation++) {
      // Evaluate fitness of each solution
      // ...code to evaluate fitness...

      // Select the best solutions
      // ...code for selection...

      // Create new population through crossover and mutation
      // ...code for creating new population...

      // Check termination condition
      // ...code to check termination...
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

function displayTimetable(timetable) {
  for (const batch in timetable) {
    console.log(`\nTimetable for Batch: ${batch}`);
    console.log('Day\tSlot\tCourse\tHall\tLecturer');
    timetable[batch].forEach((day, dayIndex) => {
      day.forEach((slot, slotIndex) => {
        console.log(`${dayIndex + 1}\t${slotIndex + 1}\t${slot.course}\t${slot.hall.name}\t${slot.lecturer.name}`);
      });
    });
  }
}

displayTimetable(bestTimetable);
```

## Project Requirements

- **Batches**: 3-4 batches (e.g., 2019 batch, 2020 batch, 2021 batch)
- **Courses**: Each batch has 6-9 courses (e.g., CS2113, CS3211, EO1205)
- **Halls**: Several halls for lectures (e.g., scala hall, python hall, java hall)
- **Lecturers**: Department lecturers who conduct lectures (e.g., Mr Sam, Ms Jones)
- **Time Slots**: Each weekday is divided into 8 one-hour time slots
- **Constraints**: 
  - Unique time slots for courses across batches
  - Lecturer availability
  - Hall capacity
  - No overlapping schedules for students

## Output

The generated timetables will include:
- Time slots for each day of the week
- Courses taught in each time slot
- Lecturer for each course
- Hall where each course is taught
- 
## License

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]  
[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa] 

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

## Contact Information

For questions or feedback, please contact the author:

- Author: Dilshan M. Karunarathne
- Email: [ceo@aztra.lk](ceo@aztra.lk)
- Website: [http://www.aztra.lk](http://www.aztra.lk)
