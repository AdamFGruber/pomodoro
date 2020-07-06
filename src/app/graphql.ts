import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface Person {
  id: string;
  name: string;
}
export interface Response {
  people: Person[];
}


@Injectable({
  providedIn: 'root',
})
export class AllPeopleGQL extends Query<Response> {
  document = gql`
    query allPosts {
      posts {
        id
        name
      }
    }
  `;
}