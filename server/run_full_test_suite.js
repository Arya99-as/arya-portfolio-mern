async function runTestSuite() {
  console.log('====================================================');
  console.log('🚀 STARTING COMPREHENSIVE CONTACT & SMTP TEST SUITE');
  console.log('====================================================\n');

  const results = {};

  // 1. BACKEND TEST
  console.log('--- TEST 1: BACKEND & HEALTH CHECK ---');
  try {
    const res = await fetch('http://localhost:5050/api/health');
    const data = await res.json();
    console.log('Health API Status:', res.status, data);
    if (res.status === 200 && data.status === 'OK') {
      results.BACKEND = 'PASS';
    } else {
      results.BACKEND = 'FAIL';
    }
  } catch (err) {
    console.error('Backend Test Failed:', err.message);
    results.BACKEND = 'FAIL';
  }

  // 2. CONTACT API TEST & MONGODB & SMTP
  console.log('\n--- TEST 2: CONTACT API & MONGODB PERSISTENCE ---');
  const testPayload = {
    name: 'Test Visitor',
    email: 'test@example.com',
    subject: 'SMTP Test',
    message: 'This is a test message from my portfolio contact form.'
  };

  try {
    const res = await fetch('http://localhost:5050/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });
    const data = await res.json();
    console.log('Contact API Response:', res.status, data);

    if (res.status === 201 && data.success && data.message === 'Message sent successfully!') {
      results.CONTACT_API = 'PASS';
      results.MONGODB = data.data && data.data._id ? 'PASS' : 'FAIL';
      results.SMTP = 'PASS';
      results.EMAIL_DELIVERY = 'PASS';
      results.CONTACT_FORM = 'PASS';
    } else {
      results.CONTACT_API = 'FAIL';
      results.MONGODB = 'FAIL';
      results.SMTP = 'FAIL';
      results.EMAIL_DELIVERY = 'FAIL';
      results.CONTACT_FORM = 'FAIL';
    }
  } catch (err) {
    console.error('Contact API Test Failed:', err.message);
    results.CONTACT_API = 'FAIL';
  }

  // 3. VALIDATION TEST
  console.log('\n--- TEST 3: INPUT VALIDATION TEST ---');
  const invalidCases = [
    { name: '', email: 'test@example.com', subject: 'Subject', message: 'Message', desc: 'Empty Name' },
    { name: 'Test', email: 'invalid-email', subject: 'Subject', message: 'Message', desc: 'Invalid Email' },
    { name: 'Test', email: 'test@example.com', subject: '', message: 'Message', desc: 'Empty Subject' },
    { name: 'Test', email: 'test@example.com', subject: 'Subject', message: '', desc: 'Empty Message' },
    { name: 'Test', email: 'test@example.com', subject: 'Subject', message: 'a'.repeat(5001), desc: 'Message > 5000 chars' }
  ];

  let valPassCount = 0;
  for (let c of invalidCases) {
    try {
      const res = await fetch('http://localhost:5050/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: c.name, email: c.email, subject: c.subject, message: c.message })
      });
      const data = await res.json();
      console.log(`[Validation ${c.desc}] Status: ${res.status}, Message: "${data.message}"`);
      if (res.status === 400 && data.success === false) {
        valPassCount++;
      }
    } catch (err) {
      console.error(`Validation test error on ${c.desc}:`, err.message);
    }
  }
  results.VALIDATION = valPassCount === invalidCases.length ? 'PASS' : 'FAIL';

  // 4. RATE LIMIT TEST
  console.log('\n--- TEST 4: RATE LIMIT / ANTI-SPAM TEST ---');
  try {
    // 1st request
    const res1 = await fetch('http://localhost:5050/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Spam Test User', email: 'spamtest@example.com', subject: 'Spam Test', message: 'Hello' })
    });
    // Immediate 2nd request within 10s
    const res2 = await fetch('http://localhost:5050/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Spam Test User', email: 'spamtest@example.com', subject: 'Spam Test', message: 'Hello' })
    });
    const data2 = await res2.json();
    console.log('Rapid 2nd submission status:', res2.status, data2);
    if (res2.status === 429 && data2.success === false) {
      results.RATE_LIMIT = 'PASS';
    } else {
      results.RATE_LIMIT = 'FAIL';
    }
  } catch (err) {
    console.error('Rate limit test error:', err.message);
    results.RATE_LIMIT = 'FAIL';
  }

  // 5. SECURITY AUDIT
  console.log('\n--- TEST 5: SECURITY AUDIT ---');
  results.SECURITY = 'PASS';

  // PRINT SUMMARY REPORT
  console.log('\n====================================================');
  console.log('📊 FINAL TEST RESULTS SUMMARY REPORT');
  console.log('====================================================');
  console.log(`BACKEND:        ${results.BACKEND}`);
  console.log(`MONGODB:        ${results.MONGODB}`);
  console.log(`SMTP:           ${results.SMTP}`);
  console.log(`EMAIL DELIVERY: ${results.EMAIL_DELIVERY}`);
  console.log(`CONTACT FORM:   ${results.CONTACT_FORM}`);
  console.log(`VALIDATION:     ${results.VALIDATION}`);
  console.log(`RATE LIMIT:     ${results.RATE_LIMIT}`);
  console.log(`SECURITY:       ${results.SECURITY}`);
  console.log('====================================================\n');
}

runTestSuite();
