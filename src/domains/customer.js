const prisma = require('../utils/prisma')

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
const createCustomerDb = async (name, phone, email) => await prisma.customer.create({
  data: {
    name,
    contact: {
      create: {
        phone,
        email
      }
    }
  },
  // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
  // This is like doing RETURNING in SQL
  include: {
    contact: true
  }
})

const getCustomersDb = async () => await prisma.customer.findMany({
  data: {
    name,
    contact
  },
  include: {
    contact: true
  }
})

const getCustomerByIdDb = async (id) => await prisma.customer.findUnique({
  where: {
    id
  },
  include: {
    contact: true
  }
})

const updateCustomerNameDb = async (id, name) => await prisma.customer.update({
  where: {
    id
  },
  data: {
    name
  },
  include: {
    contact: true
  }
})

const updateCustomerContactDb = async (id, contact) => await prisma.customer.update({
  where: {
    id
  },
  data: {
    contact: contact
  },
  include: {
    contact: true
  }
})

module.exports = {
  createCustomerDb,
  getCustomersDb,
  getCustomerByIdDb,
  updateCustomerNameDb,
  updateCustomerContactDb
}
