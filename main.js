const { Console } = require("console");
const enigma = require("enigma.js");
const path = require('path');
fs = require('fs');
const schema = require('enigma.js/schemas/12.170.2');
const ws = require("ws");


// Your Sense Enterprise installation hostname (you can use localhost if you run locally):
const engineHost = 'your-qlik-sense-server';
// Make sure the port below is accessible from the machine where this example
// is executed. If you changed the QIX Engine port in your installation, change this:
const enginePort = 4747;

// 'engineData' is a special "app id" that indicates you only want to use the global
// QIX interface or session apps, change this to an existing app guid if you intend
// to open that app:
const appId = '203fbd6f-1375-4b6e-b618-c2838a42efc6';
const url = `wss://${engineHost}:${enginePort}/app/${appId}`;

// The Sense Enterprise-configured user directory for the user you want to identify
// as:
const userDirectory = 'your-user-dir';

// The user to use when creating the session:
const userId = 'your-user-name';

// Path to a local folder containing the Sense Enterprise exported certificates:
const certificatesPath = './certs/';

// Helper function to read the contents of the certificate files:
const readCert = (filename) => fs.readFileSync(path.resolve(__dirname, certificatesPath, filename));

(async () => {
const session = enigma.create({
    schema,
    createSocket: () =>
      new ws (url, {
        ca: [readCert('root.pem')],
        key: readCert('client_key.pem'),
        cert: readCert('client.pem'),
        headers: {
          'X-Qlik-User': `UserDirectory=${encodeURIComponent(userDirectory)}; UserId=${encodeURIComponent(userId)}`,
        },
      }),
    });

  try {
    const global = await session.open();
    //Open app doc
    const app = await global.openDoc(appId);

    //Retrieve all app infos to understand which are the id of dimensions and measures
    const allInfos = await app.getAllInfos();
    console.log("All infos", allInfos);

    //Retrieve a dimension property
    const dimension = await app.getDimension({"qId":"FNjBpm"});
    const dimension_prop = await dimension.getProperties({}); 
    console.log(JSON.stringify(dimension_prop));


  } catch (err) {
    console.log('An unexpected error thrown:', err);
  }

  

  session.close();
})();