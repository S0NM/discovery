# GET /

Created by **SonM** 
Created Date: 02/10/2017

### 1.Find all documents
```rest
GET /google/employee/_search
```

### 2.Find 8 documents from position 1
```
GET /google/employee/_search
{
  "from": 1,
  "size": 8
}
```

### 3.Find all "Jane" document
```rest
GET google/employee/_search
{
  "query": {
    "match": {
      "first_name": "Jane"
    }
  }
}
```

### 4.Find all "Jane" + "Messi" documents
```rest
GET google/employee/_search
{
  "query": {
    "match": {
      "first_name": "Jane Messi"
    }
  }
}
```

### 5.Only ask for Phrases
```rest
GET google/employee/_search
{
  "query": {
    "match_phrase": {
      "about": "playing soccer"
    }
  }
}
```

### 6.Find all documents with "Messi" and "I love to go"
```rest
GET google/employee/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "first_name": "Messi"
          }
        },
        {
          "match_phrase": {
            "about": "I love to go"
          }
        }
      ]
    }
  }
}
```

### 7.Find all documents with "Messi" and "I love to go" with highlight
```rest
GET google/employee/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "first_name": "Messi"
          }
        },
        {
          "match_phrase": {
            "about": "I love to go"
          }
        }
      ]
    }
  },
  "highlight": {
    "fields": {
      "about": {}
    }
  }
}
```

### 8.Filtering is offen faster than querying
```rest
GET google/employee/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "about": "I"
          }
        }
      ],
      "filter": {
        "range": {
          "age": {
            "gte": 25,
            "lte": 30
          }
        }
      }
    }
  }
}
```



**The Sun never knew how greate it was until it hit the side of a building**
**~Louis Kahn!**
