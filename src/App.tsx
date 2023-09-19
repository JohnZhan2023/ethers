import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";


function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const ConnectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('已连接到MetaMask');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log('当前账户地址:', accounts[0]);
      } catch (error) {
        console.error('连接MetaMask时发生错误:', error);
      }
    } else {
      console.error('未检测到MetaMask插件，请确保已安装并启用插件');
    }
  };


  const TransferButton =async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx ={
        to:input2,
        value:ethers.utils.parseEther(input1.toString())
      }
      const receipt = await signer.sendTransaction(tx)
      await receipt.wait()
      console.log(receipt)

  } catch (error) {
    console.error('转账失败:', error);
  }
  };


  return (
    <div className="App">
      <button onClick={ConnectMetamask}>Connect MetaMask</button>
      <div>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter Value in ETH"
        />
      </div>
      <div>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter Receiver Address"
        />
      </div>
      <button onClick={TransferButton}>Transfer</button>
    </div>
  );

}

export default App;
