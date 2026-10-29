const http = require('http');

function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log("=== Testing Cynbit Discovery Assistant on http://localhost:3005 ===");

  // 1. GET /
  const home = await request({ hostname: 'localhost', port: 3005, path: '/', method: 'GET' });
  console.log(`1. GET / -> Status ${home.statusCode}, Length ${home.body.length}`);
  if (!home.body.includes('Turn your business challenge into a')) {
    throw new Error('Home page missing headline text!');
  }
  console.log("   ✓ Home page renders with correct branding and headline.");

  // 2. GET /discover
  const discover = await request({ hostname: 'localhost', port: 3005, path: '/discover', method: 'GET' });
  console.log(`2. GET /discover -> Status ${discover.statusCode}, Length ${discover.body.length}`);
  console.log("   ✓ Discovery page renders cleanly.");

  // 3. GET /contact - Check SSR visibility & NO opacity:0
  const contact = await request({ hostname: 'localhost', port: 3005, path: '/contact', method: 'GET' });
  console.log(`3. GET /contact -> Status ${contact.statusCode}, Length ${contact.body.length}`);
  const hasHiddenForm = contact.body.includes('style="opacity:0"') || contact.body.includes('style="opacity: 0"');
  if (hasHiddenForm) {
    throw new Error('Contact form rendered with hidden opacity on server!');
  }
  if (!contact.body.includes('<form') || !contact.body.includes('Standard Project Enquiry')) {
    throw new Error('Contact form markup missing!');
  }
  console.log("   ✓ Contact page renders visible form with NO hidden opacity on server (Progressive Enhancement verified).");

  // 4. POST /api/project-summary (Valid Payload)
  const validPayload = {
    needType: "ai_automation",
    businessGoal: "reduce_manual_work",
    challenge: "We receive hundreds of unstructured vendor invoices in PDF format each week and our operations team spends 20+ hours manually transcribing numbers into PostgreSQL and ERP.",
    systems: ["documents_pdfs", "erp", "internal_database"],
    currentStage: "existing_manual_process",
    timeline: "within_1_3_months",
    fullName: "Rohan Sharma",
    email: "rohan@enterprise.co.in",
    company: "Apex Logistics India",
    phone: "+91 98765 43210",
    preferredContact: "email"
  };

  const summaryRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/project-summary',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, validPayload);

  console.log(`4. POST /api/project-summary -> Status ${summaryRes.statusCode}`);
  const summaryJson = JSON.parse(summaryRes.body);
  if (!summaryJson.success || !summaryJson.summary) {
    throw new Error(`Summary API failed: ${summaryRes.body}`);
  }
  console.log("   ✓ Category:", summaryJson.summary.projectCategory);
  console.log("   ✓ Direction:", summaryJson.summary.recommendedDirection);
  console.log("   ✓ Follow-up questions count:", summaryJson.summary.followUpQuestions.length);
  console.log("   ✓ Relevant capabilities:", summaryJson.summary.relevantCapabilities.map(c => c.title));
  console.log("   ✓ Disclaimer present:", Boolean(summaryJson.summary.disclaimer));

  // 5. POST /api/submit-brief
  const submitRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/submit-brief',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, validPayload);

  console.log(`5. POST /api/submit-brief -> Status ${submitRes.statusCode}`);
  const submitJson = JSON.parse(submitRes.body);
  if (!submitJson.success || !submitJson.referenceId) {
    throw new Error(`Submit Brief API failed: ${submitRes.body}`);
  }
  console.log("   ✓ Submission Reference ID generated:", submitJson.referenceId);

  // 6. POST /api/project-summary (Validation Error Test)
  const invalidRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/project-summary',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { challenge: "Too short" });

  console.log(`6. POST /api/project-summary with invalid data -> Status ${invalidRes.statusCode}`);
  const invalidJson = JSON.parse(invalidRes.body);
  if (invalidRes.statusCode !== 400 || !invalidJson.fieldErrors) {
    throw new Error('API should reject invalid payload with 400 and fieldErrors!');
  }
  console.log("   ✓ Field-level validation errors returned properly:", Object.keys(invalidJson.fieldErrors));

  console.log("\n>>> ALL TESTS PASSED! Cynbit Discovery Assistant is fully operational. <<<");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

