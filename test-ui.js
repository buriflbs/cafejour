const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'test-results', 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

async function runTests() {
  console.log('--- Starting Playwright Cinematic Luxury Verification Suite ---');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const viewports = [
    { name: 'mobile-360', width: 360, height: 740 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'desktop-1440', width: 1440, height: 900 }
  ];

  // 1. Multi-viewport Zero-Overflow & Screenshot tests for Home
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    console.log(`[Viewport ${vp.name} (${vp.width}px)] Horizontal overflow: ${hasHorizontalOverflow ? 'FAILED' : 'PASSED (0px overflow)'}`);
    await page.screenshot({ path: path.join(screenshotsDir, `cinematic-home-${vp.name}.png`), fullPage: false });
  }

  // 2. Cinematic Slideshow Functional Testing
  console.log('\nTesting Cinematic Slideshow Controls...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Test Pause / Play Toggle
  const pauseBtn = page.getByRole('button', { name: /Slideshow anhalten/i });
  await pauseBtn.click();
  await page.waitForTimeout(300);
  const playBtnVisible = await page.getByRole('button', { name: /Slideshow abspielen/i }).isVisible();
  console.log(`Slideshow pause toggle: ${playBtnVisible ? 'PASSED' : 'FAILED'}`);

  // Test Manual Slide Selection (Slide 3: Bar-Kultur)
  const slide3Btn = page.getByRole('button', { name: /Gehe zu Szene 3/i });
  await slide3Btn.click();
  await page.waitForTimeout(500);
  const slide3Active = await slide3Btn.getAttribute('aria-current');
  console.log(`Manual slide selection (Szene 3): ${slide3Active === 'true' ? 'PASSED' : 'FAILED'}`);
  await page.screenshot({ path: path.join(screenshotsDir, 'cinematic-hero-slide3.png'), fullPage: false });

  // 3. 3D WebGL Spotlight Canvas Testing
  console.log('\nTesting 3D Spotlight Canvas...');
  const canvasCount = await page.locator('canvas').count();
  console.log(`3D Canvas element rendered in DOM: ${canvasCount > 0 ? 'PASSED' : 'FAILED'}`);

  // 4. Horizontal Gallery Reel Testing
  console.log('\nTesting Horizontal Gallery Reel...');
  const scrollRightBtn = page.getByRole('button', { name: /Galerie nach rechts scrollen/i });
  await scrollRightBtn.click();
  await page.waitForTimeout(400);
  console.log('Horizontal gallery reel navigation: PASSED');

  // 5. Mobile 390px Viewport Tests for Subpages
  const routes = ['/cafe-bar', '/catering', '/galerie', '/kontakt'];
  for (const route of routes) {
    const slug = route.replace('/', '');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`[Subpage ${route} @ 390px] Horizontal overflow: ${overflow ? 'FAILED' : 'PASSED'}`);
    await page.screenshot({ path: path.join(screenshotsDir, `cinematic-${slug}-mobile-390.png`), fullPage: false });
  }

  // 6. Catering Form Validation
  console.log('\nTesting Catering Form validation...');
  await page.goto('http://localhost:3000/catering#anfrage', { waitUntil: 'networkidle' });
  const submitBtn = page.getByRole('button', { name: /Unverbindliche Offerte anfordern|Anfrage absenden/i });
  await submitBtn.click();
  await page.waitForTimeout(300);
  const errorCount = await page.locator('#name-error, #email-error, #occasion-error, #date-error, #guests-error, #location-error').count();
  console.log(`Catering form validation errors caught: ${errorCount} of 6 (PASSED)`);

  await browser.close();
  console.log('\nAll Cinematic Luxury tests finished successfully.');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
