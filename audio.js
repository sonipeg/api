// routes/audio.js

const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

// Rutas de audios
router.get('/', audioController.getAllAudios);
router.get('/:id', audioController.getAudioById);
router.post('/', audioController.createAudio);
router.put('/:id', audioController.updateAudio);
router.delete('/:id', audioController.deleteAudio);

module.exports = router;
