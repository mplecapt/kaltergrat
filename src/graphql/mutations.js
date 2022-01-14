/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCreature = /* GraphQL */ `
  mutation CreateCreature(
    $input: CreateCreatureInput!
    $condition: ModelCreatureConditionInput
  ) {
    createCreature(input: $input, condition: $condition) {
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
export const updateCreature = /* GraphQL */ `
  mutation UpdateCreature(
    $input: UpdateCreatureInput!
    $condition: ModelCreatureConditionInput
  ) {
    updateCreature(input: $input, condition: $condition) {
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
export const deleteCreature = /* GraphQL */ `
  mutation DeleteCreature(
    $input: DeleteCreatureInput!
    $condition: ModelCreatureConditionInput
  ) {
    deleteCreature(input: $input, condition: $condition) {
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
