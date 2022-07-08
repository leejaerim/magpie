/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMenu = /* GraphQL */ `
  subscription OnCreateMenu {
    onCreateMenu {
      id
      name
      cost
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMenu = /* GraphQL */ `
  subscription OnUpdateMenu {
    onUpdateMenu {
      id
      name
      cost
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMenu = /* GraphQL */ `
  subscription OnDeleteMenu {
    onDeleteMenu {
      id
      name
      cost
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMenuItem = /* GraphQL */ `
  subscription OnCreateMenuItem {
    onCreateMenuItem {
      id
      cnt
      menu {
        id
        name
        cost
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMenuItem = /* GraphQL */ `
  subscription OnUpdateMenuItem {
    onUpdateMenuItem {
      id
      cnt
      menu {
        id
        name
        cost
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMenuItem = /* GraphQL */ `
  subscription OnDeleteMenuItem {
    onDeleteMenuItem {
      id
      cnt
      menu {
        id
        name
        cost
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      id
      index
      order {
        id
        cnt
        menu {
          id
          name
          cost
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      index
      order {
        id
        cnt
        menu {
          id
          name
          cost
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      index
      order {
        id
        cnt
        menu {
          id
          name
          cost
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
