# New Case Study — Content Checklist

Everything you need to gather and enter to add one case study to the site. Built from the
actual Sanity schema, so the field names below match exactly what you see in the Studio.

There are **3 places** a case study touches:

1. **Case Study** document — the content itself
2. **Testimonial** document — the quote (optional, lives in its own collection)
3. **Case Studies Page** — where you switch the case study ON so it appears on the site

> ⚠️ The #1 reason a case study "doesn't show up": you created it but never added it to the
> **Case Studies Page** list (Step 3). Creating the document is not enough on its own.

---

## Quick gather list (collect this before you start)

For each new case study, you need:

- [ ] **Client / company name** (required)
- [ ] Client logo file (PNG, SVG, or WebP — transparent background) — _optional_
- [ ] Whether the logo is **dark** or **light** colored — _optional_
- [ ] Project **timeline** text, e.g. "March 2024 – Present" — _optional_
- [ ] A **description** of the project / scope (1–2 paragraphs) — _optional_
- [ ] A list of **key contributions** (bullet points) — _optional_
- [ ] Which **service** this work falls under (must already exist in the Services collection) — _optional_
- [ ] A **testimonial quote** + who said it (name + their title) — _optional_

If you only have the **client name**, you can still publish — everything else is optional.

---

## Step 1 — Create the Case Study document

Studio → **Case Study** → "Create new"

### Box tab (how it looks in the grid)

| Field                         | Required? | Notes                                                                                          |
| ----------------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| **Client Logo**               | Optional  | If empty, the client **name** is shown in the box instead. Add **Alt Text** if you upload one. |
| **Logo Color** (dark / light) | Optional  | Only appears once a logo is uploaded. Tells the site how to display it on colored backgrounds. |

### Case Study Details tab (the pop-up modal)

| Field                           | Required?       | Notes                                                                                                   |
| ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| **Client Name**                 | ✅ **Required** | The only mandatory field.                                                                               |
| **Date / Timeline**             | Optional        | Free text, e.g. "MARCH 2024 - PRESENT".                                                                 |
| **Description**                 | Optional        | Rich text. The project summary.                                                                         |
| **Contributions Section Title** | Optional        | Defaults to "KEY CONTRIBUTIONS" — leave as-is unless you want a different heading.                      |
| **Key Contributions**           | Optional        | Add one entry per achievement/deliverable. These become the bullet list.                                |
| **Related Service**             | Optional        | Links to a **Service** so the case study gets a filter tag on the grid. The service must already exist. |
| **Language**                    | Auto            | Leave the default unless you're adding a translated version.                                            |

**Publish** the document.

---

## Step 2 — Add the Testimonial (only if you have a quote)

Testimonials live in their **own collection**, not inside the case study.

Studio → **Testimonial** → "Create new"

| Field           | Required?                        | Notes                                                              |
| --------------- | -------------------------------- | ------------------------------------------------------------------ |
| **Name**        | ✅ **Required**                  | Person who gave the quote.                                         |
| **Quote**       | ✅ **Required**                  | The testimonial text.                                              |
| **Company**     | ⚠️ **Required for it to attach** | See the box below — this is how the quote finds its case study.    |
| **Position**    | Optional                         | Shown under the name in the modal.                                 |
| **Website URL** | Optional                         | Makes the company name clickable.                                  |
| **Avatar**      | Optional                         | If you add a photo, **Alt Text is required**.                      |
| **Featured**    | Optional                         | A simple on/off flag for filtering; doesn't change how it appears. |

> 🔗 **How a quote connects to a case study:** there is **no "pick a case study" dropdown.**
> The site matches them automatically by comparing the testimonial's **Company** to the case
> study's **Client Name**. They don't have to be identical (it ignores "Inc/LLC/Group" etc.),
> but one has to contain the other. If the **Company field is blank, or doesn't match the
> Client Name, the quote will NOT appear** in the case study. This is the most common reason a
> testimonial goes missing.

**Publish** the testimonial.

---

## Step 3 — Switch it ON (this is the step that's easy to forget)

A published case study is invisible until you add it here.

Studio → **Case Studies Page** → "📋 Case Studies" section

- [ ] Add the new case study to the **Case Studies** list
- [ ] Drag to set its order in the grid
- [ ] **Publish** the page

### Optional — also feature it on the homepage

Studio → **Homepage** → **Featured Case Studies Section**

- [ ] Add the case study to the **Featured Case Studies** list (max **6**)
- [ ] Make sure "Show this section" is on
- [ ] **Publish** the homepage

---

## Final check

- [ ] Case Study document published
- [ ] Testimonial published (if used) **and** its Company matches the Client Name
- [ ] Case study added to the **Case Studies Page** list and published
- [ ] (Optional) Added to Homepage featured list
- [ ] Open the live site → Case Studies → click the box → confirm the modal shows the
      description, contributions, and quote

---

## Required vs. optional — at a glance

**Truly required (minimum to publish a working case study):**

- Client Name
- Added to the Case Studies Page list

**Required only if you want a quote to show:**

- Testimonial Name + Quote + **Company that matches the Client Name**

**Everything else is optional** (logo, date, description, contributions, related service,
position, avatar, website URL, homepage feature).
