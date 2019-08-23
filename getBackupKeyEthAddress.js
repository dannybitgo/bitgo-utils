/***
 * Run script with:
 *
 * node getBackupKeyEthAddress.js <wallet id> <test/prod>
 *
 * example:
 *
 * node getBackupKeyEthAddress.js 5c33da5cadc74bd2038002dcfd945527 test
 *
 * or for production:
 *
 * node getBackupKeyEthAddress.js 5c33da5cadc74bd2038002dcfd945527 prod
 */

/**
 * Todo: Create an access token and add it below:
 */
const ACCESS_TOKEN = '';

const BitGo = require('bitgo');
const env = process.argv[3];
const walletId = process.argv[2];
const bitgo = new BitGo.BitGo({ env });
const coin = `${env === 'test' ? 't' : ''}eth`;

async function go() {
  await bitgo.authenticateWithAccessToken({ accessToken: ACCESS_TOKEN });
  const wallet = await bitgo.coin(coin).wallets().get({ id: walletId });
  const backupKeyId = wallet._wallet.keys[1];
  const backupKey = await bitgo.coin(coin).keychains().get({ id: backupKeyId });
  console.log(backupKey.ethAddress);
}

go();
