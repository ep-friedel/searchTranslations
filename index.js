#!/home/node/bin/node

const   express = require('express')
    ,   app = express()
    ,   exec = require('child_process').execSync
    ,   bodyparser = require('body-parser')
    ,   server = require('http').createServer(app)
    ,   server_port = 8080
    ,   server_ip_address = 'ep6unity3.vm-intern.epages.com'
    ,   homeFolder = '/home/searchServer';

let lastUpdate = 0;

server.listen(server_port, server_ip_address, () => {
    console.log('listening on port '+ server_port);
});

app.use('/', express.static(homeFolder + '/client'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/grep', (req, res) => {
    if (!req.query.search) {
        res.status(400).send();
    }

    if (lastUpdate < new Date().getTime() - 36000000) {
        let pull = exec('git --git-dir=' + homeFolder + '/Cartridges/.git pull');
        console.log(pull.toString());
        lastUpdate = new Date().getTime();
    }

    let output = exec(`grep -r -i -F "${req.query.search}" ${homeFolder}/Cartridges/ --include *.${req.query.lang ? req.query.lang : 'de'}.xml || true`);


    res.status(200).send(output.length ? output : 'No Results...');
})