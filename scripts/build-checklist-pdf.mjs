// Builds a brand-styled PDF of the case study checklist following
// fabapps-web/DESIGN.md (Parafina headlines, Atkinson body, Space Grotesk UI,
// blue dot mark, light ground + soft lifted card). Self-contained: fonts are
// base64 embedded so the PDF renders identically anywhere.

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire('/Users/fabian/fabulousapps/fabapps-web/');
const puppeteer = require('puppeteer');

const FONT_DIR = '/Users/fabian/fabulousapps/fabapps-web/public/fonts';
const OUT = '/Users/fabian/fabulousapps/clients/jessica-weeman/weemston-consulting/docs/case-study-checklist.pdf';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const b64 = (file) => readFileSync(`${FONT_DIR}/${file}`).toString('base64');
const parafina = b64('Parafina-BlackL.woff2');
const atkinson = b64('AtkinsonHyperlegibleNextVF-Variable.woff2');
const grotesk = b64('SpaceGrotesk-VariableFont_wght.woff2');
const spartan = b64('LeagueSpartan-Regular.woff2');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family:'Parafina'; src:url(data:font/woff2;base64,${parafina}) format('woff2'); font-weight:900; font-display:block; }
  @font-face { font-family:'Atkinson'; src:url(data:font/woff2;base64,${atkinson}) format('woff2'); font-weight:100 900; font-display:block; }
  @font-face { font-family:'Grotesk'; src:url(data:font/woff2;base64,${grotesk}) format('woff2'); font-weight:300 700; font-display:block; }
  @font-face { font-family:'Spartan'; src:url(data:font/woff2;base64,${spartan}) format('woff2'); font-weight:400; font-display:block; }

  :root{
    --ink:#131313; --text:#1c1917; --ground:#f1f5f9; --surface:#f8fafc;
    --hairline:#e2e8f0; --chrome:#272521; --mark:#0000ff; --muted:rgba(19,19,19,.52);
  }
  *{ box-sizing:border-box; margin:0; padding:0; }
  @page{ size:letter; margin:0; }
  html,body{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  body{
    background:var(--ground); color:var(--text);
    font-family:'Grotesk',system-ui,sans-serif; line-height:1.6;
    width:8.5in; height:11in; padding:0.5in;
  }
  .card{
    background:var(--surface); border-radius:32px; height:100%;
    padding:54px 60px 40px; position:relative;
    box-shadow:0 20px 60px -25px rgba(0,0,0,.45);
    border:1px solid rgba(0,0,0,.05);
    display:flex; flex-direction:column;
  }

  .head{
    display:flex; align-items:baseline; justify-content:space-between;
    padding-bottom:16px; margin-bottom:34px; border-bottom:1px solid var(--hairline);
  }
  .head .meta{ font-family:'Grotesk'; font-weight:500; font-size:10.5px; text-transform:uppercase; letter-spacing:.18em; color:var(--muted); }

  .eyebrow{
    font-family:'Grotesk'; font-weight:500; font-size:11px; text-transform:uppercase;
    letter-spacing:.22em; color:var(--muted);
  }
  h1{
    font-family:'Parafina'; font-weight:900; text-transform:uppercase;
    color:var(--ink); font-size:52px; line-height:.96; letter-spacing:0;
    -webkit-text-stroke:.6px var(--ink); margin:0;
  }
  h1 .dot{ color:var(--mark); -webkit-text-stroke:0; }
  .lede{
    font-size:14.5px; color:var(--text); max-width:64ch; margin-top:18px;
    opacity:.9;
  }

  .chip{
    display:inline-block; font-family:'Grotesk'; font-weight:500; font-size:10.5px;
    text-transform:uppercase; letter-spacing:.18em; color:var(--ink);
    background:var(--hairline); border-radius:8px; padding:6px 12px;
  }
  section{ margin-top:26px; }
  section.optional{ margin-top:30px; }
  .rows{ margin-top:16px; display:flex; flex-direction:column; gap:13px; }

  .row{ display:flex; gap:14px; align-items:flex-start; }
  .box{
    width:21px; height:21px; flex:0 0 21px; margin-top:1.5px;
    border:1.6px solid rgba(19,19,19,.32); border-radius:7px; background:#fff;
  }
  .row .label{ font-size:14.5px; color:var(--text); }
  .row .label b{ font-weight:700; color:var(--ink); }
  .row .hint{ color:var(--muted); }

  .nest{ margin-top:1px; margin-left:35px; display:flex; flex-direction:column; gap:11px; }
  .nest .box{ width:18px; height:18px; flex-basis:18px; border-radius:6px; }
  .nest .label{ font-size:13.5px; }

  .foot{
    margin-top:auto; padding-top:22px; display:flex; align-items:flex-end;
    justify-content:space-between; border-top:1px solid var(--hairline);
  }
  .wordmark{ font-family:'Spartan'; font-size:34px; line-height:.85; color:var(--ink); letter-spacing:-0.04em; }
  .wordmark .dot{ color:var(--mark); }
  .foot .meta{ font-family:'Grotesk'; font-weight:400; font-size:10px; text-transform:uppercase; letter-spacing:.16em; color:var(--muted); }
</style>
</head>
<body>
  <div class="card">
    <div class="head">
      <span class="meta">Weemston Consulting</span>
      <span class="meta">Fabulous Apps</span>
    </div>
    <h1>New case study<br>Checklist<span class="dot">.</span></h1>

    <section class="required">
      <span class="chip">Required</span>
      <div class="rows">
        <div class="row"><div class="box"></div><div class="label"><b>Client or organization name</b></div></div>
      </div>
    </section>

    <section class="optional">
      <span class="chip">Optional (include whatever you have)</span>
      <div class="rows">
        <div class="row"><div class="box"></div><div class="label"><b>Logo</b><span class="hint">: transparent background, as PNG, SVG, or WebP</span></div></div>
        <div class="row"><div class="box"></div><div class="label">What is the <b>color of the logo?</b></div></div>
        <div class="nest">
          <div class="row"><div class="box"></div><div class="label"><b>Dark</b></div></div>
          <div class="row"><div class="box"></div><div class="label"><b>Light</b></div></div>
        </div>
        <div class="row"><div class="box"></div><div class="label"><b>Project timeline</b><span class="hint">, e.g. March 2024 to Present</span></div></div>
        <div class="row"><div class="box"></div><div class="label"><b>Description</b><span class="hint">: a sentence or two on what the project was about</span></div></div>
        <div class="row"><div class="box"></div><div class="label"><b>Key contributions</b><span class="hint">: a few bullet points on what was delivered</span></div></div>
        <div class="row"><div class="box"></div><div class="label">Which <b>service</b> this work falls under</div></div>
        <div class="row"><div class="box"></div><div class="label"><b>Testimonial</b> <span class="hint">(skip if there is no quote).</span> If you have one, I need all of these together:</div></div>
        <div class="nest">
          <div class="row"><div class="box"></div><div class="label">The <b>quote</b></div></div>
          <div class="row"><div class="box"></div><div class="label"><b>Who said it</b><span class="hint">: full name</span></div></div>
          <div class="row"><div class="box"></div><div class="label">Their <b>company or organization</b></div></div>
          <div class="row"><div class="box"></div><div class="label">Their <b>job title or role</b> <span class="hint">(if they have one)</span></div></div>
        </div>
      </div>
    </section>

    <div class="foot">
      <span class="wordmark">fab<span class="dot">.</span></span>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: OUT, width: '8.5in', height: '11in', printBackground: true, pageRanges: '1' });
await browser.close();
console.log('PDF written:', OUT);
