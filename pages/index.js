import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  connectWallet,
  mintNFT,
  getCurrentWalletConnected //import here
} from '../utils/interact.js'

const Minter = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState('')
  const [status, setStatus] = useState('')

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()
    setWallet(address)
    setStatus(status)

    addWalletListener()
  }, [])

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }

  const onMintPressed = async () => {
    const { status } = await mintNFT({
      url: 'https://gateway.pinata.cloud/ipfs/QmU5Lj8Ef4XfhrfhwN9FdYuHQEuyvGa3CLhhmzWBweozks',
      name: 'MatyiNFT',
      description: "Matyi's Test NFT"
    })
    setStatus(status)
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
          setStatus('Press "Mint" to mint!')
        } else {
          setWallet('')
          setStatus('Connect to Metamask using the top right button.')
        }
      })
    } else {
      setStatus(
        <p>
          {' '}
          <a target='_blank' href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      )
    }
  }

  return (
    <div className='Minter'>
      <title>NFT Minter Test</title>
      {walletAddress.length > 0 && (
        <Link href={`/my-nfts/${walletAddress}`}>
          <button id='myNFTButton'>My NFT's</button>
        </Link>
      )}
      <button id='walletButton' onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          'Connected: ' +
          String(walletAddress).substring(0, 6) +
          '...' +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <div className='app-area'>
        <h1 id='title'>Matyi's NFT</h1>
        <img
          src='https://gateway.pinata.cloud/ipfs/QmU5Lj8Ef4XfhrfhwN9FdYuHQEuyvGa3CLhhmzWBweozks'
          alt="Matyi's NFT"
        />
        <button id='mintButton' onClick={onMintPressed}>
          Mint NFT
        </button>
        <p id='status'>{status}</p>
      </div>
    </div>
  )
}

export default Minter
