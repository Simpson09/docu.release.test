// scripts/generate-pdf.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Puppeteer 실행 중...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 127.0.0.1 및 정확한 문서 경로 지정
  const targetUrl = 'https://simpson09.github.io/docu.release.test/docu.release.test/docs/intro';
  
  console.log(`페이지 접근 중: ${targetUrl}`);
  const response = await page.goto(targetUrl, {
    waitUntil: 'networkidle0',
    timeout: 60000
  });

  // HTTP 상태 코드가 404인지 확인하는 방어 코드
  if (response && response.status() === 404) {
    throw new Error(`404 Not Found 에러 발생: ${targetUrl}`);
  }

  // 인쇄용 스타일 주입
  await page.addStyleTag({
    content: `
      nav.navbar, 
      .theme-doc-sidebar-container, 
      .pagination-nav, 
      footer.footer { 
        display: none !important; 
      }
      .main-wrapper { 
        width: 100% !important; 
        max-width: 100% !important; 
        padding: 0 !important; 
      }
    `
  });

  const outputDir = path.join(__dirname, '../static/files');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'Manual.pdf');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '15mm',
      right: '15mm'
    }
  });

  console.log(`PDF 생성 완료: ${outputPath}`);
  await browser.close();
})();