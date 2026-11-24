'use strict';

/**
 * Evidence Contract & Render Finish Gate Checker
 * Integrated with ECC ui-ux-master skill (from frontend-design-direction).
 * Validates that all required evidence fields are present and passing before
 * a UI implementation can be considered complete.
 */

const fs = require('fs');
const path = require('path');

function loadReport(reportPath) {
  const content = fs.readFileSync(reportPath, 'utf-8');
  return JSON.parse(content);
}

function validateReport(report) {
  const errors = [];
  const warnings = [];

  if (!report.contract || typeof report.contract !== 'string' || report.contract.trim().length === 0) {
    errors.push('contract: missing or empty product constraints');
  }

  if (!Array.isArray(report.targetViewports) || report.targetViewports.length === 0) {
    errors.push('targetViewports: must be a non-empty array of viewport strings');
  } else {
    const normalized = report.targetViewports.map(v => v.toLowerCase().replace(/\s/g, ''));
    const unique = new Set(normalized);
    if (unique.size !== normalized.length) {
      warnings.push('targetViewports: duplicate targets detected (case/whitespace-insensitive)');
    }
  }

  if (!report.accessibility || report.accessibility.status !== 'pass' || !report.accessibility.evidence) {
    errors.push('accessibility: must have status "pass" and nonempty evidence');
  }

  if (!report.responsive || report.responsive.status !== 'pass' || !report.responsive.evidence) {
    errors.push('responsive: must have status "pass" and nonempty evidence');
  }

  const requiredStates = ['loading', 'empty', 'error', 'partial', 'success', 'permission'];
  if (!report.contentStates || typeof report.contentStates !== 'object') {
    errors.push('contentStates: missing or not an object');
  } else {
    for (const state of requiredStates) {
      const entry = report.contentStates[state];
      if (!entry) {
        warnings.push(`contentStates.${state}: not provided`);
      } else if (entry.status === 'pass' && !entry.evidence) {
        errors.push(`contentStates.${state}: status "pass" requires nonempty evidence`);
      } else if (entry.status === 'not-applicable' && !entry.reason) {
        errors.push(`contentStates.${state}: status "not-applicable" requires a reason`);
      }
    }
  }

  if (!Array.isArray(report.renderedEvidence) || report.renderedEvidence.length === 0) {
    errors.push('renderedEvidence: must be a non-empty array');
  } else {
    const reportDir = path.dirname(path.resolve(reportPath));
    for (const entry of report.renderedEvidence) {
      if (!entry.viewport || typeof entry.viewport !== 'string') {
        errors.push('renderedEvidence entry: missing viewport');
      }
      if (!entry.artifact || typeof entry.artifact !== 'string') {
        errors.push('renderedEvidence entry: missing artifact path');
      } else {
        const artifactPath = path.resolve(reportDir, entry.artifact);
        if (!fs.existsSync(artifactPath)) {
          errors.push(`renderedEvidence artifact not found: ${entry.artifact}`);
        }
      }
      if (!entry.observation || typeof entry.observation !== 'string') {
        errors.push('renderedEvidence entry: missing observation');
      }
    }
  }

  return { errors, warnings, passed: errors.length === 0 };
}

const args = process.argv.slice(2);
const reportPath = args[0];

if (!reportPath) {
  console.error('Usage: node check-evidence.js <local-report.json>');
  process.exit(1);
}

try {
  const report = loadReport(reportPath);
  const { errors, warnings, passed } = validateReport(report);

  if (warnings.length > 0) {
    console.warn('WARNINGS:');
    for (const w of warnings) {
      console.warn(`  - ${w}`);
    }
  }

  if (passed) {
    console.log('PASS: Evidence contract is complete. All required fields present and passing.');
    process.exit(0);
  } else {
    console.error('FAIL: Evidence contract is incomplete or invalid:');
    for (const e of errors) {
      console.error(`  - ${e}`);
    }
    process.exit(1);
  }
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}