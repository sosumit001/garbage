import {ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client'


const httpLink = createHttpLink({
    uri:'https://garbage-production.up.railway.app/'
})


const client = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache()
})

export default client

