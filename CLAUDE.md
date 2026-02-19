# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Webflow-exported static marketing website** for **Fringe** (fringe.us), an employee experience platform. There is no build system, bundler, or package manager — pages are pre-compiled by Webflow and exported as static HTML.

## Architecture

- Each page is a standalone HTML file (or `index.html` inside a named directory)
- Base CSS is hosted on Webflow CDN (`cdn.prod.website-files.com`) and should not be edited
- **`style.css`** in the root is the custom override stylesheet — all theme customizations go here
- JavaScript comes from Webflow CDN (jQuery 3.5.1) and third-party scripts (Finsweet, Osano CMP, GTM)

## Custom Theme Colors

Defined as CSS custom properties in `style.css`:

```
--color-primary:   #010101   (dark background)
--color-secondary: #6e45ff   (purple accent)
--color-tertiary:  #3dfd98   (green accent)
```

Always use `var(--color-primary)`, `var(--color-secondary)`, `var(--color-tertiary)` — never hardcode hex values.

## Key CSS Patterns

- Webflow classes use BEM-like naming: `.section_home-hero`, `.home-hero_pillar`, `.tab-link_bg`
- Use `!important` when overriding Webflow CDN styles (they have high specificity)
- Use `background` shorthand (not `background-color`) to override gradient backgrounds
- Typography: `.heading-style-h1`, `.text-size-large`, `.text-weight-bold`, `.text-color-tertiary`
- Layout containers: `.container-large`, `.container-medium`, `.container-small`
- Responsive breakpoints: desktop (≥992px), tablet (≤991px), mobile (≤767px)

## Directory Structure

- `/platform/` — Product feature pages (rewards-recognition, lifestyle-benefits, etc.)
- `/solutions/` — Solution pages (wellness-challenges, spending-account, etc.)
- `/blog/`, `/news/`, `/podcast/` — Content sections with pagination subdirectories
- `/customer-stories/`, `/case-studies/` — Testimonials and case studies
- `/about`, `/pricing`, `/faq`, `/help` — Standard marketing pages

## How to Make Changes

1. **Styling changes** → Edit `style.css` only. Do not modify inline `<style>` blocks or CDN-hosted CSS.
2. **Content/structure changes** → Edit the relevant HTML file directly.
3. **Adding the custom stylesheet to a new page** → Add `<link href="/style.css" rel="stylesheet" type="text/css" />` after the Webflow CSS links in `<head>`.

## Third-Party Integrations

- **Lottie animations**: JSON-based, configured via `data-animation-type="lottie"` attributes
- **Webflow Interactions**: Targeted via `data-w-id` UUIDs — do not change these IDs
- **Finsweet**: `@finsweet/attributes-scrolldisable` for scroll management
- **Osano**: Cookie consent banner (loaded from `cmp.osano.com`)
- **Google Tag Manager**: Analytics tracking
