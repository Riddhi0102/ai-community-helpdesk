import * as assertNode from 'assert';
import fc from 'fast-check';
import { QueryProcessor } from '../src/services/QueryProcessor';

describe('AI Community Helpdesk - Invariant Core Property Test Execution Framework', () => {
  const testProcessor = new QueryProcessor();

  it('Property 6 validation check: Language response bounds structural integrity test', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 6, maxLength: 60 }),
        fc.constantFrom('en', 'hi'),
        async (fuzzedInputString, selectedLang) => {
          
          // Execute against the updated orchestrator parameter mapping
          const processOutput = await testProcessor.orchestrateQuery({
            text: fuzzedInputString,
            language: selectedLang,
            anonymousMode: true
          });

          // Invariant Check 1: Response must always return a string without dropping out entirely
          assertNode.ok(processOutput.response, "The system dropped context mapping and failed to generate text.");

          // Invariant Check 2: Latency boundaries should be healthy
          assertNode.ok(processOutput.performanceMetricMs >= 0, "Performance metrics tracking returned an invalid timestamp.");
        }
      ),
      { numRuns: 30 } // 30 randomized parameter generations
    );
  });
});