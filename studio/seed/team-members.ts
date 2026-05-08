/**
 * Seed: Our Team Page singleton + Jennifer & Sarah team member documents.
 *
 * Runs the original copy from the hardcoded /our-team page into Sanity so
 * the CMS-driven version renders identically without any manual entry.
 *
 * Usage (from /studio):
 *   bun run seed:team
 *
 * Idempotent — uses `createOrReplace` keyed by stable document IDs, so
 * re-running overwrites with the same content. Image assets re-upload on
 * each run; older copies become unreferenced and Sanity's GC will clean
 * them up.
 *
 * Writes to whatever dataset the CLI is currently pointed at (production
 * by default). Authenticated via your CLI session (`--with-user-token`).
 */
import { getCliClient } from 'sanity/cli';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '../..');

const client = getCliClient();

interface UploadedImage {
  _id: string;
}

async function uploadImage(
  relativePath: string,
  filename: string
): Promise<UploadedImage> {
  const fullPath = resolve(REPO_ROOT, relativePath);
  const buffer = await readFile(fullPath);
  console.log(`  Uploading ${filename}…`);
  const asset = await client.assets.upload('image', buffer, { filename });
  console.log(`  ✓ Uploaded ${filename} → ${asset._id}`);
  return { _id: asset._id };
}

function block(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }],
  };
}

function pullQuote(key: string, text: string) {
  return { _type: 'pullQuote', _key: key, text };
}

async function seed() {
  console.log('\n→ Seeding Our Team content\n');

  // Clean up any old documents that used dot-separated IDs (those were
  // treated as system documents by Sanity and not queryable publicly).
  console.log('• Cleaning up old (dotted) document IDs if present…');
  await client
    .delete({
      query:
        '*[_id in ["teamMember.jennifer-scully", "teamMember.sarah-przybocki"]]',
    })
    .catch(() => undefined);
  console.log('  ✓ Cleanup done');

  // 1. Upload portraits
  console.log('• Uploading portraits…');
  const jenniferImage = await uploadImage(
    'frontend/src/assets/team/jennifer-scully.png',
    'jennifer-scully.png'
  );
  const sarahImage = await uploadImage(
    'frontend/src/assets/team/sarah-przybocki.jpeg',
    'sarah-przybocki.jpeg'
  );

  // 2. Create Our Team Page singleton
  console.log('\n• Creating Our Team Page singleton…');
  await client.createOrReplace({
    _id: 'teamPage-en',
    _type: 'teamPage',
    title: 'Our Team | Weemston Consulting',
    metaDescription:
      'Meet the people behind Weemston Consulting — Jennifer L. Scully, Ed.D. and Sarah Przybocki.',
    heroHeading: 'Our Team',
    heroHeadingHighlight: 'Team',
    heroTagline: 'The people behind Weemston Consulting',
  });
  console.log('  ✓ teamPage-en');

  // 3. Create Jennifer
  console.log('\n• Creating team member: Jennifer L. Scully, Ed.D.…');
  await client.createOrReplace({
    _id: 'teamMember-jennifer-scully',
    _type: 'teamMember',
    name: 'Jennifer L. Scully, Ed.D.',
    nameAccent: 'Scully',
    role: 'Office Manager',
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: jenniferImage._id },
      alt: 'Portrait of Jennifer L. Scully, Office Manager at Weemston Consulting',
    },
    bio: [
      block(
        'jenn-p1',
        "Jennifer L. Scully, Ed.D., is Weemston Consulting's Office Manager, keeping the practice running behind the scenes so client work stays the focus. She owns the operational rhythm of the firm, from internal systems and cross-client coordination to invoicing and scheduling."
      ),
      pullQuote(
        'jenn-pq',
        'A steady, people-first approach is what she brings to Weemston every day.'
      ),
      block(
        'jenn-p2',
        'Jenn brings more than 30 years of leadership experience, with a career spent building the systems, structures, and culture that allow organizations to run well and people to do their best work. She has led teams through growth, change, and complexity, and that operational instinct, combined with a steady, people-first approach, is what she brings to Weemston every day.'
      ),
      block(
        'jenn-p3',
        'Her leadership career has been in education, in roles including teacher, coach, Dean of Admissions, Assistant Head of School, and Head of School at Maplebrook School. Her work has long centered on coaching, mentoring, crisis management, and strategic planning, and she has developed and implemented mentoring programs for schools and organizations and presented on these topics at national and international conferences. She currently serves as Professor of Practice in the School of Education at Marymount University and remains actively engaged in professional service, including as an editor for the International Journal of Mentoring and Coaching in Education.'
      ),
      block(
        'jenn-p4',
        "Jenn also supports Jessica's coaching practice, The Authentic Collective, putting her deep background in mentoring, program design, and human development to work programmatically as the practice grows."
      ),
    ],
    order: 10,
    language: 'en',
  });
  console.log('  ✓ teamMember-jennifer-scully');

  // 4. Create Sarah
  console.log('\n• Creating team member: Sarah Przybocki…');
  await client.createOrReplace({
    _id: 'teamMember-sarah-przybocki',
    _type: 'teamMember',
    name: 'Sarah Przybocki',
    nameAccent: 'Przybocki',
    role: 'Client Engagement and Events Manager',
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: sarahImage._id },
      alt: 'Portrait of Sarah Przybocki, Client Engagement and Events Manager at Weemston Consulting',
    },
    bio: [
      block(
        'sar-p1',
        "Sarah Przybocki is Weemston Consulting's Client Engagement and Events Manager. She is a project manager with extensive events experience and a background in HR initiatives and cross-functional projects, where she has built a reputation for keeping complex work on track and the people inside it well-supported."
      ),
      block(
        'sar-p2',
        "Sarah holds a B.S. in Psychology from the University of Maryland and a Graduate Certificate in Project Management from the University of Maryland Global Campus. That combination shows up in how she works, with one foot in the operational rhythm of a project and the other in the human dynamics that make it succeed. She brings a human-centered, systems-thinking approach to everything she touches, whether she's holding the operational rhythm of a complex engagement, managing a client relationship, or supporting an event from planning through onsite. Sarah is at her best working behind the scenes so leaders and teams can stay focused on what only they can do."
      ),
      pullQuote('sar-pq', 'Steady, thoughtful, and quietly indispensable.'),
      block(
        'sar-p3',
        'Beyond project delivery, Sarah is a natural mentor and team builder. She regularly supports early-career colleagues, gathers actionable feedback, and develops resources and frameworks that help teams grow into high-performing, collaborative cultures. Clients and colleagues describe her as steady, thoughtful, and quietly indispensable.'
      ),
      block(
        'sar-p4',
        'Outside of work, Sarah is usually outside, with family and friends, or trying her hand at a new craft.'
      ),
    ],
    order: 20,
    language: 'en',
  });
  console.log('  ✓ teamMember-sarah-przybocki');

  console.log(
    '\n✓ Done. /our-team should now render with Jennifer and Sarah.\n'
  );
}

seed().catch((err) => {
  console.error('\n✗ Seed failed:', err);
  process.exit(1);
});
