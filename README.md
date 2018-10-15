# Pixura React Sdk

## Components

### PixuraSearchBar

The component will make a search query on the metadata fields given the search values. The metadata fields to search over will be supplied as a property.

```
<PixuraSearchBar 
  elasticSearchUrl=<es url> 
  metadataFields=<array of fields to use with search> 
  resultHandler=<function to run in reducer with results>
>
```

## Development

```
$ yarn install
$ yarn start
$ yarn build
```
