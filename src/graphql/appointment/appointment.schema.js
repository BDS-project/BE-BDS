export default `
  type Appointment {
    id: ID!
    user: User!
    property: Property!
    dateTime: String!
    status: String!
  }

  type Query {
    appointments: [Appointment!]!
    appointment(id: ID!): Appointment
  }

  type Mutation {
    createAppointment(propertyId: ID!, dateTime: String!): Appointment
    updateAppointment(id: ID!, dateTime: String, status: String): Appointment
    deleteAppointment(id: ID!): String
  }
`;
