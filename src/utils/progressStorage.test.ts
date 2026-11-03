import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProgressPercentage,
  evaluateQuizPerformance,
  toggleTopicCompletion,
  toggleFlashcardMastery,
} from './progressStorage';

test('calculateProgressPercentage correctly calculates percentages', () => {
  assert.equal(calculateProgressPercentage(0, 10), 0);
  assert.equal(calculateProgressPercentage(5, 10), 50);
  assert.equal(calculateProgressPercentage(10, 10), 100);
  assert.equal(calculateProgressPercentage(1, 3), 33);
  assert.equal(calculateProgressPercentage(0, 0), 0);
});

test('evaluateQuizPerformance returns appropriate grades and status', () => {
  const p1 = evaluateQuizPerformance(100);
  assert.equal(p1.grade, 'Mumtaz');
  assert.equal(p1.passed, true);

  const p2 = evaluateQuizPerformance(80);
  assert.equal(p2.grade, 'Jayyid Jiddan');
  assert.equal(p2.passed, true);

  const p3 = evaluateQuizPerformance(70);
  assert.equal(p3.grade, 'Jayyid');
  assert.equal(p3.passed, true);

  const p4 = evaluateQuizPerformance(60);
  assert.equal(p4.grade, 'Maqbul');
  assert.equal(p4.passed, true);

  const p5 = evaluateQuizPerformance(50);
  assert.equal(p5.grade, 'Rasib');
  assert.equal(p5.passed, false);
});

test('toggleTopicCompletion adds and removes topic IDs immutably', () => {
  const initial: string[] = ['topic-1'];
  const added = toggleTopicCompletion(initial, 'topic-2');
  assert.deepEqual(added, ['topic-1', 'topic-2']);

  const removed = toggleTopicCompletion(added, 'topic-1');
  assert.deepEqual(removed, ['topic-2']);
});

test('toggleFlashcardMastery toggles card IDs cleanly', () => {
  const initial: string[] = [];
  const added = toggleFlashcardMastery(initial, 'card-a');
  assert.deepEqual(added, ['card-a']);

  const removed = toggleFlashcardMastery(added, 'card-a');
  assert.deepEqual(removed, []);
});
