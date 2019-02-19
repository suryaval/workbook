Implementing GitHub GraphQL API from REST API v3

## To find labels on a Pull Request using GitHub GraphQL query:

```graphql
query {
  repository(owner:"dnacaap", name:"engines") {
    pullRequest(number:928){
      author{login},
      merged,
      labels(first: 5){
        edges{
          node{
            name
          }
        }
      }
    }
  }
}
```

## To assign a label to a Pull Request using GitHub GraphQL mutation:

```graphql

```
