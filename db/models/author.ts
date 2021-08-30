import { Model } from 'sequelize'

import type { Author as AuthorDomainType } from '../../types'

class Author extends Model {
  public id!: AuthorDomainType['id']
  public name!: AuthorDomainType['name']
  public password!: AuthorDomainType['password']
  public createdAt!: AuthorDomainType['createdAt']
  public updateAt!: AuthorDomainType['updatedAt']
}

export default Author
