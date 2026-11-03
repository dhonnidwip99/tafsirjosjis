import test from 'node:test';
import assert from 'node:assert/strict';
import { generateStandaloneHtml } from './exportHtml';

test('generateStandaloneHtml generates a valid single HTML file containing all required sections', () => {
  const html = generateStandaloneHtml();
  assert.ok(html.includes('<!DOCTYPE html>'));
  assert.ok(html.includes('TafsirPedia Mandiri'));
  assert.ok(html.includes('Amiri'));
  assert.ok(html.includes('MODULES'));
  assert.ok(html.includes('Al-Fatihah'));
  assert.ok(html.includes('Al-Ikhlas'));
  assert.ok(html.includes('Ash-Shamad'));
  assert.ok(html.includes('Asbabun Nuzul'));
  assert.ok(html.includes('Tafsir Ibnu Katsir'));
  assert.ok(html.includes('Tafsir Al-Jalalain'));
  assert.ok(html.includes('Tafsir Al-Muyassar'));
  assert.ok(html.includes('Tafsir Kemenag RI'));
  assert.ok(html.includes('Kuis'));
  assert.ok(html.includes('flipCard'));
  assert.ok(html.includes('adjustFontSize'));
  assert.ok(html.includes('toggleTheme'));
});
