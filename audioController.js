// controllers/audioController.js

const db = require('../models/db');

// Obtener todos los audios
exports.getAllAudios = (req, res) => {
  const sql = 'SELECT * FROM audios';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
};

// Obtener un audio por ID
exports.getAudioById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM audios WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({ data: row });
    } else {
      res.status(404).json({ message: 'Audio no encontrado' });
    }
  });
};

// Crear un nuevo audio
exports.createAudio = (req, res) => {
  const { title, artist, url } = req.body;
  if (!title || !artist || !url) {
    res.status(400).json({ message: 'Faltan campos requeridos' });
    return;
  }
  const sql = 'INSERT INTO audios (title, artist, url) VALUES (?, ?, ?)';
  db.run(sql, [title, artist, url], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ data: { id: this.lastID, title, artist, url } });
  });
};

// Actualizar un audio existente
exports.updateAudio = (req, res) => {
  const { id } = req.params;
  const { title, artist, url } = req.body;
  const sql = 'UPDATE audios SET title = ?, artist = ?, url = ? WHERE id = ?';
  db.run(sql, [title, artist, url, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Audio no encontrado' });
    } else {
      res.json({ message: 'Audio actualizado exitosamente' });
    }
  });
};

// Eliminar un audio
exports.deleteAudio = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM audios WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Audio no encontrado' });
    } else {
      res.json({ message: 'Audio eliminado exitosamente' });
    }
  });
};
