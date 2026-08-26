# docu.release.test

| 도구 | 주 용도 | 강점 | 한계점 |
| :--- | :--- | :--- | :--- |
| **Docusaurus (다큐공룡)** | 메인 기술 문서 / 사용자 가이드 사이트 | React/MDX 지원, 버전 관리(Versioning), 검색, 커스텀 UI | 단독으로 오프라인 문서(PDF) 변환 기능 부족 |
| **GitHub Releases** | 소프트웨어 바이너리 및 릴리즈 노트 배포 | 버전별 Changelog 관리, 빌드 아티팩트/PDF 첨부 | 구조화된 긴 매뉴얼을 브라우징하기에는 부적합 |
| **Puppeteer** | 자동화 캡처 및 PDF 생성 엔진 | CSS `@media print` 기반 고품질 PDF 렌더링 | 별도 빌드 스크립트 작성 및 템플릿 제어 필요 |
| **GitHub Wiki** | 가벼운 내부 협업 메모 / 단순 위키 | 설정 없이 즉시 사용 가능 | 버전 관리, 검색, 테마 확장성, CI/CD 연동이 제한적 |
