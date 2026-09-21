import fs from 'node:fs/promises';
import { backtest } from './backtest.js';
import { fixtureStrategy } from './fixtureStrategy.js';
const snapshots=JSON.parse(await fs.readFile(new URL('../fixtures/snapshots.json',import.meta.url)));
console.log(JSON.stringify({mode:'fixture-paper-backtest',...backtest(snapshots,fixtureStrategy)},null,2));
