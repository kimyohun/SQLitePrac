const express = require('express');
const router = express.Router();
const axios = require('axios');

const DB_SERVER_URL = 'http://localhost:4000';

// 모든 사용자 조회 API
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${DB_SERVER_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 사용자 추가 API
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${DB_SERVER_URL}/users`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
