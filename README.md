Bentsen comments..

install nodejs

install npm

npm install axios --save

npm install express express-graphql --save

npm install graphql --save

npm install json-server --save

npm install nodemon --save



To run in VS Code terminal:

npm run json:server

Open a new terminal:

npm run dev:server

####


Go to the following URL and start with some queries:

http://localhost:4000/graphql

ex:

{
  comment(id: "4"){
  	name,
    comment,
    rate
	}
}

