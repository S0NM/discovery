#Get all indices
GET /_cat/indices?pretty

#Create mapping type for sonm-twiter
PUT sonm-twitter
{
  "mappings": {
    "doc":{
      "properties": {
        "type": {"type": "keyword"},
        "name": {"type": "text" },
        "username": {"type": "keyword"},
        "email": {"type": "keyword"},
        "content": {"type": "text"},
        "tweeted_at": {"type": "date"}
      }
    }
  }
}

#Put user into index
PUT sonm-twitter/doc/user-kimchy
{
  "type": "user", 
  "name": "Shay Banon",
  "user_name": "kimchy",
  "email": "shay@kimchy.com"
}

#Put tweet
PUT sonm-twitter/doc/tweet-1
{
  "type": "tweet", 
  "user_name": "kimchy",
  "tweeted_at": "2017-10-24T09:00:00Z",
  "content": "Types are going away"
}

#Search user_name="kimchy"
GET sonm-twitter/_search
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "user_name": "kimchy"
        }
      },
      "filter": {
        "match": {
          "type": "tweet" 
        }
      }
    }
  }
}

