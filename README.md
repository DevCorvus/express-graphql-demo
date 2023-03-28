# Express GraphQL demo

As the name implies, this is a simple GraphQL demo API project with Express and Apollo Server (schema-first with codegen), as well as Mongoose (MongoDB) as the database implementation and basic e2e testing for the CRUD with Jest. All written in Typescript, as it should be.

You are free to explore and use the code at your convenience. I hope you find it useful and thanks for reading. ❤️

## Thoughts on GraphQL (TL;DR)

GraphQL is nothing new to me but I had not yet developed a more _Real-world Example_ that put into question its benefits and drawbacks... until now with this little project.

Without going into too much details, the benefits are quite clear compared to REST APIs, since GraphQL almost completely destroys the complexity related to routes or endpoints of the REST pattern: What you ask for in a GraphQL query is exactly what you get. This significantly reduces the need for multiple endpoints to (mainly) get specific data through the API, which greatly reduces the need for data to be sent to the client and therefore substantially improves the API maintainability.

However, not everything is rosy as this brings with it new obstacles to overcome since much of the complexity lies now in the handling, configuration and necessary tooling for GraphQL both on the server side and the client side, which is a much more considerable initial investment than traditional REST APIs. In addition, GraphQL also brings issues related to caching since by default requests are made through the POST method (although there are ways to mitigate this problem) and also, certain security concerns must be taken into account due to its very flexible approach when making queries, there are more chances that something can go wrong and you shoot yourself in the foot.

That being said, GraphQL is a great solution for large and complex projects that suffer from endpoint and maintainability hell, but it is not as necessary or convenient in smaller scale projects as the REST pattern is still very useful, simpler and relatively scalable in broad strokes. GraphQL would only come into the picture for me when it's really needed and not as the preferred option, at least for now.

> There's a successor of this demo based on NestJS, [check it out](https://github.com/DevCorvus/nestjs-graphql-demo)!

_\- DevCorvus_
