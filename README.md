# ProximaX Sirius Vue-native demo development code
## xpx-vue-native-tutorial
### 1. Get Sirius Desktop Wallet for Testnet
Server side Wallet: https://bctestnetwallet.xpxsirius.io/#/home

a. Create Wallet, name it “my-wallet”

b. “Save Paper Wallet” or “Show Private Key” and save it.

c. Continue and sign-in to my-wallet, select “Account”, and copy the Address.

d. Get test xpx from this link: https://bctestnetfaucet.xpxsirius.io/#/

e. Paste your wallet Address into: “Enter your Testnet Address”, press “Send”. 10K xpx will send to your wallet Wait for 15-20sec, you should see 10K xpx in your wallet.

f. Or you may ask your developer fellow to send your Testnet xpx via:

ProximaX Developers Chat Group at Telegram: https://t.me/proximax_devs

g. Source code for this Wallet: https://github.com/sophal1983/xpx-vue-native-tutorial

### 2. Install VScode
https://code.visualstudio.com/

### 3. Add Vue-native in VScode
```
### 3. Add Vue-native in VScode
$npm install --global vue-native-cli
$npm install --global expo-cli
```
https://vue-native.io/docs/installation.html

### 4. Create your first Vue-native test App
```
### 4. Create your first Vue-native test App
Create "vue-native" master directory, then 
$cd vue-native
$vue-native init test123
$cd test123
$npm start
```
Download Expo Project https://expo.io/tools at Google Playstore.

Launch Expo, and scan the QR code on the browser.

Basic VueNative tutorial on youTube: https://www.youtube.com/watch?v=8e0XHPylhj0

### 5. Download and run Demo, xpx-vue-native-tutorial
```
  a. Create "vue-native" master directory, then >cd vue-native.
  b. At "vue-native" directory, download demo source code: 
      $git clone https://github.com/sophal1983/xpx-vue-native-tutorial.git
  c. In VScode open "xpx-vue-native-tutorial" project or just chnage directory to: 
      $cd xpx-vue-native-tutorial 
```
### 6. Project setup
```
$npm install
{install all node_modules and library as in package.json}

Install ProximaX Sirius SDK for JavaScript (option):
$npm install tsjs-xpx-chain-sdk rxjs
{only require if it is not install automatically by "npm install"}

Read More:
```
https://github.com/proximax-storage/tsjs-xpx-chain-sdk

### 7. Compiles and hot-reloads for development
```
For react-native to use nodes standard lib: $npm i rn-nodeify -g

run App at browser:

$npm start
Launch Expo, and scan the QR code on the browser
```
### 8. Vue native refence
Vue-native format and styling, refer to:

a. Basic Components: [Link](https://vue-native.io/docs/basic-components.html)

b. Data binding: [Link](https://vue-native.io/docs/handle-user-input.html)

### 9. Help and references
ProximaX Developers Chat Group at Telegram: https://t.me/proximax_devs

##### About ProximaX:
- [Enterprise website!](https://www.proximax.io/)
- [Company profile!](https://www.proximax.ltd/)
- [Corporate brochure](https://suite-app.proximax.io/s/edDrecHDwszEDWm)
- [Enterprise brochure (short, non-techie)](https://suite-app.proximax.io/s/4CZ7gr7R3qHHmMx)
- [PowerPoint presentation deck](https://suite-app.proximax.io/s/4CZ7gr7R3qHHmMx)
- [Fact Sheet for Exchange Listings](https://suite-app.proximax.io/s/Bt8HEJPXqj5KKL5)
- [Video: Blockchain Reimagined and Evolved](https://suite-app.proximax.io/s/rEcRSGY8rosAKwk)
- [Video: Post Blockchain Mainnet Activities](https://youtu.be/2ZqeFpGfqSE)

##### Sirius Dev Portals:
- [Sirius Chain](https://bcdocs.xpxsirius.io/)
- [Sirius Storage](https://storagedocs.xpxsirius.io/)

##### Sirius SDKs:
- [GitHub](https://github.com/proximax-storage)

##### Sirius Tools: [Link](https://github.com/proximax-storage)
- [Mainnet web wallet](https://wallet.xpxsirius.io/)
- [Mainnet explorer](http://explorer.xpxsirius.io/)
- [Mainnet iOS mobile wallet](https://apps.apple.com/us/app/proximax-sirius-wallet/id1475020250)
- [Mainnet Android mobile wallet](https://play.google.com/store/apps/details?id=io.proximax.siriuschainwallet)
- [Testnet web wallet
- [Testnet explorer](http://bctestnetwallet.xpxsirius.io/)
- [Testnet faucet](https://bctestnetfaucet.xpxsirius.io/)

##### Competitor Analysis:
- [Comparison table](https://suite-app.proximax.io/s/AYFYJ78KnHzwkKi)

##### About eDLX: [Link](https://suite-app.proximax.io/s/AYFYJ78KnHzwkKi)
- [Paper: Radicalizing the Equity Market](http://bit.ly/2P8xT4z)
- [Brochure](https://suite-app.proximax.io/s/zcS5kH87XQGxtWC)
- [Brochure (Chinese)](https://suite-app.proximax.io/s/NjgBPAfi6HT4nNj)
- [Brochure (Spanish)](https://suite-app.proximax.io/s/6jEHnjyKEA8xNnB)
- [Overview of eDLX for License to Operate](https://suite-app.proximax.io/s/3TqBTftJymXyCgm)
- [Website](https://www.proximax.ltd/solutions/edlx)

##### About SiriusID:
- [Brochure](https://suite-app.proximax.io/s/jzKJDBCSKdmgK25)
- [Paper](https://suite-app.proximax.io/s/CWssi8J66RAwx3e)
- [Website](https://www.proximax.ltd/solutions/siriusid)

##### About mWallet:
- [Brochure](https://suite-app.proximax.io/s/G7AZt36iHda56zD)
- [Brochure(Chinese)](https://suite-app.proximax.io/s/7XRrf8dB2mtek2o)
- [Brochure (Spanish)](https://suite-app.proximax.io/s/9XpBdagXwmLX2Zd)
- [Website](https://www.proximax.ltd/solutions/mwallet)

##### About ProximaX KYC:
- [Website](https://kyc.proximax.io/)
- [Brochure](https://suite-app.proximax.io/s/oiGjyKnfLQGftN3)

About ProximaX Suite: [Link](https://suite-app.proximax.io/s/oiGjyKnfLQGftN3)
- [Website](https://suite.proximax.io/)

##### Open Source Apps: [Link](https://suite.proximax.io/)
- [Notes](https://github.com/proximax-storage/notes)
- [Vault](https://github.com/proximax-storage/vault)
- [File It!](https://github.com/proximax-storage/file-it)

##### Voting & Notary: [Link](https://github.com/proximax-storage/file-it)
- [MOCD Whitepaper](https://suite-app.proximax.io/s/tTci9XFqgbAq3sQ)

##### Why become a ProximaX Technology Partner? [Link](https://suite-app.proximax.io/s/tTci9XFqgbAq3sQ)
- [Flyer](https://suite-app.proximax.io/s/5F6Sj7NsZEA7MNc)

##### List of System Integrators: [Link](https://suite-app.proximax.io/s/5F6Sj7NsZEA7MNc)
- [List](https://suite-app.proximax.io/s/89FsdKjf4Yp73BF)

##### Private Platform & Apps Fees: [Link](https://suite-app.proximax.io/s/89FsdKjf4Yp73BF)
- [Fees table](https://suite-app.proximax.io/s/Qa3WQDibFf3pBN6)
- [Internal Fees Spreadsheet](https://t.me/c/1495989157/1672)

##### Contractual Templates: [Link](https://t.me/c/1495989157/1672)
- [Technology Partnership Agreement](https://github.com/sophal1983/xpx-vue-native-tutorial/blob/99a2455c63380496830ad4a455b956bb6917e43c/v.1.3)
- [MOU (v.1.1)](https://suite-app.proximax.io/s/XGBQ9j4W4RKPA5f)
- [Mutual NDA (v.1.1)](https://suite-app.proximax.io/s/abnjPtB2pFM99Jp)
