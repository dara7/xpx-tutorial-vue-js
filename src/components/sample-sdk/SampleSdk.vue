<template>
<div style="background: aliceblue;">

  <h2 style="background: white;">{{msg}}</h2>
  <div class="parent">
    <!--------------------Create Account--------------------->
    <div class="main-container vertical-border">
        <h3>CREATE ACCOUNT</h3>
        <div class="container">
          <div class="group-input">
            <label>User Name:</label>
            <input type="text" placeholder="User name" v-model="userName" style="width: 250px"> 
            <label>Address:</label>
            <input type="text" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" readonly v-model="address"> 
            <label>PublicKey:</label>
            <input type="text" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" readonly v-model="publicKey"> 
            <label>Privatekey:</label>
            <input type="text" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" readonly v-model="privatekey"> 
          </div>
          <button class="float-btn" v-on:click="createAccount(userName)">Create</button>
        </div>
    </div>
    <!--------------------Account Info--------------------->
    <div class="main-container">
        <h3>ACCOUNT INFO</h3>
        <div class="container">
          <div class="group-input">
            <a href="https://bctestnetfaucet.xpxsirius.io/#/" target="_blank" v-if="isMsgError">Click here to activate account</a>
            <select v-on:change="changeUserInfo($event)" style="width: 280px; margin-bottom: 0px; margin-top: 8px">
              <option v-if="firstSelectedUserInfo">Check By User Name</option>
              <option v-for="user in users" :key="user">{{user}}</option>
            </select>
            <label>Or:</label>
            <input type="text" placeholder="Enter your address" v-model="addrSearch"> 
            <label>Amount XPX:</label>
            <input type="text" placeholder="0" readonly v-model="mosaicXpx"> 
            <textarea name="" id="" cols="30" rows="10" v-model="accountInfo" readonly style="margin-top: 20px"></textarea>
          </div>
          <button class="float-btn" v-on:click="changeUserInfo(addrSearch, 'button')">Go</button>
        </div>
    </div>
  </div>
  <!--------------------Clear--------------------->
  <!-- <button class="circle-btn" v-on:click="clear()">Clear</button> -->

  <div class="parent">
    <!--------------------Send--------------------->
    <div class="main-container vertical-border">
        <h3>SEND TRANSACTION</h3>
        <div class="container">
          <div class="group-input">

            <select v-on:change="changeSender($event)" style="width: 280px">
              <option v-if="firstSelectedSender">Sender</option>
              <option v-for="user in users" :key="user">{{user}}</option>
            </select>

            <select v-on:change="changeReceiver($event)" style="width: 280px">
              <option v-if="firstSelectedReceiver">Recipient</option>
              <option v-for="user in users" :key="user">{{user}}</option>
            </select>

            <label>Amount XPX:</label>
            <input type="text" placeholder="0" v-model="amtXPX"> 
            <label>Message (Optional):</label>
            <input type="text" placeholder="Type your message here" v-model="message"> 
          </div>
          <button class="float-btn send" v-on:click="send(amtXPX, message)">Send</button>
        </div>
    </div>
    <!--------------------Get txn--------------------->
    <div class="main-container">
        <h3>GET TRANSACTION</h3>
        <div class="container">
          <div class="group-input">
            <select v-on:change="changeUser($event)" style="width: 280px">
              <option v-if="firstSelectedUserName">User Name</option>
              <option v-for="user in users" :key="user">{{user}}</option>
            </select>
            <div class="note">
              <p>Note:</p>
              <p>To see console text, right click on page, select <b>Inspect</b> then click <b>Console</b>.</p>
            </div>
            <label>Connection For Testing Sirius SDK:</label>
            <select v-on:change="changeNode($event)" style="width: 280px; margin-top: 0;">
              <option v-for="node in nodes" :key="node">{{node}}</option>
            </select>
          </div>
          <button class="float-btn send" v-on:click="getTxn()">Console</button>
        </div>
    </div>
  </div>

</div>
</template>

<script src="./script.js"></script>

<style lang='scss' scoped> @import './style.scss'; </style>