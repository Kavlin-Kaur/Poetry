const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const printResponse = (label, data) => {
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(data, null, 2));
  console.log('='.repeat(50));
};

async function testAPI() {
  try {
    // Test health check
    const health = await axios.get(`${API_URL.replace('/api', '')}/health`);
    printResponse('Health Check', health.data);

    // Test GET all poems
    const allPoems = await axios.get(`${API_URL}/poems`);
    printResponse('All Poems', {
      count: allPoems.data.length,
      sample: allPoems.data[0]
    });

    // Test search functionality
    const searchResult = await axios.get(`${API_URL}/poems?search=binary`);
    printResponse('Search Results', {
      query: 'binary',
      count: searchResult.data.length,
      results: searchResult.data
    });

    // Test GET single poem
    const singlePoem = await axios.get(`${API_URL}/poems/two-parallel-worlds`);
    printResponse('Single Poem', singlePoem.data);

    // Test POST new poem
    const newPoem = {
      title: 'Test Poem',
      slug: 'test-poem-' + Date.now(),
      content: 'This is a test poem\nCreated for API testing'
    };
    const createdPoem = await axios.post(`${API_URL}/poems`, newPoem);
    printResponse('Created Poem', createdPoem.data);

    // Test validation error
    try {
      await axios.post(`${API_URL}/poems`, { title: 'Invalid Poem' });
    } catch (error) {
      printResponse('Validation Error', error.response.data);
    }

  } catch (error) {
    console.error('\nError:', error.response ? error.response.data : error.message);
  }
}

testAPI(); 