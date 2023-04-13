const AdsLog = require("./AdsLogger/twincat_logger.js")
const ads = require('ads-client');

module.exports = function(RED) {
    function AdsLogger(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        //Properties
        node.name = config.name;

        //Getting the ads-client instance
        node.connection = RED.nodes.getNode(config.connection);
        node.subscription = null;


        //Check connection
        if (!node.connection) {
            node.status({ fill: 'red', shape: 'dot', text: `Error: No connection configured` })
            var err = new Error(`No connection configured`);
            (done)? done(err):  node.error(err, msg);
            return;
        }

        //Create bare client
        //ToDO: Use the existing client socket from the configuration 
        var client = new ads.Client({
            targetAmsNetId: node.connection.connectionSettings.targetAmsNetId,
            targetAdsPort: 100,
            bareClient: true,
            allowHalfOpen: true,
            hideConsoleWarnings: true
        });
        

        client.connect()
        .then(async res => {

            client.subscribeRaw(1, 0xffff, 1024, data => {

                            try{
                                const entry = AdsLog.unpackTwinCatLoggerEntry(data.value);
                                let msg = {}
                                msg.payload = entry;
                                node.send(msg);
                            }catch(err){
                                node.error(err)
                            }
                            
                        }, 0, false);  
        })  
        .catch(err => {
           node.error(err)
        })
        
        
        client.on('connect', () => {
            node.status({ fill: 'green', shape: 'dot', text: `Connected` });
        });

        client.on('disconnect', ()=>{
            node.status({ fill: 'red', shape: 'dot', text: `Not connected` });
        });


        this.on('close', async (removed, done) => {
            //await unsubscribe();
            client.disconnect();
            done();
        });
      
        
    }
    RED.nodes.registerType("ads-logger",AdsLogger);
}
