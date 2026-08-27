// scripts/generate-pdf.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Puppeteer 실행 중...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // CI 환경 필수 옵션
  });

  const page = await browser.newPage();

  // Docusaurus 로컬 서빙 주소 (기본 포트: 3000 또는 8080)
  const targetUrl = 'http://localhost:3000/docu.release.test/docs/intro';
  
  console.log(`페이지 접근 중: ${targetUrl}`);
  await page.goto(targetUrl, {
    waitUntil: 'networkidle0', // 모든 리소스 로딩 완료 대기
    timeout: 60000
  });

  // 인쇄용 스타일 주입: 사이드바, 내비게이션 바, 푸터 숨김 처리
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

  // PDF 저장 경로 설정
  const outputDir = path.join(__dirname, '../static/files');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'Manual.pdf');

  // PDF 렌더링
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