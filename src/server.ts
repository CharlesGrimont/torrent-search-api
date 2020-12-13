import TorrentSearchApi from"../index.js";
import TorrentProvider from "../lib/TorrentProvider"

export default class Server {
    private _providers: Array<TorrentProvider>;

    constructor(params = null){
        this._providers = TorrentSearchApi.getProviders();
    }

    public get providers(): Array<TorrentProvider> {
        return this._providers;
    }

    public getActiveProviders(){
        return TorrentSearchApi.getActiveProviders();
    }

    initPublicProviders(){
        for(let provider of this._providers){
            if(provider.public){
                TorrentSearchApi.enableProvider(provider.name);
            }
        }
    }

    public async initYggProvider(): Promise<boolean>{
        TorrentSearchApi.enableProvider("YggTorrent", "", "");
        try{
            const torrents = await TorrentSearchApi.search('1080', 'All', 2);
            return true;
        }
        catch(e){
            return false;
        }
        
    }

    public async query(query){
        const torrents = await TorrentSearchApi.search(query, '', 200);
        return torrents;
    }

    
}