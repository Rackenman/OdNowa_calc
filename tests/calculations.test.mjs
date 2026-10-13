import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import { calculateSyntheticScore } from '../src/data/calculateSyntheticScore.js';

const presetSource = readFileSync(new URL('../src/data/examplePresets.ts', import.meta.url), 'utf8');
const presetJavascript = ts.transpileModule(presetSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { calculationModels, educationalExampleValues } = await import(
  `data:text/javascript;base64,${Buffer.from(presetJavascript).toString('base64')}`
);

const exampleValues = {
  u: educationalExampleValues.poverty,
  b: educationalExampleValues.unemployment,
  p: educationalExampleValues.safety,
  e: educationalExampleValues.education,
  w: educationalExampleValues.participation,
};

const assertCloseTo = (actual, expected) => {
  assert.ok(Math.abs(actual - expected) < 1e-10, `expected ${actual} to be close to ${expected}`);
};

test('przykładowe dane dają oczekiwane wyniki dla modeli A, B i C', () => {
  const expectedScores = { 'model-a': 4.62, 'model-b': 4.33, 'model-c': 4.1 };

  for (const [modelId, model] of Object.entries(calculationModels)) {
    assertCloseTo(calculateSyntheticScore(exampleValues, model.weights), expectedScores[modelId]);
  }
});

test('wynik wynosi zero dla zerowych wskaźników i dziesięć dla maksymalnych', () => {
  const zeroValues = { u: 0, b: 0, p: 0, e: 0, w: 0 };
  const maximumValues = { u: 10, b: 10, p: 10, e: 10, w: 10 };

  for (const model of Object.values(calculationModels)) {
    assert.equal(calculateSyntheticScore(zeroValues, model.weights), 0);
    assertCloseTo(calculateSyntheticScore(maximumValues, model.weights), 10);
  }
});

test('zmiana pojedynczego wskaźnika wpływa na wynik zgodnie z jego wagą', () => {
  const values = { u: 0, b: 0, p: 2.5, e: 0, w: 0 };

  for (const model of Object.values(calculationModels)) {
    assertCloseTo(calculateSyntheticScore(values, model.weights), 2.5 * model.weights.p);
  }
});

test('wagi każdego modelu sumują się do jedności', () => {
  for (const model of Object.values(calculationModels)) {
    const weightSum = Object.values(model.weights).reduce((sum, weight) => sum + weight, 0);
    assertCloseTo(weightSum, 1);
  }
});

test('obliczanie kolejnych modeli nie zmienia wspólnych wartości wejściowych', () => {
  const values = Object.freeze({ ...exampleValues });
  const originalValues = { ...values };

  for (const model of Object.values(calculationModels)) {
    calculateSyntheticScore(values, model.weights);
  }

  assert.deepEqual(values, originalValues);
});