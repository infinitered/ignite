# Transforms

A common pattern when working with APIs is to change data to play nice between your app & the API.  

We've found this to be the case in every project we've worked on.  So much so that we're recommending that you create a folder dedicated to these transformations.

Transforms are not necessarily a bad thing (although an API might have you transforming more than you'd like).

For example, you may:

* turn appropriate strings to date objects
* convert snake case to camel case
* normalize or denormalize things
* create lookup tables
