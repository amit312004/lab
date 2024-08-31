const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    fasting: {
        required: true,
        type: String
    },
    imgLink: {
        required: false,
        type: String,
        default:"https://imgs.search.brave.com/vPADSjkYp4Q2Hf3LloXAXuKtCE4WWYhJa3ezMlmj8-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcG9zdC5t/ZWRpY2FsbmV3c3Rv/ZGF5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvMy8y/MDIwLzAxL0dldHR5/SW1hZ2VzLTExMzI4/OTY5NzVfaGVyby0x/MDI0eDU3NS5qcGc_/dz0xMTU1Jmg9MTUy/OA"
    },
    normalRange: {
        required: true,
        type: String
    },
    abnormalRange: {
        required: true,
        type: String
    }
}, {
    timestamps: true
});

const repo = mongoose.model('Test', schema);

module.exports = repo;
