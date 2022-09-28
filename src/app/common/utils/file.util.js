'use strict';

/**
 * Utilitário de arquivos
 * @author Filipe Campos
 */
const fs = require('fs');

exports.existsPath = function (path) {
  return fs.existsSync(path);
};

exports.createFolder = async function (path) {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    throw new Error(`Criar diretório no servidor: ${err.message}`);
  }
};

exports.createFile = async function (path, data) {
  try {
    return fs.writeFileSync(path, data);
  } catch (err) {
    throw new Error(`Criando arquivo no servidor: ${err.message}`);
  }
};

exports.deleteFile = async function (path) {
  try {
    return fs.unlinkSync(path);
  } catch (err) {
    throw new Error(`Removendo arquivo no servidor: ${err.message}`);
  }
};

exports.readFile = async function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(`Erro na Leitura de arquivo no servidor: ${err.message}`);
      } else {
        resolve(data);
      }
    });
  });
};

exports.readFileUtf8 = async function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(`Erro na Leitura de arquivo no servidor: ${err.message}`);
      } else {
        resolve(data);
      }
    });
  });
};

exports.readDirectory = async function (dir) {
  return new Promise((resolve, reject) => {
    // função bloqueante.
    fs.readdir(dir, (err, data) => {
      if (err) {
        reject(`Erro na Leitura do Diretório no servidor: ${err.message}`);
      } else {
        resolve(data);
      }
    });
  });
};

exports.writeFile = async function (base64Data, pathFile) {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathFile, base64Data, 'base64', (err, data) => {
      if (err) {
        reject(`Erro na Escrita do arquivo no servidor: ${err.message}`);
      } else {
        resolve(data);
      }
    });
  });
};
/**
 * Verifica se o path é um arquivo
 */
exports.isFile = async (path) => {
  if (!this.existsPath(path)) {
    throw `Diretório ${path} não existe`;
  }
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats.isFile());
    });
  });
};
