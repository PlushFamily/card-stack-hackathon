import CeramicClient from '@ceramicnetwork/http-client'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'

const { REACT_APP_CERAMIC_API } = process.env

export const ceramic = new CeramicClient(REACT_APP_CERAMIC_API)
const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic)
}
const did = new DID({ resolver })
ceramic.did = did