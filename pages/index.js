import Layout from '../components/layout/layout'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from 'wagmi'
import UploadForm from '../components/nfts/upload-form'

export default function Index() {

  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <>
        <div className="w-full flex flex-col items-center mt-[210px]">
          <h1 className="mb-1 md:mb-2 text-3xl md:text-5xl font-bold">{connector?.name} is Connected</h1>
          <h3 className="text-center mb-5 text-base"><span className="font-bold">Receiving Address:</span> {ensName ? `${ensName} (${address})` : address}</h3>
          <button
            className="w-full md:w-auto mx-2 mb-6 p-4 hover:text-white hover:bg-slate-800 border border-slate-200 hover:border-slate-800 rounded-2xl"
            onClick={disconnect}>
            Disconnect
          </button>
          <UploadForm address={address} />
        </div>
      </>
    )
  }

  return (
    <div className="w-full flex flex-col items-center mt-[210px] md:mt-0 md:justify-center">
      <p className="mb-8 p-4 text-white text-xs font-medium text-center bg-slate-800 border border-slate-800 rounded-full">NFTPort + Tailwind CSS + Wagmi</p>
      <h1 className="mb-0 md:mb-2 text-3xl md:text-5xl font-bold text-center">Mint NFTs in Seconds</h1>
      <h3 className="mb-6 text-lg md:text-2xl text-center">Connect your wallet and mint NFTs to it</h3>

      <div className="w-full flex flex-col sm:flex-row justify-center">
        {connectors.map((connector) => (
          <button
            className="mx-2 mb-3 md:mb-0 p-4 hover:text-white hover:bg-slate-800 border border-slate-200 hover:border-slate-800 rounded-2xl"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>
        ))}
      </div>

      {error && <div className="mt-6 invalid">{error.message}</div>}
    </div>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
