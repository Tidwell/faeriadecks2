faeriadecks.com - version 2
--

##Dev

`node index.js`

`grunt serve`


##Build

`grunt build`

`./make.sh`


##Deploy

`git subtree push --prefix build origin build`

ssh to box and cd to folder

`npm install`

Look for the process on port 9005 using: netstat -tulpn

kill #PID

nohup npm start &

sudo service apache2 restart

##Forever Deplot

```bash
 $ forever start index.js
```