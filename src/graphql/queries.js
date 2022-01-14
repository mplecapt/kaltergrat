/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCreature = /* GraphQL */ `
  query GetCreature($id: ID!) {
    getCreature(id: $id) {
      id
      name
      size
      type
      subtype
      align
      ac
      hp
      hitdie
      spd
      stats {
        str
        dex
        con
        int
        wis
        cha
      }
      savingThrows {
        name
        val
      }
      skills {
        name
        val
      }
      senses {
        name
        val
      }
      languages {
        name
        val
      }
      cr
      features {
        name
        val
      }
      actions {
        name
        val
      }
      reactions {
        name
        val
      }
      legendary {
        name
        val
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCreatures = /* GraphQL */ `
  query ListCreatures(
    $filter: ModelCreatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        size
        type
        subtype
        align
        ac
        hp
        hitdie
        spd
        cr
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
