const { chromium } = require('./node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const qa = {};
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const logs = [];

  desktop.on('console', (msg) => {
    if (['warning', 'error'].includes(msg.type())) logs.push({ type: msg.type(), text: msg.text() });
  });
  desktop.on('pageerror', (err) => logs.push({ type: 'pageerror', text: err.message }));

  await desktop.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  qa.title = await desktop.title();
  qa.url = desktop.url();
  qa.heroVisible = await desktop.getByRole('heading', { name: 'cocote 4 litre BBF' }).isVisible();
  qa.buyVisible = await desktop.getByRole('link', { name: 'اشتري الآن' }).first().isVisible();

  await desktop.locator('button[aria-label="عرض صورة 2"]').click();
  qa.thumb2Selected = await desktop
    .locator('button[aria-label="عرض صورة 2"]')
    .evaluate((el) => el.className.includes('border-[#C62828]'));

  await desktop.getByRole('link', { name: 'اشتري الآن' }).first().click();
  await desktop.getByRole('button', { name: 'زيادة الكمية' }).click();
  await desktop.getByRole('button', { name: 'زيادة الكمية' }).click();
  await desktop.getByText('التوصيل إلى المكتب').click();
  qa.totalAfterQtyOffice = await desktop.locator('aside').getByText(/د\.ج/).last().textContent();

  await desktop.getByRole('button', { name: 'تأكيد الطلب' }).click();
  qa.validationVisible = await desktop.getByText('الاسم الكامل مطلوب').isVisible();

  await desktop.getByPlaceholder('مثال: أحمد بن علي').fill('أحمد بن علي');
  await desktop.getByPlaceholder('0550 00 00 00').fill('0550000000');
  await desktop.getByPlaceholder('الجزائر').fill('الجزائر');
  await desktop.getByPlaceholder('البلدية').fill('باب الزوار');
  await desktop.getByPlaceholder('العنوان الكامل للتوصيل').fill('حي السلام رقم 12');
  await desktop.getByRole('button', { name: 'تأكيد الطلب' }).click();
  await desktop.getByText('تم تأكيد الطلب').waitFor({ state: 'visible', timeout: 5000 });
  qa.successVisible = await desktop.getByText('تم تأكيد الطلب').isVisible();
  qa.consoleLogs = logs;

  await desktop.screenshot({ path: `${process.env.TEMP}/bbf-desktop.png`, fullPage: false });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1 });
  const mobileLogs = [];
  mobile.on('console', (msg) => {
    if (['warning', 'error'].includes(msg.type())) mobileLogs.push({ type: msg.type(), text: msg.text() });
  });
  await mobile.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  qa.mobileHeroVisible = await mobile.getByRole('heading', { name: 'cocote 4 litre BBF' }).isVisible();
  qa.mobileStickyVisible = await mobile.getByRole('link', { name: 'اشتري الآن' }).last().isVisible();
  await mobile.screenshot({ path: `${process.env.TEMP}/bbf-mobile.png`, fullPage: false });
  qa.mobileLogs = mobileLogs;

  await browser.close();
  console.log(JSON.stringify(qa, null, 2));
})();
