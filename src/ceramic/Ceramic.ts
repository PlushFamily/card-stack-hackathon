import {EthereumAuthProvider, ThreeIdConnect} from '@3id/connect'
import type {Manager} from '@3id/manager'
import type {DIDsData} from './types'
import {ceramic} from './Auth'
import type {BasicProfile} from '@ceramicstudio/idx-constants'
import {IDX} from '@ceramicstudio/idx'
import {AccountID} from 'caip'

declare global {
    interface Window {
        ethereum: any;
        idx: any;
        ceramic: any,
        did: any
    }
}
export const idx = new IDX({ceramic})

export async function loadProfile(did: string): Promise<BasicProfile | null> {
    try {
        return await idx.get('basicProfile', did)
    } catch (err) {
        return null
    }
}

export async function getDIDsData(manager: Manager): Promise<DIDsData> {
    const dids = (await manager.listDIDS()) ?? []
    const entries = await Promise.all(
        dids.map(async (did) => {
            const accountsObj = await idx.get<Map<string, string>>('cryptoAccounts', did)
            const accounts = accountsObj ? Object.keys(accountsObj) : []
            return {
                did,
                accounts: accounts.map((account) => new AccountID(account)),
                profile: await loadProfile(did)
            }
        })
    )
    return entries.reduce((acc, {did, ...entry}) => {
        acc[did] = entry
        return acc
    }, {} as DIDsData)
}

export const ceramicAuth = async () => {
    const addresses = await window.ethereum.enable()
    const threeIdConnect = new ThreeIdConnect()
    const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
    await threeIdConnect.connect(authProvider)

    const provider = await threeIdConnect.getDidProvider()

    async function getDID(){
        try {
            return ceramic?.did?.id
        }
        catch (e){
            return false
        }
    }

    try {
        const ceramicDID = await getDID();

        if (!ceramicDID){
            ceramic?.did?.setProvider(provider)
            await ceramic?.did?.authenticate()
            const ceramicDID: any = await getDID();
            localStorage.setItem('did', ceramicDID)
            console.log(`You are successfully logged in Ceramic with DID: ${ceramic?.did?.id}`)
        }
        else {
            localStorage.setItem('did', ceramicDID)
            console.log(`You are successfully logged in Ceramic with DID: ${ceramic?.did?.id}`)
        }
    } catch (err) {
        console.log(err)
    }
}