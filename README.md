# QIX-APIs-example
This is an example that shows how to retrieve the properties of a dimension of a Qlik Sense app. Please refer to this as just an example and not to a production-ready code. 

## 1. Getting started

1. **Install Node.js** if you haven't already (https://nodejs.org) 

1. Download and unpack, or `git clone` this repository into your computer

1. Open up a terminal window  and `cd` into the source code folder

1. **Run `npm install`** to install the project dependencies

1. **Replace engineHost** at line 10 of *main.js* with your Qlik Sense Server hostname.

1. **Replace enginePort** at line 13 of *main.js* with your Qlik Sense Engine port.

1. **Replace appId** at line 18 of *main.js* with your Qlik app id.

1. **Replace userDirectory** at line 23 of *main.js* with your User Directory

1. **Replace userId** at line 26 of *main.js* with your UserId

1. **Replace qId** at line 58 of *main.js* with a dimension Id you can extract from *getAllInfos()* method

1. **Download your Qlik Sense Server certificates in PEM format** and place them into a new *certs* folder.

1. **Run node main.js** from a terminal window which should run your program
