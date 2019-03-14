const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

/*
// Hardcoded data
const comments = [
    {id:'1', name:'John Doe', comment:'jdoe@gmail.com', rate:35},
    {id:'2', name:'Steve Smith', comment:'steve@gmail.com', rate:25},
    {id:'3', name:'Sara Williams', comment:'sara@gmail.com', rate:32},
];
*/

// Comment Type
const BentsenCommentType = new GraphQLObjectType({
    name:'Comment',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        comment: {type: GraphQLString},
        rate: {type: GraphQLInt},
    })
});

// Root Query
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        comment:{
            type:BentsenCommentType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                /*
                for(let i = 0;i < comments.length;i++){
                    if(comments[i].id == args.id){
                        return comments[i];
                    }
                }
                */
                return axios.get('http://localhost:3000/comments/'+ args.id)
                    .then(res => res.data);

            }
        },
        comments:{
            type: new GraphQLList(BentsenCommentType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/comments')
                    .then(res => res.data);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addComment:{
            type:BentsenCommentType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                comment: {type: new GraphQLNonNull(GraphQLString)},
                rate: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/comments', {
                    name:args.name,
                    comment: args.comment,
                    rate:args.rate
                })
                .then(res => res.data);
            }
        },
        deleteComment:{
            type:BentsenCommentType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/comments/'+args.id)
                .then(res => res.data);
            }
        },
        editComment:{
            type:BentsenCommentType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                comment: {type: GraphQLString},
                rate: {type: GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/comments/'+args.id, args)
                .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});