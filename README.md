# tastysearch


This a search engine to search gourmet food reviews data and return the top 20 reviews that have the highest overlap with the input query.

Score of a review(D) for a query(Q) is defined as Score(D, Q) = Q ∩ D (i.e. # tokens matching between Query(Q) & Document(D) normalized by query length ­the number of tokens in the given query).

Requirements -

    Node.Js v4.4.7
    Data/foods.txt (initial reviews data to be added to the root directory).
        Download Link( http://snap.stanford.edu/data/finefoods.txt.gz )

Build instructions -

    Run "npm install" in the root
    Run "node --max_old_space_size=2048 ." to start the server.

API exposed - 
    loaclhost:8080/search?tokens=token1+token2+token3
    It will return the topmost K reviews for the query.
	The returned result has one extra parameter count which is the total matches found for the query.
    
Test tokens -
  Test folder contains a tokens generator module.
  Creates a testData.txt in the same.
