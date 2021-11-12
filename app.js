const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql')

const seedData = [
    {id: 1, language: 'Python', loved:true},
    {id: 2, language: 'JavaScript', loved:true},
    {id: 3, language: 'Scala', loved:true}
]
// Schema
//resolver
const languageType = new GraphQLObjectType({
    name: 'Language',
    description: 'ProgrammingLanguage',
    fields:{
        id: {
            type:GraphQLInt
        },
        language: {
            type:GraphQLString
        },
        loved: {
            type: GraphQLBoolean
        }
    }
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'This is the rootquery',
    fields:{
       languages: {
           type: GraphQLList(languageType),
           resolve: () => seedData
       },
       language: {
           type: languageType,
           args: {
               id: {type: GraphQLInt}
           },
           resolve: (_, {id}) => seedData.find(language => language.id == id)
       }
    }
})

const schema = new GraphQLSchema({query:rootQuery})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

const PORT = 3001

app.listen(PORT, ()=> {
    console.log('Listening on port ${PORT}')
})