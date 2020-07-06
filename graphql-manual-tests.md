query {
  persons {
    id
    name
  }
}



mutation {
  addPerson(person: {name: "adam"}) {
    id
  }
}



subscription {
  comments {
    comment
    author
    id
  }
}



query {
  talks {
    id
    title
  }
}



mutation {
  addComment(comment: {
    comment: "test",
    author:"Adam Gruber"
    talkId: 19
  }) {
    id
  }
}




query {
  comment(id:70) {
    id
    comment
    createdOn
    author
  }
}









