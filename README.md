# Resource Allocation System using Genetic Algorithm

This is a final year research work of a Bachelor of Computer Science student at the Department of Computer Science, Faculty of Applied Science, Trincomalee Campus, Eastern University of Sri Lanka.

1. **Population Initialization**: Create an initial population of possible solutions.
2. **Fitness Function**: Define a fitness function to evaluate how well each solution meets the constraints.
3. **Selection**: Select the best-performing solutions for reproduction.
4. **Crossover**: Combine selected solutions to create new offspring.
5. **Mutation**: Introduce random changes to offspring to maintain diversity.
6. **Termination**: Define a termination condition, such as a maximum number of generations or a satisfactory fitness score.

```javascript
class GeneticAlgorithm {
  constructor(populationSize, mutationRate, generations) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.generations = generations;
    this.population = [];
  }

  initializePopulation() {
    // Generate initial population
    // ...code to initialize population...
  }

  fitnessFunction(solution) {
    // Evaluate fitness of a solution
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

  mutate(solution) {
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
  }
}

// Example usage
const ga = new GeneticAlgorithm(100, 0.01, 1000);
ga.run();
```

The genetic algorithm for scheduling time tables in my campus department.

- there can  be a few batches (about 3-4, eg: 2019 batch, 2020 batch, 2021 batch, etc) students.
- for each batch, there are a number of courses (about 6-9, eg: CS2113, CS3211, EO1205, etc)
- there are a few halls that lecturers can conduct lectures in (eg: scala hall, python hall, java hall, etc)
- each course should have a specific amount of hours to cover with lectures (eg: the course CS3211 of the batch of 2019 should have 30 hours of lectures to be conducted)
- lectures are conducted in periods of the day. each weekday is divided into 8 one hour time slots (eg: slot 1, slot 2, slot 3, etc)
- there should be the lecturers of the department who conduct those lectures (eg: Mr sam, Ms jones, etc), and each with the subjects they can teach
- each batch of students have a number of students (eg: the batch of 2019 has 77 students)
- each hall has a capacity (eg: the scala hall has a capacity of 70, and the java hall has the capacity of 100)

Need to implement a genetic algorithm that will generate a time table, for each batch. The time tables should divide the halls and time slots along with the lectures that can teach the subjects.

The batch-vise time tables should contain:
- the time slots for each day in the week
- the course that is taught in each time slot (there can be free time slots)
- who teaches the each subject for the batch
- which hall is it taught in
