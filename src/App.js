import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Escrow from './Escrow.json'

  class App extends Component {

    async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }
  
    async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    }

    async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Escrow.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Escrow.abi, networkData.address)
      this.setState({ contract })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
     
      contract: null,
      web3: null,
      account: null
    }
  }
    
    deposit(){
    alert("Great Shot!");
    this.state.contract.methods.deposit().send({ from: this.state.account, value:document.getElementById("gbc").value})
  }
  confirmPayment(){
    alert("recieved!");
    this.state.contract.methods.confirmPayment().send({ from: this.state.account})
  }
  confirmDelivery(){
    this.state.contract.methods.confirmDelivery().send({ from: this.state.account})
  }
  returnPayment(){
    this.state.contract.methods.returnPayment().send({ from: this.state.account})
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
       <form> 
       <h2>Escrow Contract</h2>
         <input type='text' id='gbc'></input>
         <button onClick={this.deposit}>Deposit</button><br/>
         <button onClick={this.confirmPayment}>Confirm Payemnt</button><br/>
         <button onClick={this.confirmDelivery}>Confirm Delivery</button><br/>
         <button onClick={this.returnPayment}>Return Payment</button><br/>    
       </form>

      </header>
    </div>
  );
  }
}
  
  
export default App;
