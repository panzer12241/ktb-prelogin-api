const express = require('express');
const bodyParser = require('body-parser');

let serviceModule;
try {
  serviceModule = require('./build/Release/prelogin.node');
} catch (e) {
  console.error('Error loading module:', e.message);
  process.exit(1);
}

const app = express();
app.use(bodyParser.json());

app.post('/api/auth/prelogin/grant', async (req, res) => {
  try {
    const deviceId = req.headers['x-device-id'];
    
    if (!deviceId) {
      return res.status(400).json({
        error: 'Missing required header',
        message: 'X-Device-ID header is required'
      });
    }
    
    console.log(`Processing request with ID: ${deviceId}`);
    
    const response = serviceModule.preloginmodule(deviceId);
    
    try {
    const parsedResponse = JSON.parse(response);
    res.json(parsedResponse);
    } catch (parseError) {
        
    res.status(200).json({ status: "error" });
    }
    
  } catch (error) {
    res.status(400).json({
      status: "error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});