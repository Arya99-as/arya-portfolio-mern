async function testAuth() {
  console.log('Testing Admin Login API on port 5051...');
  const res = await fetch('http://localhost:5051/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'sutararya.6336@gmail.com',
      password: 'AryaSutarAdmin@2026!'
    })
  });

  const data = await res.json();
  console.log('Login Response:', data);

  if (data.token) {
    console.log('\nTesting Protected Route with JWT Token...');
    const statsRes = await fetch('http://localhost:5051/api/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${data.token}` }
    });
    const statsData = await statsRes.json();
    console.log('Protected Dashboard Stats Response:', statsData);
  }

  console.log('\nTesting Unauthorized Access (No Token)...');
  const unauthRes = await fetch('http://localhost:5051/api/admin/dashboard');
  const unauthData = await unauthRes.json();
  console.log('Unauth Response:', unauthRes.status, unauthData);
}

testAuth().catch(console.error);
