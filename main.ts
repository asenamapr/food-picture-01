// food-picture-01 entry: copy the repository's entry.png (a gourmet smash
// burger with molten cheddar and golden fries on dark slate) to the output
// path the grader reads. Node 22, standard library only. No network,
// fully deterministic: the same bytes go out on every run.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);
// Verify the copy by content, not just by size: a truncated or flipped-byte
// copy can share the source's byte count but never its SHA-256 digest.
// Fail loudly instead of shipping a corrupt copy.
const digest = (buf) => createHash('sha256').update(buf).digest('hex');
if (digest(readFileSync(src)) !== digest(readFileSync(dst))) {
  throw new Error('entry.png copy sha256 mismatch');
}
