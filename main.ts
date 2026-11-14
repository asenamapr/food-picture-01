// food-picture-01 entry: copy the repository's entry.png (a gourmet smash
// burger with molten cheddar and golden fries on dark slate) to the output
// path the grader reads. Node 22, standard library only. No network,
// fully deterministic: the same bytes go out on every run.
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);
// Fail loudly instead of shipping a truncated copy: the output must be
// byte-for-byte the image the repository holds.
if (statSync(src).size !== statSync(dst).size) {
  throw new Error('entry.png copy size mismatch');
}
