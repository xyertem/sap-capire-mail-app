const debug = require('debug')('srv:credStore');
const jose = require('node-jose');
const fetch = require('node-fetch');
const xsenv = require('@sap/xsenv');
const https = require('https');
xsenv.loadEnv();

let services = new Object()
let binding = new Object(); 

if (cds.env.profiles.includes('production') || cds.env.profiles.includes('development')) {
    services = xsenv.getServices({ credStore: { tag: 'credstore' }});
    binding = services.credStore;
}

const agent = new https.Agent({
    cert: binding.certificate,
    key: binding.key,
    rejectUnauthorized: true
});

function checkStatus(response) {
    debug('credStore.checkStatus:', response.status, response.statusText, response.url);
    if (!response.ok) {
        throw Error('checkStatus: ' + response.status + ' ' + response.statusText);
    }
    return response;
}

async function decryptPayload(privateKey, payload) {
    const key = await jose.JWK.asKey(
        `-----BEGIN PRIVATE KEY-----${privateKey}-----END PRIVATE KEY-----`, 
        'pem', 
        {alg: "RSA-OAEP-256", enc: "A256GCM"}
    );
    const decrypt = await jose.JWE.createDecrypt(key).decrypt(payload);
    const result = decrypt.plaintext.toString();
    return result;
}

async function encryptPayload(publicKey, payload) {
    const key = await jose.JWK.asKey(`-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`,
        "pem",
        { alg: "RSA-OAEP-256" }
    );
    const options = {
        contentAlg: "A256GCM",
        compact: true,
        fields: { "iat": Math.round(new Date().getTime() / 1000) }
    };
    return jose.JWE.createEncrypt(options, key).update(Buffer.from(payload, "utf8")).final();
}

function headers(binding, namespace, init) {
    const result = new fetch.Headers(init);
    result.set('Authorization', `Basic ${Buffer.from(`${binding.username}:${binding.password}`).toString('base64')}`);
    result.set('sapcp-credstore-namespace', namespace);
    result.set('agent',agent)
    return result;
}

async function fetchAndDecrypt(privateKey, url, method, headers, body) {
    const result = await fetch(url, {method, headers, body})
        .then(checkStatus)
        .then(response => response.text())
        .then(payload => decryptPayload(privateKey, payload))
        .then(JSON.parse);
    return result;
}

async function fetchAndDecryptValue(privateKey, url, method, headers, body) {
    const result = await fetch(url, {method, headers, body})
        .then(checkStatus)
        .then(response => response.text())
        .then(payload => decryptPayload(privateKey, payload))
        .then(JSON.parse);
    return result.value;
}

async function readCredential(namespace, type, name) {
    const headersToSend = headers(binding, namespace);
    const url = `${binding.url}/${type}?name=${encodeURIComponent(name)}`;
    const privateKey = binding.encryption.client_private_key
    const resData = await fetchAndDecrypt(
        privateKey,
        url,
        "get",
        headersToSend
        );
    return(resData);
}

async function readCredentialValue(namespace, type, name) {
    return fetchAndDecryptValue(
        binding.encryption.client_private_key,
        `${binding.url}/${type}?name=${encodeURIComponent(name)}`, 
        "get", 
        headers(binding, namespace)
    );
}

async function writeCredential(namespace, type, credential) {
    return fetchAndDecrypt(
        binding.encryption.client_private_key,
        `${binding.url}/${type}`,
        "post",
        headers(binding, namespace, { "Content-Type": "application/jose" }),
        await encryptPayload(binding.encryption.server_public_key, JSON.stringify(credential))
    );
}

async function deleteCredential(binding, namespace, type, name) {
    await fetch(
        `${binding.url}/${type}?name=${encodeURIComponent(name)}`,
        {
            method: "delete",
            headers: headers(binding, namespace)
        }
    ).then(checkStatus);
}

module.exports = {
    readCredential: readCredential,
    readCredentialValue: readCredentialValue,
    writeCredential: writeCredential,
    deleteCredential: deleteCredential
};