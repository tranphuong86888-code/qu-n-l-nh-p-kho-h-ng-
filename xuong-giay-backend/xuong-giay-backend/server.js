const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'state.json');

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function readState() {
  try {
    if (!fs.existsSync(DATA_FILE)) return null;
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (error) {
    console.error('Không đọc được dữ liệu:', error.message);
    throw error;
  }
}

function writeState(state) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tempFile = DATA_FILE + '.tmp';
  fs.writeFileSync(tempFile, JSON.stringify(state, null, 2), 'utf8');
  fs.renameSync(tempFile, DATA_FILE);
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Backend quản lý xưởng giày đang hoạt động' });
});

app.get('/api/state', (req, res) => {
  try {
    res.json({ state: readState() });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi đọc dữ liệu hệ thống' });
  }
});

app.put('/api/state', (req, res) => {
  const state = req.body;
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return res.status(400).json({ message: 'Dữ liệu gửi lên không hợp lệ' });
  }

  const requiredArrays = [
    'materials', 'products', 'partners', 'boms',
    'productionOrders', 'warehouseHistory', 'salesOrders', 'cashflows'
  ];
  for (const key of requiredArrays) {
    if (!Array.isArray(state[key])) {
      return res.status(400).json({ message: `Trường ${key} phải là một danh sách` });
    }
  }

  try {
    writeState(state);
    res.json({ ok: true, message: 'Đã lưu dữ liệu lên Backend' });
  } catch (error) {
    console.error('Lỗi lưu dữ liệu:', error.message);
    res.status(500).json({ message: 'Không thể lưu dữ liệu hệ thống' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Backend đang chạy: http://localhost:${PORT}`);
  console.log(`Kiểm tra API:      http://localhost:${PORT}/api/health`);
});
