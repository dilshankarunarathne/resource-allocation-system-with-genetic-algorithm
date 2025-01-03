const express = require('express');
const router = express.Router();
const GeneticAlgorithm = require('../scheduler');

let batches = [];
let halls = [];
let lecturers = [];

router.post('/lecturers', (req, res) => {
  lecturers = req.body.lecturers;
  res.status(200).send('Lecturers information updated.');
});

router.post('/halls', (req, res) => {
  halls = req.body.halls;
  res.status(200).send('Halls information updated.');
});

router.post('/batches', (req, res) => {
  batches = req.body.batches;
  res.status(200).send('Batches information updated.');
});

router.get('/generate-timetable', (req, res) => {
  const ga = new GeneticAlgorithm(100, 0.01, 1000);
  ga.initializePopulation(batches, halls, lecturers);
  const bestTimetable = ga.run();
  res.status(200).json(bestTimetable);
});

module.exports = router;
