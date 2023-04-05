const devMan = require("./MDP/Ads_BeckhoffDeviceManager.js")

module.exports = function(RED) {
    function AdsBeckhoffDeviceManager(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        const deviceManager = new devMan();

        //Properties
        node.name = config.name;

        //Getting the ads-client instance
        node.connection = RED.nodes.getNode(config.connection);

        node.on('input', async function(msg, send, done) {
            //Backwards compatibility 
            send = send || function() { node.send.apply(node,arguments) };

            if (!node.connection) {
                node.status({ fill: 'red', shape: 'dot', text: `Error: No connection configured` })
                var err = new Error(`No connection configured`);
                (done)? done(err):  node.error(err, msg);
                return;
            }

            if (!node.connection.isConnected()) {
                //Try to connect
                try {
                  await node.connection.connect();
                  
                } catch (err) {
                  //Failed to connect, we can't work..
                  node.status({ fill: 'red', shape: 'dot', text: `Error: Not connected` });
                  (done)? done(err):  node.error(err, msg);
                  return;
                }
            }

            //Finally, reading the data
            try {

                let topic = msg.topic ?? config.topic ?? "modules";
                deviceManager.setClient(node.connection.getClient()); //Update client

                if( typeof topic === "string" && topic.toLowerCase() == "modules"){
                    msg.payload = await deviceManager.ReadModulelist();
                }else{
                    msg.payload = await deviceManager.ReadDeviceManager(topic);
                }
                
                //We are here -> success
                node.status({ fill: 'green', shape: 'dot', text: 'Successful' });

                send(msg);

                if (done) {
                    done();
                }

            } catch (err) {

                node.status({ fill: 'red', shape: 'dot', text: 'Error' });
                (done)? done(err):  node.error(err, msg);
                return;

            }
        });
    }
    RED.nodes.registerType("ads-beckhoff-devicemanager",AdsBeckhoffDeviceManager);
}
