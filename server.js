// server.js
const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint para ejecutar un script
app.post('/run', (req, res) => {
  const script = req.body.script || 'wlmj_bad_eth_test.js';

  exec(`node ${script}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).json({ error: error.message, stderr });
    }

    if (stderr) {
      console.warn(`⚠️ STDERR: ${stderr}`);
    }

    console.log(`✅ STDOUT: ${stdout}`);
    res.status(200).json({ message: 'Script ejecutado', stdout, stderr });
  });
});

app.get('/', (req, res) => {
  res.send('Node.js Selenium Test API running');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
