import { Injectable } from '@angular/core';
import { Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class NewCommentGQL extends Subscription {
  document = gql`
    subscription newComment {
      comments {
        comment
        author
        id
      }
    }
  `;
}