import Head from 'next/head'
import axios from 'axios'

const MyNFTs = ({ NFTs }) => {
  return (
    <>
      <Head>
        <title>My NFT's</title>
      </Head>
      <h1>My NFT's:</h1>
      <div className='nft-container'>
        {NFTs.result.map(({ hash, tokenID, tokenName, tokenSymbol }, index) => (
          <span key={index} className='nft'>
            {tokenName} #{tokenID}
            <br />
            {hash} ({tokenSymbol})
          </span>
        ))}
        {NFTs.result.length === 0 && <span>No NFT's found.</span>}
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const res = await axios.get(
    `https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=${context.params.address}&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`
  )
  const NFTs = await res.data

  return {
    props: {
      NFTs
    }
  }
}

export default MyNFTs
