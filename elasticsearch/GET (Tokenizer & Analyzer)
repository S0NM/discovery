# GET (Tokenizer & Analyzer)

Created by **SonM** 
Created Date: 02/10/2017

#Understand _analysis_
#Analysis = tokenization + token filters
#Tokenization breaks sentences into discrete tokens

### 1.Using Standard Tokenizer
```rest
GET /google/_analyze
{
  "tokenizer": "standard",
  "text": "Brow fox brow fox"
}
```

### 2.Using Standard Tokenizer with filter
```rest
GET /google/_analyze
{
  "tokenizer": "standard",
  "filter": ["lowercase","unique"], 
  "text": "Brow brow fox brow fox green dog"
}
```

### 3.Using Standard Analyzer
```rest
GET /google/_analyze
{
  "analyzer": "standard",
  "text": "Brow fox brow fox"
}
```

### 4.Using Standard Tokenizer with special characters (special characters will be removed)
```rest
GET /google/_analyze
{
  "tokenizer": "standard",
  "filter": ["lowercase"], 
  "text": "THE quick.brown_FOx Jumped! $19.95 sonm@gmail.com"
}
```

### 5.Using Standard Tokenizer with special characters (keep only text)
```rest
GET /google/_analyze
{
  "tokenizer": "letter",
  "filter": ["lowercase"], 
  "text": "THE quick.brown_FOx Jumped! $19.95 sonm@gmail.com theexample.com"
}
```

### 6.Using Standard Tokenizer with special characters (keep full email address and url)
```rest
GET /google/_analyze
{
  "tokenizer": "uax_url_email",
  "filter": ["lowercase"], 
  "text": "THE quick.brown_FOx Jumped! $19.95 sonm@gmail.com theexample.com"
}
```


**The Sun never knew how greate it was until it hit the side of a building**
**~Louis Kahn!**
